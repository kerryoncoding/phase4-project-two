import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home"
import About from "./components/About"
import Create from "./components/Create"
import Squads from "./components/Squads"
import NavBar from "./components/NavBar"
import "./App.css"

const AppLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "squads",
        element: <Squads />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "create",
        element: <Create />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);