import React from "react";

export interface Category {
  id: number;
  menuCategory: String;
  menuCategorySequence: number;
}

export interface MenuModalProps {
  modalStatus: boolean;
  closeModal: () => void;
  categories: Category[];
  fetchData: () => void;
  updateMenudata: UpdateMenu;
  updateOptionChecked: boolean[];
  setUpdateOptionChecked: React.Dispatch<React.SetStateAction<boolean[]>>
  menus: Menus[];
  selectedMenuId: number;
}

export interface MenuOptionDetails {
  optionDetailName: string;
  additionalFee: number;
}

export interface MenuOptions {
  menuOptionId: number;
  optionName: string;
  optionDetails: MenuOptionDetails[];
}
export interface AddMenu {
  categoryId: number;
  menuName: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  isAvailable: boolean;
  menuOptions: MenuOptions[];
}

export interface UpdateMenu {
  categoryId : number;
  menuName: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  isAvailable: boolean;
  menuOptions: UpdateOptions[];
}

export interface UpdateOptions {
  menuId: number;
  optionName: string;
  optionDetails: UpdateOptionDetails[]
}

export interface UpdateOptionDetails {
  menuOptionId: number;
  detailName: UpdateDetailName[]
}

export interface UpdateDetailName {
  optionDetailName: string;
  additionalFee: number;
}

export interface Menus {
  menuId: number;
  menuCategory: string;
  menuName: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  isAvailable: boolean;
  menuOptions: MenuOptions[];
}

export interface AddCategory {
  menuCategory: string;
  menuCategorySequence: number;
}

export interface MenuOptionDetailData {
  detailId: number;
  optionDetailName: string;
  additionalFee: number;
}

export interface MenuOptionData {
  menuOptionId: number;
  optionName: string;
  optionDetails: MenuOptionDetailData[]
}
export interface MenuData {
  menuId: number;
  menuName: string;
  menuCategory: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  menuOptions: MenuOptionData[]
}