export type ButtonSize = "icon" | "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

const sizeClasses: Record<ButtonSize, string> = {
  icon: "h-9 w-9 p-0", // 카드 헤더 액션
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

const base =
  "inline-flex items-center justify-center rounded-ds text-sm font-semibold " +
  "transition-all duration-150 ease-out " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ds-primary text-ds-ink hover:brightness-95",

  secondary:
    "bg-ds-surface text-ds-ink border border-ds-border hover:bg-ds-accent",

  // 보조 액션
  ghost: "bg-transparent text-ds-ink hover:bg-ds-accent",

  // 파괴적 액션
  destructive:
    "bg-ds-surface text-red-600 border border-red-200 hover:bg-red-50",
};

const ghost =
  "border border-transparent bg-transparent " +
  "hover:bg-ds-accent hover:border-ds-border " +
  "focus-visible:bg-ds-accent focus-visible:border-ds-border";

export function buttonClass({
  variant = "primary",
  size = "md",
  className = "",
  ghostMode = false,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  ghostMode?: boolean;
}) {
  return `${base} ${variants[variant]} ${sizeClasses[size]} ${className} ${ghostMode ? ghost : ""}`;
}
