import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SideNavbar from "./SideNavbar.js";
import Navbar from "./Navigationbar/Navbar.js";
import PageRouter from "./Router/RouteManger.js";
import LoginPage from "./Login/LoginPage.js";

function Mainpanel() {
  const loginInfo = useSelector((state) => state.authConfig);

  return (
    <>
      {loginInfo.isLoggedIn !== true ? (
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
          <LoginPage />
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <div className="h-full w-56 hidden lg:block xl:block 2xl:block ">
            <SideNavbar />
          </div>
          <div className="relative flex flex-1 flex-col space-y-2 overflow-y-auto bg-slate-100 h-screen overflow-hidden">
            <header className="sticky top-0 z-20 h-auto  w-full bg-white border-b drop-shadow-6 shadow-md  dark:drop-shadow-none">
              <Navbar />
            </header>
            <main className="p-4  h-full">
              <PageRouter />
            </main>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default Mainpanel;
