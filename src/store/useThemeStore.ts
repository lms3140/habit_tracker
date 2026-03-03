import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DsTheme = "white" | "black" | "grape" | "choco";

const THEMES: DsTheme[] = ["white", "black", "grape", "choco"];

function applyThemeToDom(theme: DsTheme) {
  document.documentElement.dataset.theme = theme;
}

function nextTheme(current: DsTheme): DsTheme {
  const idx = THEMES.indexOf(current);
  return THEMES[(idx + 1) % THEMES.length];
}

export const useThemeStore = create(
  persist<{
    theme: DsTheme;
    setTheme: (theme: DsTheme) => void;
    cycleTheme: () => void;
    initDomTheme: () => void;
  }>(
    (set, get) => ({
      theme: "white",

      setTheme: (theme) => {
        applyThemeToDom(theme);
        set({ theme });
      },

      cycleTheme: () => {
        const cur = get().theme;
        const nxt = nextTheme(cur);
        applyThemeToDom(nxt);
        set({ theme: nxt });
      },

      initDomTheme: () => {
        applyThemeToDom(get().theme);
      },
    }),
    {
      name: "ds-theme",
      version: 1,
    },
  ),
);
