import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { SlArrowDownCircle, SlArrowUpCircle } from "react-icons/sl";
import { RiMenuLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutConfimation from "./LogoutConfimation";
import { logOut } from "../../Context/Action/Auth";
import { logOutAdmin } from "../../Context/Action";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [confirm, setConfirm] = useState(false);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  function Navigation() {
    setToggle(!toggle);
  }

  const handleToggle = () => setConfirm((prevState) => !prevState);

  const handleLogout = () => {
    toast.success("Logout successfully");
    Navigation();
    setToggle(!toggle);
    setConfirm(!confirm);
    setTimeout(() => {
      dispatch(logOut(), logOutAdmin());
      navigate("/");
    }, [1000]);
  };

  

  return (
    <>
      <div className="sticky top-0 h-20 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none  items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Logo Section */}
        <div className="flex w-16 h-16 items-center p-1 lg:hidden">
          <img
            src="BEFlogo.png"
            alt="Bharat Exam Fest"
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        {/* Search Bar */}
        <div className="hidden sm:block relative">
          <button className="absolute left-3 top-1/2 -translate-y-1/2">
            <GoSearch className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary" />
          </button>
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full p-2 pl-8 text-md rounded-full bg-transparent border border-gray-500 focus:outline-none focus:border-black  md:w-100 xl:w-125"
          />
        </div>

        {/* User Profile and Menu */}
        <div className="hidden text-right lg:block">
          <div className="flex items-center gap-2 2xsm:gap-4">
            <div className="flex justify-center items-center space-x-3 overflow-hidden">
              <div className="relative w-15 h-15 rounded-full overflow-hidden">
                <img
                  src="BEFLogo.png"
                  alt="Bharat Exam Fest"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-medium dark:text-white text-gray-900 text-base lg:block xl:block sm:hidden md:hidden">
                <div className="capitalize">het mangukiya</div>
                <div className="capitalize text-left text-sm text-gray-3000">
                  admin
                </div>
              </div>
              <button
                type="button"
                title="Menu"
                onClick={() => setToggle(!toggle)}
                className="p-2 cursor-pointer "
              >
                {toggle ? (
                  <SlArrowUpCircle className="text-gray-700  w-6 h-6" />
                ) : (
                  <SlArrowDownCircle className="text-gray-700 w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-x-2 sm:gap-x-4 lg:hidden">
          <button
            className="text-md text-slate-500 p-2 hover:bg-slate-500 hover:text-white rounded-full"
            onClick={() => setNavbarOpen(!navbarOpen)}
            title="Menu"
          >
            <RiMenuLine className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden ${
          navbarOpen ? "block" : "hidden"
        } w-full max-h-56  bg-slate-100 border-b-2 border-slate-400 shadow-default transition duration-300 ease-in-out`}
      >
        <nav className="flex flex-col h-full overflow-y-auto duration-300 ease-linear">
          <ul className="mb-6 flex flex-col gap-1.5">
            {[
              "/",
              "/kyc",
              "/report",
              "/addContest",
              "/contestEarning",
              "/classes",
              "/contestType",
              "/information",
              "/subject",
              "/banner",
              "/students",
            ].map((path, index) => (
              <li key={index}>
                <NavLink to={path} className="flex space-x-3">
                  <span
                    className={`border-l-4 ${
                      pathname === path ? "border-orange-500" : "border-none"
                    } rounded-r-lg`}
                  ></span>
                  <span
                    className={`${
                      pathname === path
                        ? "text-white bg-orange-500"
                        : "text-black"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium`}
                  >
                    {path === "/"
                      ? "Income Expense"
                      : path
                          .substring(1)
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Dashboard Menu */}
      <div
        className={`${
          toggle
            ? "absolute right-0 top-18 flex w-62.5 z-20 transition duration-200 ease-in-out flex-col rounded-md border bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-y-1 dark:text-white text-left font-medium capitalize">
          <li onClick={toggleDropdown}>
            <NavLink to="/resetpassword">
              <button
                type="button"
                className={`${
                  pathname === "/resetpassword"
                    ? "text-white bg-gray-600"
                    : "text-black"
                } py-2 px-4 w-full text-left outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600`}
              >
                Reset Password
              </button>
            </NavLink>
          </li>
          <li onClick={handleToggle}>
            <button
              type="button"
              className="py-2 px-4 w-full text-left outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Logout Confirmation */}
      <div className={`${confirm ? "block" : "hidden"}`}>
        <LogoutConfimation
          confirm={confirm}
          onLogout={handleLogout}
          onCancel={handleToggle}
        />
      </div>
    </>
  );
}
export default Navbar;
