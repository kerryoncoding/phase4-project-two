import React from "react"
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import NavBar from "./NavBar"
import Home from "./Home"
import About from "./About"
import Create from "./Create"
import '../App.css';

const router = createBrowserRouter([
   {
      element: <NavBar />,
      children: [
         {
            path: "/about",
            element: <About />,
         },
         {
            path: "/create",
            element: <Create />,
         },
         {
            path: "/",
            element: <Home />,
         },
      ],
   },
]);


function App() {
   return (
      <div>
         <RouterProvider route={router} />
      </div>
   );
}

export default App;
