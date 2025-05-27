export interface ResponseRevenueStatsTime {
  date: string;
  hour: number;
  revenue: number;
}
export interface ResponseQuantityStatsTime {
  date: string;
  hour: number;
  quantity: number;
}

export interface RevenueStatsTime {
  name: number;
  revenue: number;
}

export interface QuantityStatsTime {
  name: number;
  quantity: number;
}

export interface Calender { 
  calendar: boolean;
}