export function parseHabitId(
  habitId: string | number | undefined | null,
): number | null {
  if (habitId == null) return null;

  const targetNumber = typeof habitId === "number" ? habitId : Number(habitId);

  if (!Number.isInteger(targetNumber) || targetNumber <= 0) return null;
  return targetNumber;
}

export const habitQueryKeys = {
  habitList: () => ["habitList"] as const,

  habitDayList: (habitId: number) => ["habitDayList", habitId] as const,

  habitDetail: (habitId: number) => ["habitDetail", habitId] as const,
} as const;
