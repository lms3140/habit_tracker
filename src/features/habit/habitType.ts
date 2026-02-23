export interface HabitDay {
  habitDayId: number;
  habitIndex: number;
  habitComment: string;
  habitPlace: string;
  habitDifficulty: string;
  habitCondition: string;
  updatedAt: string;
  createdAt: string;
  deletedAt?: string;
  checked: boolean;
}

export interface HabitDayPayload {
  habitId: number;
  habitIndex: number;
  habitComment: string;
  checked: boolean;
}
