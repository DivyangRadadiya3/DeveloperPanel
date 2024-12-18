import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TfiStatsUp, TfiStatsDown, TfiPlus } from "react-icons/tfi";
import { FiBox } from "react-icons/fi";

function Dashboard() {
  return (
    <>
      <section className="py-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-6 2xl:grid-cols-4 2xl:gap-6">
          <div className="bg-white shadow-md border rounded-lg p-5 space-y-4">
            <div className="flex flex-row items-center justify-between">
              <div className="text-start">
                <h2 className="font-bold uppercase text-gray-600">
                  Total Contents
                </h2>
              </div>
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
              <p className="font-semibold text-2xl">40,000 </p>
            </div>
            <div className="flex items-center gap-x-1 text-md font-medium text-meta-3">
              <svg className="text-green-600 w-6 h-6" viewBox="0 0 16 16">
                <TfiStatsUp />
              </svg>

              <p className=" text-green-600 font-medium  text-left capitalize">
                8.5%
              </p>
              <span className="ml-1 text-slate-600 font-medium ">
                Up from yesterday
              </span>
            </div>
          </div>
          <div className="bg-white shadow-md border rounded-lg p-5 space-y-4">
            <div className="flex flex-row items-center justify-between">
              <div className=" text-start">
                <h2 className="font-bold uppercase text-gray-600">
                  Total questions
                </h2>
              </div>
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
              <p className="font-semibold text-2xl">40,000 </p>
            </div>
            <div className="flex items-center gap-x-1 text-md font-medium text-meta-3">
              <svg className="text-green-600 w-6 h-6" viewBox="0 0 16 16">
                <TfiStatsUp />
              </svg>

              <p className=" text-green-600 font-medium  text-left capitalize">
                1.5%
              </p>
              <span className="ml-1 text-slate-600 font-medium ">
                Up from yesterday
              </span>
            </div>
          </div>
          <div className="bg-white shadow-md border rounded-lg p-5 space-y-4">
            <div className="flex flex-row items-center justify-between">
              <div className=" text-start">
                <h2 className="font-bold uppercase text-gray-600">
                  Total Contents
                </h2>
              </div>
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
              <p className="font-semibold text-2xl">10,000 </p>
            </div>
            <div className="flex items-center gap-x-1 text-md font-medium text-meta-3">
              <svg className="text-red-600 w-6 h-6" viewBox="0 0 16 16">
                <TfiStatsDown />
              </svg>

              <p className=" text-red-600 font-medium  text-left capitalize">
                3.5%
              </p>
              <span className="ml-1 text-slate-600 font-medium ">
                Down from yesterday
              </span>
            </div>
          </div>
          <div className="rounded-lg flex flex-col w-full h-full  space-y-1 overflow-hidden">
            <div className="inline-flex w-full items-center space-x-2 rounded-xl px-2 py-4 text-md text-center font-normal uppercase text-white bg-orange-400 hover:bg-opacity-90 cursor-pointer">
              <svg
                className="font-semibold text-white w-4 h-4"
                viewBox="0 0 16 16"
              >
                <TfiPlus />
              </svg>
              <p className=" font-medium  text-left ">create new courses</p>
            </div>
            <div className="grid grid-cols-2 gap-3 h-full">
              <div className="flex flex-col py-4 px-3 space-y-3 w-full rounded-xl border border-stroke bg-orange-200   shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="">
                  <h4 className="text-lg text-left font-normal text-black dark:text-white capitalize">
                    courses in progress
                  </h4>
                </div>
                <div className="flex items-center justify-between text-xl font-medium text-meta-3">
                  <p className="border-2 border-orange-600 h-8 rounded-r-md "></p>
                  <h1 className="font-medium text-4xl  text-orange-500">03</h1>
                </div>
              </div>

              <div className="flex flex-col  py-4 px-3 space-y-3 w-full rounded-xl border border-stroke bg-orange-200   shadow-default dark:border-strokedark dark:bg-boxdark">
                <p className=" text-lg text-left font-normal text-black dark:text-white capitalize">
                  courses in progress
                </p>

                <div className="flex items-start justify-between text-xl font-medium text-meta-3">
                  <p className="border-2 border-orange-600 h-8 rounded-r-md "></p>
                  <p className="font-medium text-4xl  text-orange-500">03</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Dashboard;
