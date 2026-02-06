import { create } from "zustand";
import type { HabitDay } from "../habitType";

type HabitDayListState = {
  habitDayList: (HabitDay | null)[];
  updateHabitDayAt: (index: number, updated: HabitDay) => void;
  resetHabitDayList: () => void;
};
export const useHabitDayListStore = create<HabitDayListState>((set) => ({
  habitDayList: new Array(30).fill(null),
  updateHabitDayAt: (index, updated) =>
    set((state) => ({
      habitDayList: state.habitDayList.map((item, i) =>
        i === index ? updated : item,
      ),
    })),
  resetHabitDayList: () => set({ habitDayList: new Array(30).fill(null) }),
}));

type HabitDayIndexState = {
  habitIndex: number | null;
  setHabitIndex: (index: number | null) => void;
  clearHabitIndex: () => void;
};

export const useHabitDayIndexStore = create<HabitDayIndexState>((set) => ({
  habitIndex: null,

  setHabitIndex: (index) => set({ habitIndex: index }),

  clearHabitIndex: () => set({ habitIndex: null }),
}));
