import { create } from "zustand";
import { MenuData } from "../types/Menu";

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

interface SaveOptionId {
  data: MenuData,
  setData: (newData: MenuData) => void;
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

export const savedOptionId = create<SaveOptionId>((set) => ({
  data: {
    menuId: 0,
    menuName: "",
    menuCategory: "",
    imageUrl: "",
    menuDescription: "",
    menuPrice: 0,
    menuOptions: [{
      menuOptionId: 0,
        optionName: "",
        optionDetails: [{
          detailId: 0,
          optionDetailName: "",
          additionalFee: 0,
        }]
    }]
},
setData: (newData: MenuData) => set({ data: newData })
}))