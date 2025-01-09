import {create} from "zustand";

interface storeImage {
  storeImage: string;
  setStoreImg: (img: string) => void;
};

const useStoreImage = create<storeImage>((set) => ({
  storeImage: "",
  setStoreImg: (img) => set({ storeImage: img}),
}))

export default useStoreImage;