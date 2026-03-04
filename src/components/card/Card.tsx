import type React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;
type CardSectionProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-ds-surface border border-ds-border rounded-ds shadow-ds ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardSectionProps) {
  return <div className={`p-4 pb-2 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: CardSectionProps) {
  return <div className={`p-4 pt-2 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: CardSectionProps) {
  return (
    <div
      className={`p-4 pt-0 flex items-center justify-between ${className}`}
      {...props}
    />
  );
}
