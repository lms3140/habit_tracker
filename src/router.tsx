import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import { Habit } from "./features/habit/Habit";
import { LoginPage } from "./features/auth/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
