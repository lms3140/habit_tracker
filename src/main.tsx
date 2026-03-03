import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./global.css";
import { router } from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiError } from "./apis/fetch";
import { useAuthTokenStore } from "./store/useAuthTokenStore";
import { useThemeStore } from "./store/useThemeStore";

const AUTH_REASON_KEY = "auth-reason";

useThemeStore.getState().initDomTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.code === "UNAUTHORIZED")
          return false;
        return failureCount < 1;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

// 401 전역처리
queryClient.getQueryCache().subscribe((event) => {
  const err = event?.query?.state?.error;
  if (err instanceof ApiError && err.code === "UNAUTHORIZED") {
    useAuthTokenStore.getState().clearToken();
    sessionStorage.setItem(AUTH_REASON_KEY, "expired");
  }
});

// 401 뮤테이션 처리
queryClient.getMutationCache().subscribe((event) => {
  const err = event?.mutation?.state?.error;
  if (err instanceof ApiError && err.code === "UNAUTHORIZED") {
    useAuthTokenStore.getState().clearToken();
    sessionStorage.setItem(AUTH_REASON_KEY, "expired");
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
