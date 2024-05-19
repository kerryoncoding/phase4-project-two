import * as React from "react";
import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

import NavBar from "./components/NavBar"
import App from "./App"
import "./App.css"

const AppLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const Router = () => (
  <BrowserRouter>
    <AppLayout />
    <App />
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(<Router />);

