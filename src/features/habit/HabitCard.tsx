import { Link } from "react-router-dom";
import type { IHabitCard } from "../../types/globalType";
import { HabitCardMenu } from "./modal/components/HabitCardMenu";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/card/Card";

export type HabitCardProps = {
  habitCardObj: IHabitCard;
};

export function HabitCard({ habitCardObj }: HabitCardProps) {
  return (
    <Link className="block" to={`/habit/${habitCardObj.habitId}`}>
      <Card className="transition-all hover:-translate-y-px hover:border-ds-ring ">
        <CardHeader>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold ">
              {habitCardObj.habitTitle}
            </h2>
            <HabitCardMenu habitCardObj={habitCardObj} />
          </div>
          <span className="text-xs text-ds-ink-muted">30일</span>
        </CardHeader>
        <CardContent>
          <div className="text-sm mb-4 text-ds-ink-muted">
            {dayjs(habitCardObj.createdAt).format("YYYY년 MM월 DD일")}
          </div>
        </CardContent>
        <CardFooter>
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
          <span className="text-sm text-ds-ink-muted min-w-[5ch] text-right">
            {habitCardObj.doneCount}/30
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
