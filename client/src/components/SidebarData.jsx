import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
      title: " Home",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
   },
   {
      title: "Squads",
      path: "/squads",
      //  icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
  },
  {
      title: "About",
      path: "/about",
      //  icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
  },
  {
      title: "Create",
      path: "/create",
      //  icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
   },
   {
      title: "Login",
      path: "/login",
      //  icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
  },
];
