import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import { Habit } from "../features/habit/Habit";
import { LoginPage } from "../features/auth/LoginPage";
import { HabitListPage } from "../features/habit/HabitListPage";
import { RootLayout } from "../layout/RootLayout";
import { ProtectedLayout } from "./ProtectedLayout";
import { PublicOnlyLayout } from "./PublicOnlyLayout";
import { NotFoundPage } from "../features/error/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/habit",
            element: <HabitListPage />,
          },
          {
            path: "/habit/:id",
            element: <Habit />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicOnlyLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
