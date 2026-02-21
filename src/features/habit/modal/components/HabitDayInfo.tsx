import dayjs from "dayjs";

import type { HabitDay } from "../../habitType";

export function HabitDayInfo({ habitDay }: { habitDay: HabitDay }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
        <span className="text-sm font-medium text-gray-600">생성일</span>
        <span className="text-sm text-gray-800">
          {habitDay.updatedAt
            ? dayjs(habitDay.updatedAt).format("YYYY-MM-DD")
            : dayjs(habitDay.createdAt).format("YYYY-MM-DD")}
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
        <span className="text-sm font-medium text-blue-600">진행 현황</span>
        <span className="text-lg font-semibold text-blue-700">
          {habitDay.habitIndex + 1}번째 날
        </span>
      </div>

      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-600 mb-2">메모</p>
        <p className="text-sm text-gray-700 wrap-break-word whitespace-pre-wrap">
          {habitDay.habitComment || (
            <span className="text-gray-400 italic">메모가 없습니다</span>
          )}
        </p>
      </div>
    </div>
  );
}
