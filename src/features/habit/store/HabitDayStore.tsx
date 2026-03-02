import { create } from "zustand";

type HabitDayModalState = {
  habitIndex: number | null;
  habitDayId: number | null;
  setHabitIndex: (index: number | null) => void;
  clearHabitIndex: () => void;
  setHabitDayId: (habitDayId: number) => void;
  clearHabitDayId: () => void;
};

export const useHabitDayModalStore = create<HabitDayModalState>((set) => ({
  habitIndex: null,
  habitDayId: null,

  setHabitIndex: (index) => set({ habitIndex: index }),
  clearHabitIndex: () => set({ habitIndex: null }),
  setHabitDayId: (habitDayId) => set({ habitDayId }),
  clearHabitDayId: () => set({ habitDayId: null }),
}));
