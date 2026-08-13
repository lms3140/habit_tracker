import { create } from "zustand";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  isAuth: AuthStatus;
  setIsAuth: (isAuth: AuthStatus) => void;
};

export const useAuthState = create<AuthState>((set) => ({
  isAuth: "loading",
  setIsAuth: (isAuth) => set({ isAuth }),
}));
