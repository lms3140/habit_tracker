import { Link } from "react-router-dom";
import type { IHabitCard } from "../../types/globalType";
import { useCheckList, useHabit } from "../../store/useHabit";

export type HabitCardProps = {
  habitCardObj: IHabitCard;
};

export function HabitCard({ habitCardObj }: HabitCardProps) {
  const progressValue = useCheckList((state) =>
    state.getLength(habitCardObj.id),
  );

  return (
    <Link
      to={`/habit/${habitCardObj.id}`}
      className="
        block rounded-2xl border border-green-200 bg-green-100 p-5 shadow-sm
        transition hover:shadow-md hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-blue-400
      "
    >
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {habitCardObj.title}
        </h2>
        <span className="text-xs text-gray-400">30일</span>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        시작일: {habitCardObj.startDate}
      </div>

      <div className="flex items-center gap-3">
        <progress
          max={30}
          value={progressValue}
          className="w-full h-2 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-blue-500"
        />
        <span className="text-sm text-gray-600 min-w-[3ch] text-right">
          {progressValue}/30
        </span>
      </div>
    </Link>
  );
}
