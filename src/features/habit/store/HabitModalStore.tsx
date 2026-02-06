import { create } from "zustand";

type HabitDayModalState = {
  forceEdit: boolean;
  setForceEdit: (v: boolean) => void;
  reset: () => void;
};

export const useHabitDayModalStore = create<HabitDayModalState>((set) => ({
  forceEdit: false,
  setForceEdit: (v) => set({ forceEdit: v }),
  reset: () => set({ forceEdit: false }),
}));
