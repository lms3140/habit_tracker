type HabitState<T> = {
  Habit: T;
  setHabit: (habit: T) => void;
  reset: () => void;
};
