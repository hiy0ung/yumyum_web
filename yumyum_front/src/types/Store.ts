import dayjs from "dayjs";

export interface StoreInfo {
  storeName: string;
  logoUrl: string | File | null;
  category: string;
  openingTime: string;
  closingTime: string;
  breakStartTime: string;
  breakEndTime: string;
  address: string;
  detailAddress: string;
  detail2Address: string;
  description: string;
}

export interface TimeInfo {
  openingTime: string;
  closingTime: string;
  breakStartTime: string;
  breakEndTime: string;
}