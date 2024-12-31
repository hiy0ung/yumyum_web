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
}

export interface MenuOptionDetail {
  optionDetailName: string;
  additionalFee: number;
}

export interface MenuOption {
  optionName: string;
  optionDetail: MenuOptionDetail[];
}
export interface AddMenu {
  categoryId: number;
  menuName: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  isAvailable: boolean;
  menuOption: MenuOption[];
}

export interface UpdateMenu {
  categoryId : number;
  menuName: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  isAvailable: boolean;
  menuCategory: string;
  menuOption: MenuOption[];
}

export interface Menus {
  menuId: number;
  menuCategory: string;
  menuName: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  isAvailable: boolean;
  menuOptions: MenuOption[];
}

export interface AddCategory {
  menuCategory: string;
  menuCategorySequence: number;
}