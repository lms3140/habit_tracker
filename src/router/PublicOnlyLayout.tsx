import { Navigate, Outlet } from "react-router-dom";
import { useAuthTokenStore } from "../store/useAuthTokenStore";

export function PublicOnlyLayout() {
  const token = useAuthTokenStore((s) => s.token);

  if (token) return <Navigate to="/habit" replace />;
  return (
    <>
      <Outlet />;
    </>
  );
}
