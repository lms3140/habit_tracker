import { create } from "zustand";
import type { IHabitCard, IHabitCheck } from "../types/globalType";

import { persist } from "zustand/middleware";

type HabitStore = {
  habits: IHabitCard[];
  addHabit: (newHabit: IHabitCard) => void;
  removeHabit: (habitId: string) => void;
};

export const useHabit = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [
        {
          id: "habit-1",
          title: "물마시기",
          startDate: "2026-01-12",
        },
      ],
      addHabit: (newHabit) =>
        set((state) => ({
          habits: [...state.habits, newHabit],
        })),
      removeHabit: (habitId) =>
        set((state) => ({
          habits: state.habits.filter((v) => v.id !== habitId),
        })),
    }),
    {
      name: "habit-store",
    }
  )
);

type CheckListStore = {
  checkList: IHabitCheck[];
  setCheckList: (habitId: string, index: number) => void;
  getLength: (habitId: string) => number;
};

export const useCheckList = create<CheckListStore>()(
  persist(
    (set, get) => ({
      checkList: [{ habitId: "habit-1", checkList: new Array(30).fill(false) }],
      setCheckList: (habitId, index) => {
        const list = get().checkList;
        const next = list.map((item) => {
          if (item.habitId !== habitId) return item;

          const nextInner = item.checkList.map((v, i) => {
            return i === index ? !v : v;
          });
          return { ...item, checkList: nextInner };
        });

        set({ checkList: next });
      },
      getLength: (habitId) => {
        const value = get()
          .checkList.find((v) => v.habitId === habitId)
          ?.checkList.filter((v) => v).length;
        return value ?? 0;
      },
    }),
    {
      name: "checklist-store",
    }
  )
);
