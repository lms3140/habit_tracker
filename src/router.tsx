import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import { Habit } from "./features/habit/Habit";
import { LoginPage } from "./features/auth/LoginPage";
import { HabitListPage } from "./features/habit/HabitListPage";
import { RootLayout } from "./layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <RootLayout />,
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
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
