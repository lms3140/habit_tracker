import { create } from "zustand";
import type { IHabitCard } from "../../../types/globalType";

type HabitModalState = {
  habitCard: IHabitCard | null;
  setHabitCard: (card: IHabitCard) => void;
  reset: () => void;
};

export const useHabitModalStore = create<HabitModalState>((set) => ({
  habitCard: null,
  setHabitCard: (card) => set({ habitCard: card }),
  reset: () => set({ habitCard: null }),
}));
