import { create } from "zustand";

interface User {
  token: string
}

interface AuthStoreType {
  isAuthenticated: boolean; 
  user: User | null; 

  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStoreType>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;