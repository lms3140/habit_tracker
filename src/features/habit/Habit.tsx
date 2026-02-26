import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../apis/env";
import { getAuthData } from "../../apis/fetch";
import { Modal } from "../../components/modal/Modal";
import { useAuthTokenStore } from "../../store/useAuthTokenStore";
import { useModalStore } from "../../store/useModalStore";
import type { HabitCompleted, HabitDay } from "./habitType";
import { HabitDayModal } from "./modal/HabitDayModal";
import { useHabitDayModalStore } from "./store/HabitDayStore";
import type { IHabitCard } from "../../types/globalType";
import { useHabitDayCsvExport } from "../../hooks/useHabitDayCsvExport";
import { HabitPieChart } from "./HabitPieChart";
import { BackButton } from "../../components/button/BackButton";

const stateMap: Record<HabitCompleted | "EMPTY", string> = {
  SUCCESS:
    "bg-ds-primary border-transparent text-ds-ink hover:bg-ds-primary-hover",
  FAILED: "bg-ds-danger border-ds-border text-ds-ink hover:bg-ds-danger-hover",
  EMPTY: "bg-ds-bg border-ds-border text-ds-ink hover:bg-ds-accent",
};

export function Habit() {
  const { id } = useParams();
  const { token, clearToken } = useAuthTokenStore();
  const { setHabitIndex } = useHabitDayModalStore();
  const { isModalOpen, closeModal, openModal } = useModalStore();
  const { exportCsv } = useHabitDayCsvExport();
  const navigate = useNavigate();
  const { data } = useQuery<HabitDay[]>({
    queryKey: ["habitDayList", id],
    queryFn: async () => {
      return await getAuthData({ url: `${apiUrl}/habit-day/${id}`, token });
    },
    enabled: Boolean(id) && Boolean(token),
  });

  const { data: habitData, error } = useQuery<IHabitCard>({
    queryKey: ["habit", id],
    queryFn: async () =>
      getAuthData({ url: `${apiUrl}/habit/get-one?habitId=${id}`, token }),
    enabled: Boolean(id) && Boolean(token),
  });

  useEffect(() => {
    if (error) {
      console.log(error.message);
      if (error.message === "UNAUTHORIZED") {
        clearToken();
        navigate("/login", { replace: true });
      }
    }
  }, [error, error?.message]);

  const days = useMemo(() => {
    const base = Array.from({ length: 30 }, () => null as HabitDay | null);
    (data ?? []).forEach((day) => {
      base[day.habitIndex] = day;
    });
    return base;
  }, [data]);

  const handleClickDay = (index: number) => {
    setHabitIndex(index);
    openModal();
  };

  return (
    <div className="">
      <div className="w-full max-w-4xl mx-auto">
        <BackButton onClick={() => navigate("/habit")}>{"<<"}</BackButton>
        <div
          className="
          bg-ds-surface
          border border-ds-border
          rounded-ds-lg
          shadow-ds
          px-6 py-7
        "
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-ds-ink">
              {habitData?.habitTitle}
            </div>
            <div className="text-sm text-ds-ink-muted">
              <span>30일</span>
              <span>
                <button
                  onClick={() => {
                    if (!data) return;
                    exportCsv(data, "list.csv");
                  }}
                >
                  export
                </button>
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-7 flex justify-center">
            <div className="grid grid-cols-5 gap-4">
              {days.map((habitDay, i) => {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleClickDay(i)}
                    className={`
                    w-12 h-12
                    rounded-ds
                    text-sm font-medium
                    flex items-center justify-center
                    border
                    transition
                    active:scale-[0.98]
                    outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2
                    ${stateMap[habitDay?.completed ?? "EMPTY"]}
                  `}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="
          bg-ds-surface
          border border-ds-border
          rounded-ds-lg
          shadow-ds
          px-6 py-7
        "
        >
          <h3 className="text-sm font-semibold text-ds-ink mb-2">
            성공/실패 비율
          </h3>

          <HabitPieChart habitList={data} />
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <HabitDayModal />
        </Modal>
      </div>
    </div>
  );
}
