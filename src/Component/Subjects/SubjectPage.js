import React from "react";
import {
  HiOutlineUserGroup,
  HiOutlineEye,
  HiOutlineBookOpen,
} from "react-icons/hi";
import { FiBox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubjectList from "./SubjectList";

function SubjectPage() {
  const navigate = useNavigate();
  function handleSubject() {
    navigate("/subjectDetails");
  }
  return (
    <>
      <section>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                economics
              </p>
              <div className="pr-4">
                <svg
                  className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <HiOutlineUserGroup />
                </svg>
              </div>
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                polity & gov
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-yellow-200 w-16 h-16 text-yellow-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <FiBox />
                </svg>
              </div>
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                geography
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <HiOutlineUserGroup />
                </svg>
              </div>
            </div>
            <div className="text-start">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                refind pyq's
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <HiOutlineUserGroup />
                </svg>
              </div>
            </div>
            <div className="text-start">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                modren history
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-yellow-200 w-16 h-16 text-yellow-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <FiBox />
                </svg>
              </div>
            </div>
            <div className="text-start">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                cureent affairs
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <HiOutlineUserGroup />
                </svg>
              </div>
            </div>
            <div className="text-start">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                full length
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <HiOutlineUserGroup />
                </svg>
              </div>
            </div>
            <div className="text-start">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                art and culture
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <HiOutlineUserGroup />
                </svg>
              </div>
            </div>
            <div className="text-start">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                environment & agriculture
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-yellow-200 w-16 h-16 text-yellow-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <FiBox />
                </svg>
              </div>
            </div>
            <div className="text-start">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                ancient mediaeval history
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <HiOutlineUserGroup />
                </svg>
              </div>
            </div>
            <div className="text-start">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                science and technology
              </p>
              <div className=" pr-4">
                <svg
                  className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                  viewBox="0 0 22 22"
                >
                  <HiOutlineUserGroup />
                </svg>
              </div>
            </div>
            <div className="text-start">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SubjectPage;
