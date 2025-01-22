export interface CurrentStore {
  storeDate: string;
  storeCompletedCount: number;
  storeTotalPrice: number;
}

export interface OrderInfo {
  orderId: number;
  storeId: number;
  deliveryAddress: string;
  orderDate: string;
  guestNickName: string;
  orderState: string;
  sumTotalPrice: number;
}

export interface OrderDetailInfo {
  orderId: number;
  orderDetailId: number;
  deliveryAddress: string;
  menuName: string;
  orderState: string;
  menuPrice: number;
  quantity: number;
}

export interface OrderDetailOptionInfo {
  orderDetailId: number;
  menuName: string;
  menuOptionName: string;
  menuOptionDetailName: string;
  additionalFee: number;
}