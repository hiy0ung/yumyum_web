import {create} from "zustand";

interface ShopTimeState {
    openingTime: string;
    closingTime: string;
    breakStartTime: string;
    breakEndTime: string;
    setStoreTimes: (times: {openingTime: string; closingTime: string; breakStartTime: string; breakEndTime: string;}) => void
};

const useStoreTimes = create<ShopTimeState>((set) => ({
  openingTime: "",
  closingTime: "",
  breakStartTime: "",
  breakEndTime: "",
  setStoreTimes: (times) => set({
    openingTime: times.openingTime,
    closingTime: times.closingTime,
    breakStartTime: times.breakStartTime,
    breakEndTime: times.breakEndTime,
  }),
}));

export default useStoreTimes;