export interface IHabitCard {
  id: string;
  title: string;
  startDate: string;
}
export interface IHabitCheck {
  habitId: string;
  checkList: boolean[];
}
