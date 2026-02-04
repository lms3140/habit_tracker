import { create } from "zustand";

import { persist } from "zustand/middleware";

type AuthTokenState = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  isAuthed: () => boolean;
};

export const useAuthTokenStore = create<AuthTokenState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      isAuthed: () => Boolean(get().token),
    }),
    {
      name: "auth-token",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
