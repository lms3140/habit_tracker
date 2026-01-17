import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import { Habit } from "./Habit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/habit/:id",
    element: <Habit />,
  },
]);
