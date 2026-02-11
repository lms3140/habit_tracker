import { Link } from "react-router-dom";
import type { IHabitCard } from "../../types/globalType";

export type HabitCardProps = {
  habitCardObj: IHabitCard;
};

export function HabitCard({ habitCardObj }: HabitCardProps) {
  return (
    <Link
      to={`/habit/${habitCardObj.habitId}`}
      className="
        block rounded-2xl border border-green-200 bg-green-100 p-5 shadow-sm
        transition hover:shadow-md hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-blue-400
      "
    >
      <div className="flex flex-col items-start justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {habitCardObj.habitTitle}
        </h2>
        <div>
          <span className="text-xs text-gray-400">30일</span>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        시작일: {habitCardObj.createdAt}
      </div>

      <div className="flex items-center gap-3">
        <progress
          max={30}
          value={0}
          className="w-full h-2 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-blue-500"
        />
        <span className="text-sm text-gray-600 min-w-[3ch] text-right">
          {0}/30
        </span>
      </div>
    </Link>
  );
}
