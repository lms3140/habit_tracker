import { create } from "zustand";

// TODO - 2026.02.14 삭제 6달뒤 삭제예정

// type HabitDayListState = {
//   habitDayList: (HabitDay | null)[];
//   updateHabitDayAt: (index: number, updated: HabitDay) => void;
//   resetHabitDayList: () => void;
// };
// export const useHabitDayListStore = create<HabitDayListState>((set) => ({
//   habitDayList: new Array(30).fill(null),
//   updateHabitDayAt: (index, updated) =>
//     set((state) => ({
//       habitDayList: state.habitDayList.map((item, i) =>
//         i === index ? updated : item,
//       ),
//     })),
//   resetHabitDayList: () => set({ habitDayList: new Array(30).fill(null) }),
// }));

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
