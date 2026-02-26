import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="min-h-dvh max-h-full pt-10 pb-10 bg-ds-bg">
      <Outlet />
    </div>
  );
}
