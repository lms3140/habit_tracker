import { useCallback } from "react";
import type { HabitDay } from "../features/habit/habitType";
import dayjs from "dayjs";

const escapeCsv = (v: unknown) => {
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
};

const habitDaysToCsv = (items: HabitDay[]) => {
  const header = [
    "생성일",
    "완료여부",
    "장소",
    "난이도",
    "컨디션",
    "메모",
    "n일차",
    "수정일",
  ];

  const lines = [
    header.join(","),
    ...items.map((x) =>
      [
        dayjs(x.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        x.completed,
        x.habitPlace,
        x.habitDifficulty,
        x.habitCondition,
        x.habitComment ?? "",
        x.habitIndex + 1,
        dayjs(x.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
      ]
        .map(escapeCsv)
        .join(","),
    ),
  ];

  return "\uFEFF" + lines.join("\n"); // 엑셀 한글 깨짐 방지 BOM
};

const downloadCsv = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
};

export function useHabitDayCsvExport() {
  const exportCsv = useCallback((items: HabitDay[], filename?: string) => {
    const csv = habitDaysToCsv(items);
    downloadCsv(csv, filename ?? "habit_days.csv");
  }, []);

  return { exportCsv };
}
