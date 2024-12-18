import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SideNavbar() {
  const { pathname } = useLocation();

  return (
    <>
      <aside className="sticky left-0 top-0 z-20 flex flex-col h-screen w-60 bg-white border-r duration-300 ease-in-out ">
        <div className="py-4 ">
          <div className="w-28 h-28 m-auto">
            <NavLink to="/">
              <img
                src="BEFLogo.png"
                alt="Bharat Exam Fest"
                className="w-full h-full rounded-md"
              />
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col flex-1 scroll-container overflow-y-hidden">
          <nav className=" pr-4 ">
            <ul className="my-2 flex flex-col gap-1.5">
              <li>
                <NavLink to="/" className="flex space-x-3">
                  <span
                    className={`${
                      pathname === "/"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg`}
                  ></span>
                  <span
                    className={`${
                      pathname === "/" && "text-white bg-orange-500"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium`}
                  >
                    Income Expense
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/kyc" className="flex space-x-3">
                  <span
                    className={`${
                      pathname === "/kyc"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/kyc" && "text-white bg-orange-500"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    KYC
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/report" className="flex space-x-3">
                  <span
                    className={`${
                      pathname === "/report"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/report" && "text-white bg-orange-500"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    Report
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/addContest" className="flex space-x-3">
                  <span
                    className={`${
                      pathname === "/addContest" ||
                      pathname === "/createContest" ||
                      pathname === "/editContest"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/addContest" ||
                      pathname === "/createContest" ||
                      pathname === "/editContest"
                        ? "text-white bg-orange-500"
                        : "text-black"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    add contest
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contestEarning"
                  className="
                   flex space-x-3"
                >
                  <span
                    className={`${
                      pathname === "/contestEarning"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/contestEarning" &&
                      "text-white bg-orange-500"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    contest earning
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/classes"
                  className="
                   flex space-x-3"
                >
                  <span
                    className={`${
                      pathname === "/classes"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/classes" && "text-white bg-orange-500"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    classes
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contestType"
                  className="
                   flex space-x-3"
                >
                  <span
                    className={`${
                      pathname === "/contestType"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/contestType" && "text-white bg-orange-500"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    contest Type
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/information"
                  className="
                   flex space-x-3"
                >
                  <span
                    className={`${
                      pathname === "/information" ||
                      pathname === "/addIntroduction"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/information" ||
                      pathname === "/addIntroduction"
                        ? "text-white bg-orange-500"
                        : "text-black"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    information
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/subject"
                  className="
                   flex space-x-3"
                >
                  <span
                    className={`${
                      pathname === "/subject" ||
                      pathname === "/addSubject" ||
                      pathname === "/editSubject" ||
                      pathname === "/addSubtopic"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/subject" ||
                      pathname === "/addSubject" ||
                      pathname === "/editSubject" ||
                      pathname === "/addSubtopic"
                        ? "text-white bg-orange-500"
                        : "text-black"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    subject
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/banner"
                  className="
                   flex space-x-3"
                >
                  <span
                    className={`${
                      pathname === "/banner"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/banner" && "text-white bg-orange-500"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    banner
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/feedback"
                  className="
                   flex space-x-3"
                >
                  <span
                    className={`${
                      pathname === "/feedback"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/feedback"
                        ? "text-white bg-orange-500"
                        : "text-black"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    feedback
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/students"
                  className="
                   flex space-x-3"
                >
                  <span
                    className={`${
                      pathname === "/students"
                        ? "border-l-4 border-orange-500"
                        : "border-none"
                    } rounded-r-lg `}
                  ></span>
                  <span
                    className={`${
                      pathname === "/students"
                        ? "text-white bg-orange-500"
                        : "text-black"
                    } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    students
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <ToastContainer
        draggable={false}
        autoClose={2000}
        position={"top-center"}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </>
  );
}
export default SideNavbar;
