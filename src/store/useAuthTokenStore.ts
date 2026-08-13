import { create } from "zustand";

import { persist } from "zustand/middleware";

type AuthTokenState = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
};

export const useAuthTokenStore = create<AuthTokenState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "auth-token",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
