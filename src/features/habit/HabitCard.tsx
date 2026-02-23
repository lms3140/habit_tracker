import { Link } from "react-router-dom";
import type { IHabitCard } from "../../types/globalType";
import { HabitCardMenu } from "./modal/components/HabitCardMenu";
import dayjs from "dayjs";

export type HabitCardProps = {
  habitCardObj: IHabitCard;
};

export function HabitCard({ habitCardObj }: HabitCardProps) {
  return (
    <Link
      to={`/habit/${habitCardObj.habitId}`}
      className="
        bg-ds-surface
        rounded-ds
        border border-ds-border
         hover:border-ds-primary
        shadow-ds
        transition-all duration-200 ease-out
        hover:-translate-y-1
        hover:shadow-lg
        active:translate-y-0
        p-4
        text-ds-ink
        active:bg-ds-accent
        select-none
      "
    >
      <div className="flex flex-col items-start justify-between mb-3">
        <div className="flex w-full justify-between">
          <h2 className="text-lg font-semibold ">{habitCardObj.habitTitle}</h2>
          <HabitCardMenu habitCardObj={habitCardObj} />
        </div>
        <div>
          <span className="text-xs text-ds-ink-muted">30일</span>
        </div>
      </div>

      <div className="text-sm mb-4 text-ds-ink-muted">
        {dayjs(habitCardObj.createdAt).format("YYYY년 MM월 DD일")}
      </div>

      <div className="flex items-center gap-3 ">
        <progress
          max={30}
          value={habitCardObj.doneCount}
          className="
                    w-full
                    h-2
                    overflow-hidden
                    rounded-ds-pill

                    [&::-webkit-progress-bar]:bg-black/10
                    [&::-webkit-progress-bar]:rounded-ds-pill

                    [&::-webkit-progress-value]:bg-ds-primary
                    [&::-webkit-progress-value]:rounded-ds-pill

                    [&::-moz-progress-bar]:bg-ds-primary
                  "
        />
        <span className="text-sm text-gray-600 min-w-[3ch] text-right">
          {habitCardObj.doneCount}/30
        </span>
      </div>
    </Link>
  );
}
