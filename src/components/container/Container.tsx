type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto bg-ds-bg max-w-2xl px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
}
