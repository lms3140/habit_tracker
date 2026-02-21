export interface IHabitCard {
  habitId: string;
  habitTitle: string;
  createdAt: string;
  doneCount: number;
}
export interface IHabitCheck {
  habitId: string;
  checkList: boolean[];
}
