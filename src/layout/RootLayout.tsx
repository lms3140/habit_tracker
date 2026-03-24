import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthTokenStore } from "../store/useAuthTokenStore";
import { getMe } from "../features/auth/apis/auth";
import { useEffect } from "react";
import { useModalStore } from "../store/useModalStore";
import { Bounce, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const toastContextClass: Record<string, string> = {
  success: "bg-ds-bg text-ds-ink",
  error: "bg-ds-bg text-ds-ink",
  info: "bg-ds-bg text-ds-ink",
  warning: "bg-ds-bg text-ds-ink",
  default: "bg-ds-surface text-ds-ink",
};

export function RootLayout() {
  const token = useAuthTokenStore((s) => s.token);
  const location = useLocation();
  const programCloseModal = useModalStore((s) => s.programCloseModal);

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
    <div className="min-h-dvh bg-ds-bg">
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName={(ctx) =>
          [
            toastContextClass[ctx?.type ?? "default"],
            "relative flex items-center justify-between gap-3",
            "min-h-12 px-4 py-3",
            "rounded-md border border-ds-border shadow-ds",
          ].join(" ")
        }
        transition={Bounce}
      />
    </div>
  );
}
