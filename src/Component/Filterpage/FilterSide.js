import React from "react";
import { RxCross1 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FilterSide({ filter, setFilter }) {
 
  return (
    <>
      <div className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center max-w-sm min-h-screen text-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="absolute right-0 inline-block w-full min-h-screen bg-white rounded-l-xl space-y-4 px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:max-w-sm sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="text-black w-full bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-4 py-2.5 text-center inline-flex items-center justify-between dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <p className="text-lg"> Filter & Short</p>

              <button
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                className=""
                type="button"
                onClick={setFilter}
              >
                <svg className="w-4 h-4 ml-2" viewBox="0 0 16 16">
                  <RxCross1 />
                </svg>
              </button>
            </div>
            <div
              id="dropdown"
              className="p-3 text-black rounded-lg space-y-4  dark:bg-gray-700"
            >
              <div className="rounded-lg space-y-2 shadow p-4">
                <h6 className=" text-lg font-medium text-gray-700 dark:text-white">
                  Question Type
                </h6>
                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                  <li className="flex items-center justify-between">
                    <label
                      htmlFor="easy"
                      className="ml-2 text-md font-medium text-gray-700 dark:text-gray-100"
                    >
                      Easy
                    </label>
                    <input
                      id="easy"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded-md text-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>

                  <li className="flex items-center justify-between">
                    <label
                      htmlFor="Medium"
                      className="ml-2 text-md font-medium text-gray-700 dark:text-gray-100"
                    >
                      Medium
                    </label>
                    <input
                      id="Medium"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded-md text-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>

                  <li className="flex items-center justify-between">
                    <label
                      htmlFor="hard"
                      className="ml-2 text-md font-medium text-gray-700 dark:text-gray-100"
                    >
                      Hard
                    </label>
                    <input
                      id="hard"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded-md text-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>
                </ul>
              </div>
              <div className="rounded-lg space-y-2 shadow p-4">
                <h6 className=" text-lg font-medium text-gray-700 dark:text-white">
                  Last Modified
                </h6>
                <h6 className=" text-md font-normal text-orange-500 dark:text-white">
                  Sort By
                </h6>
                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                  <li className="flex items-center justify-between">
                    <label
                      htmlFor="new"
                      className="ml-2 text-md font-medium text-gray-700 dark:text-gray-100"
                    >
                      Newest First
                    </label>

                    <input
                      id="new"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded-md text-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>

                  <li className="flex items-center justify-between">
                    <label
                      htmlFor="old"
                      className="ml-2 text-md font-medium text-gray-700 dark:text-gray-100"
                    >
                      Older First
                    </label>
                    <input
                      id="old"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded-lg text-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>

                  <li className="flex items-center justify-between">
                    <label
                      htmlFor="last"
                      className="ml-2 text-md font-medium text-gray-700 dark:text-gray-100"
                    >
                      Last Modified
                    </label>
                    <input
                      id="last"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded-lg text-primary-600 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>
                </ul>
              </div>
              <div className="rounded-lg space-y-2 shadow p-4">
                <h6 className=" text-lg font-medium text-gray-700 dark:text-white">
                  Question Bank
                </h6>
                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                  <li className="flex items-center justify-between">
                    <label
                      htmlFor="q1"
                      className="ml-2 text-md font-medium text-gray-700 dark:text-gray-100"
                    >
                      Question 1
                    </label>
                    <input
                      id="q1"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>

                  <li className="flex items-center justify-between">
                    <label
                      htmlFor="q2"
                      className="ml-2 text-md font-medium text-gray-700 dark:text-gray-100"
                    >
                      Question 2
                    </label>
                    <input
                      id="q2"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>

                  <li className="flex items-center justify-between">
                    <label
                      htmlFor="q3"
                      className="ml-2 text-md font-medium text-gray-700 dark:text-gray-100"
                    >
                      Question 3
                    </label>
                    <input
                      id="q3"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full flex items-center space-x-4">
              <button
                type="button"
                onClick={setFilter}
                data-behavior="cancel"
                className=" w-full rounded-md border border-orange-700 shadow-sm px-4 py-2 bg-white text-base font-medium text-orange-700 hover:text-orange-600 focus:outline-none focus:ring-0 sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={setFilter}
                data-behavior="commit"
                className="w-full  rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-blue-500  sm:text-sm"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>
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
export default FilterSide;
