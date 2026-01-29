export interface IHabitCard {
  habitId: string;
  habitTitle: string;
  createdAt: string;
}
export interface IHabitCheck {
  habitId: string;
  checkList: boolean[];
}
