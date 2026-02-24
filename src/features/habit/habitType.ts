export type HabitPlace = "HOME" | "WORK" | "OUT" | "GYM" | "ETC";
export type HabitDifficulty = "EASY" | "NORMAL" | "HARD";
export type HabitCondition = "GOOD" | "NORMAL" | "BAD";
export type HabitCompleted = "SUCCESS" | "FAILED";

export interface HabitDay {
  habitDayId: number;
  habitIndex: number;
  habitComment: string;
  habitPlace: HabitPlace;
  habitDifficulty: HabitDifficulty;
  habitCondition: HabitCondition;
  updatedAt: string;
  createdAt: string;
  deletedAt?: string;
  completed: HabitCompleted;
}

export interface HabitDayPayload {
  habitId: number;
  habitIndex: number;
  habitComment: string;
  checked: boolean;
}
