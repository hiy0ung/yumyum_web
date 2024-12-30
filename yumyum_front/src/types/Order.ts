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
  menuPrice: number;
  quantity: number;
  menuOptionName: string;
  menuOptionDetailName: string;
  additionalFee: number;
}