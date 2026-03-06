type PageProps = {
  children?: React.ReactNode;
  className?: string;
};
export function Page({ children, className }: PageProps) {
  return (
    <main className={`min-h-dvh pt-10 pb-10 bg-ds-bg ${className ?? ""}`}>
      {children}
    </main>
  );
}
