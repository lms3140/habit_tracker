import { Button } from "./Button";

type BackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  children: React.ReactNode;
};
export function BackButton({
  children,
  className = "",
  ...props
}: BackButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      className={`${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
