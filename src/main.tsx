import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./global.css";
import { router } from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiError } from "./apis/fetch";
import { useAuthTokenStore } from "./store/useAuthTokenStore";
const AUTH_REASON_KEY = "auth-reason"; // sessionStorage에 잠깐 저장할 키

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // 401은 재시도 의미가 없으니 끄기
        if (error instanceof ApiError && error.code === "UNAUTHORIZED")
          return false;
        // MVP: 나머지는 1회만 재시도(원하시면 0으로)
        return failureCount < 1;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

// ✅ 전역 401 처리: 토큰 비우고, "만료" 플래그만 남김
queryClient.getQueryCache().subscribe((event) => {
  const err = event?.query?.state?.error;
  if (err instanceof ApiError && err.code === "UNAUTHORIZED") {
    useAuthTokenStore.getState().clearToken();
    sessionStorage.setItem(AUTH_REASON_KEY, "expired");
  }
});

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
