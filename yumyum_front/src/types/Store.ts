import dayjs from "dayjs";

export interface StoreInfo {
  storeName: string;
  logoUrl: string | ArrayBuffer | null;
  category: string;
  openingTime: string;
  closingTime: string;
  breakStartTime: string;
  breakEndTime: string;
  address: string;
  description: string;
}

export interface TimeInfo {
  opningTime: dayjs.Dayjs;
  closingTime: dayjs.Dayjs;
  breakStartTime: dayjs.Dayjs;
  breakEndTime: dayjs.Dayjs;
}