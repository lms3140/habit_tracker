import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./global.css";
import { router } from "./router/router";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ApiError } from "./apis/fetch";
import { useAuthTokenStore } from "./store/useAuthTokenStore";
import { useThemeStore } from "./store/useThemeStore";

const AUTH_REASON_KEY = "auth-reason";

useThemeStore.getState().initDomTheme();

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof ApiError && err.code === "UNAUTHORIZED") {
        queueMicrotask(() => {
          useAuthTokenStore.getState().clearToken();
          sessionStorage.setItem(AUTH_REASON_KEY, "expired");
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      if (err instanceof ApiError && err.code === "UNAUTHORIZED") {
        queueMicrotask(() => {
          useAuthTokenStore.getState().clearToken();
          sessionStorage.setItem(AUTH_REASON_KEY, "expired");
        });
      }
    },
  }),
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
