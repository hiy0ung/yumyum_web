export interface StoreInfo {
  storeName: string;
  logoUrl: string | File | null;
  category: string;
  openingTime: string;
  closingTime: string;
  breakStartTime: string;
  breakEndTime: string;
  zoneCode: string;
  address: string;
  detailAddress: string;
  description: string;
}

export interface TimeInfo {
  openingTime: string;
  closingTime: string;
  breakStartTime: string;
  breakEndTime: string;
}