import * as React from "react";
import {
  buttonClass,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

type ButtonProps = {
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  ghostMode?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  disabled,
  ghostMode,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      aria-busy={isLoading || undefined}
      disabled={isDisabled}
      className={`${buttonClass({ variant, size, className, ghostMode })} ${
        isDisabled ? "disabled:opacity-60 disabled:cursor-not-allowed" : ""
      }`}
      {...props}
    >
      <span className="inline-flex min-w-14 items-center justify-center">
        {isLoading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80" />
        ) : (
          <span className="truncate">{children}</span>
        )}
      </span>
    </button>
  );
}
