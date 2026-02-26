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
    <button
      type="button"
      className={`inline-flex items-center gap-2 h-10 px-3 
        select-none bg-ds-surface text-ds-ink border
         border-ds-border rounded-ds-pill shadow-ds t
         ransition duration-150 hover:bg-ds-accent 
         active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ds-ring focus-visible:ring-offset-2 
          focus-visible:ring-offset-ds-bg disabled:opacity-50 
          disabled:cursor-not-allowed disabled:shadow-none 
          disabled:hover:bg-ds-surface ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
