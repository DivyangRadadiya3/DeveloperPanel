import React from "react";
import Navbar from "../Navigationbar/Navbar";
import Sidebar from "../SideNavbar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <div className="lg:block hidden">
          <Sidebar/>
        </div>
        <div className="relative flex flex-col flex-1 h-screen overflow-hidden">
          {/* Navbar */}
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
