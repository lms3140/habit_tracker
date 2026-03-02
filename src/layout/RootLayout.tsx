import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useAuthTokenStore } from "../store/useAuthTokenStore";
import { getMe } from "../features/auth/apis/auth";

export function RootLayout() {
  const token = useAuthTokenStore((s) => s.token);

  useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(token as string),
    enabled: Boolean(token),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return (
    <div className="min-h-dvh max-h-full pt-10 pb-10 bg-ds-bg">
      <Outlet />
    </div>
  );
}
