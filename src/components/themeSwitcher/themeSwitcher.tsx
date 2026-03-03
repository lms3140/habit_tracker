import { useThemeStore, type DsTheme } from "../../store/useThemeStore";

const LABEL: Record<DsTheme, string> = {
  white: "화이트",
  black: "블랙",
  grape: "그레이프",
  choco: "초코",
};

export function ThemeSwitcher() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const cycleTheme = useThemeStore((s) => s.cycleTheme);

  return (
    <div className="flex items-center gap-2">
      {/* 순환 버튼 */}
      <button
        type="button"
        onClick={cycleTheme}
        className="h-10 rounded-ds border border-ds-border bg-ds-surface px-4 text-ds-ink shadow-ds hover:bg-ds-accent"
      >
        테마: {LABEL[theme]} (순환)
      </button>

      {/* 직접 선택 */}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as DsTheme)}
        className="h-10 rounded-ds border border-ds-border bg-ds-surface px-3 text-ds-ink"
      >
        <option value="white">화이트</option>
        <option value="black">블랙</option>
        <option value="grape">그레이프</option>
        <option value="choco">초코</option>
      </select>
    </div>
  );
}
