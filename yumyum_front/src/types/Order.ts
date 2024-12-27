export interface OrderInfo {
  orderId: number;
  storeId: number;
  deliveryAddress: string;
  orderDate: Date;
  guestNickName: string;
  orderState: string;
  sumTotalPrice: number;
}