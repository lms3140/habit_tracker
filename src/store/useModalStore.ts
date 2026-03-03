import { create } from "zustand";

type ModalCloseBlockReason = "saving" | "unknown";

type ModalState = {
  isModalOpen: boolean;
  forceEdit: boolean;
  isCloseBlocked: boolean;
  isDirty: boolean;
  openModal: () => void;
  closeModal: () => void;
  programCloseModal: () => void;
  setForceEdit: (v: boolean) => void;
  resetForceEdit: () => void;
  setCloseBlocked: (blocked: boolean, reason?: ModalCloseBlockReason) => void;
  setDirty: (dirty: boolean) => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  isModalOpen: false,
  forceEdit: false,
  isCloseBlocked: false,
  isDirty: false,
  openModal: () =>
    set({
      isModalOpen: true,
    }),
  // 사용자가 닫을때
  closeModal: () => {
    if (get().isCloseBlocked) return;
    set({ isModalOpen: false, forceEdit: false, isDirty: false });
  },
  // 프로그램에서 닫는 역할
  programCloseModal: () => {
    set({
      isModalOpen: false,
      forceEdit: false,
      isCloseBlocked: false,
      isDirty: false,
    });
  },
  setForceEdit: (v) =>
    set({
      forceEdit: v,
    }),

  resetForceEdit: () =>
    set({
      forceEdit: false,
    }),
  setCloseBlocked: (blocked) => {
    set({ isCloseBlocked: blocked });
  },
  setDirty: (dirty: boolean) => set({ isDirty: dirty }),
}));
