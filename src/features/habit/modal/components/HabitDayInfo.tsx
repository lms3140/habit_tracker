import dayjs from "dayjs";

import type {
  HabitCondition,
  HabitDay,
  HabitDifficulty,
  HabitPlace,
} from "../../habitType";

const PLACE_LABEL: Record<HabitPlace, string> = {
  HOME: "집",
  WORK: "회사/학교",
  OUT: "밖",
  GYM: "헬스장/특정",
  ETC: "기타",
};

const DIFFICULTY_LABEL: Record<HabitDifficulty, string> = {
  EASY: "쉬움",
  NORMAL: "보통",
  HARD: "어려움",
};

const CONDITION_LABEL: Record<HabitCondition, string> = {
  GOOD: "좋음",
  NORMAL: "보통",
  BAD: "별로",
};

export function HabitDayInfo({ habitDay }: { habitDay: HabitDay }) {
  return (
    <div className="w-full space-y-4">
      {/* 날짜 */}
      <div className="flex items-center justify-between p-3 bg-ds-surface rounded-ds border border-ds-border shadow-ds">
        <span className="text-sm font-medium text-ds-ink-muted">생성일</span>
        <span className="text-sm text-ds-ink">
          {habitDay.updatedAt
            ? dayjs(habitDay.updatedAt).format("YYYY-MM-DD")
            : dayjs(habitDay.createdAt).format("YYYY-MM-DD")}
        </span>
      </div>

      {/* 진행 현황 */}
      <div className="flex items-center justify-between p-3 bg-ds-accent rounded-ds border border-ds-border shadow-ds">
        <span className="text-sm font-medium text-ds-ink-muted">진행 현황</span>
        <span className="text-lg font-semibold text-ds-ink">
          {habitDay.habitIndex + 1}번째 날
        </span>
      </div>

      {/* 장소/난이도/컨디션 */}
      <div className="p-3 bg-ds-surface rounded-ds border border-ds-border shadow-ds space-y-2">
        <p className="text-sm font-medium text-ds-ink-muted">상태</p>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-ds-pill border border-ds-border bg-ds-surface text-sm">
            <span className="text-ds-ink-muted">장소</span>
            <span className="font-medium text-ds-ink">
              {PLACE_LABEL[habitDay.habitPlace] ?? habitDay.habitPlace}
            </span>
          </span>

          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-ds-pill border border-ds-border bg-ds-surface text-sm">
            <span className="text-ds-ink-muted">난이도</span>
            <span className="font-medium text-ds-ink">
              {DIFFICULTY_LABEL[habitDay.habitDifficulty] ??
                habitDay.habitDifficulty}
            </span>
          </span>

          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-ds-pill border border-ds-border bg-ds-surface text-sm">
            <span className="text-ds-ink-muted">컨디션</span>
            <span className="font-medium text-ds-ink">
              {CONDITION_LABEL[habitDay.habitCondition] ??
                habitDay.habitCondition}
            </span>
          </span>
        </div>
      </div>

      {/* 메모 */}
      <div className="p-3 bg-ds-surface rounded-ds border border-ds-border shadow-ds">
        <p className="text-sm font-medium text-ds-ink-muted mb-2">메모</p>

        <p className="text-sm text-ds-ink wrap-break-word whitespace-pre-wrap">
          {habitDay.habitComment ? (
            habitDay.habitComment
          ) : (
            <span className="text-ds-ink-muted italic">메모가 없습니다</span>
          )}
        </p>
      </div>
    </div>
  );
}
