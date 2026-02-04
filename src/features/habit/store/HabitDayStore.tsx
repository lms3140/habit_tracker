import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HabitDay {
  habitId: number;
  isChecked: boolean;
  habitIndex: number;
  habitComment: string;
}

type HabitDayState = {
  habitDay: HabitDay | null;
  setHabitDay: (habitDay: HabitDay) => void;
  clearHabitDay: () => void;
};

export const useHabitDayStore = create<HabitDayState>()(
  persist(
    (set) => ({
      habitDay: null,
      setHabitDay: (habitDay) => set({ habitDay }),
      clearHabitDay: () => set({ habitDay: null }),
    }),
    {
      name: "habit-day",
      partialize: (state) => ({ habitDay: state.habitDay }),
    },
  ),
);
