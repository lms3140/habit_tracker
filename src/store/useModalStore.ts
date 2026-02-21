import { create } from "zustand";

type ModalState = {
  isModalOpen: boolean;
  forceEdit: boolean;
  openModal: () => void;
  closeModal: () => void;
  setForceEdit: (v: boolean) => void;
  resetForceEdit: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  forceEdit: false,

  openModal: () =>
    set({
      isModalOpen: true,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      forceEdit: false,
    }),

  setForceEdit: (v) =>
    set({
      forceEdit: v,
    }),

  resetForceEdit: () =>
    set({
      forceEdit: false,
    }),
}));
