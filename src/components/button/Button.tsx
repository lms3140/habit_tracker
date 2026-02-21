import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "destructive";

const base =
  "inline-flex items-center justify-center rounded-ds px-4 py-2 text-sm font-semibold " +
  "transition-all duration-150 ease-out " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ds-primary text-ds-ink " + "hover:brightness-95",

  secondary:
    "bg-ds-surface text-ds-ink border border-ds-border " + "hover:bg-ds-accent",

  destructive:
    "bg-ds-surface text-red-600 border border-red-200 " + "hover:bg-red-50",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
