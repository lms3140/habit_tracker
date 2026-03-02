import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthTokenStore } from "../store/useAuthTokenStore";

const AUTH_REASON_KEY = "auth-reason";

export function ProtectedLayout() {
  const { token } = useAuthTokenStore();
  const location = useLocation();
  if (!token) {
    const reason = sessionStorage.getItem(AUTH_REASON_KEY);
    // 한 번만 보여주고 치우기
    if (reason) sessionStorage.removeItem(AUTH_REASON_KEY);

    const to = reason === "expired" ? "/login?reason=expired" : "/login";

    return (
      <Navigate
        to={to}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}
