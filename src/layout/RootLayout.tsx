import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthTokenStore } from "../store/useAuthTokenStore";
import { getMe } from "../features/auth/apis/auth";
import { useEffect } from "react";
import { useModalStore } from "../store/useModalStore";
import { ThemeSwitcher } from "../components/themeSwitcher/themeSwitcher";

export function RootLayout() {
  const token = useAuthTokenStore((s) => s.token);
  const location = useLocation();
  const { programCloseModal } = useModalStore();

  useEffect(() => {
    programCloseModal();
  }, [location.pathname, programCloseModal]);

  useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(token as string),
    enabled: Boolean(token),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return (
    <div className="min-h-dvh max-h-full pt-10 pb-10 bg-ds-bg">
      <ThemeSwitcher />
      <Outlet />
    </div>
  );
}
