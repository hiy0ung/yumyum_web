import { create } from "zustand";

interface ModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface updateModalState {
  updateModalState: boolean;
  updateModalOpen: () => void;
  updateModalClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))

export const updateModalStore = create<updateModalState>((set) => ({
  updateModalState: false,
  updateModalOpen: () => set({ updateModalState: true}),
  updateModalClose: () => set({ updateModalState: false}),
}))