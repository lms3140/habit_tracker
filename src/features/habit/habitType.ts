export interface HabitDay {
  habitDayId: number;
  habitIndex: number;
  habitComment: string;
  updatedAt: string;
  createdAt: string;
  checked: boolean;
}

export interface HabitDayPayload {
  habitId: number;
  habitIndex: number;
  habitComment: string;
  checked: boolean;
}
