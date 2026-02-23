import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import { Habit } from "./features/habit/Habit";
import { LoginPage } from "./features/auth/LoginPage";
import { HabitListPage } from "./features/habit/HabitListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/habit",
    element: <HabitListPage />,
  },
  {
    path: "/habit/:id",
    element: <Habit />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
