import React from "react";
import Calander from "../Ui/Calander";
import TimeSelector from "../Ui/TimeSelector";

export default function SelectDate() {
  return (
    <>
      <section className="shadow-md">
        <div className="relative space-y-4 w-full flex flex-col items-center rounded-xl p-4 overflow-hidden text-slate-700 bg-white  bg-clip-border">
          <div class="w-full flex items-center text-nowrap">
            <p className="text-md w-full font-semibold text-slate-900 uppercase">
              Start Date
            </p>
            <p className="text-md w-full font-semibold text-slate-900 uppercase">
              End Date
            </p>
          </div>
          <div className="flex items-center  justify-around border-t border-gray-600 w-full py-4">
            <div className="border border-gray-400 rounded-lg p-2">
              <Calander />
              <div class="flex justify-center items-center space-x-4">
                <button
                  //   onClick={setConfirm}
                  data-modal-toggle="deleteModal"
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-900"
                >
                  Choose Date
                </button>
              </div>
            </div>
            <div className="border border-gray-400 rounded-lg p-2">
              <Calander />
              <div class="flex justify-center items-center space-x-4">
                <button
                  //   onClick={setConfirm}
                  data-modal-toggle="deleteModal"
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-900"
                >
                  Choose Date
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="shadow-md">
        <div className="relative space-y-4 w-full flex flex-col items-center rounded-xl p-4 overflow-hidden text-slate-700 bg-white  bg-clip-border">
          <div class="w-full flex items-center text-nowrap">
            <p className="text-md w-full font-semibold text-slate-900 uppercase">
              Start Time
            </p>
            <p className="text-md w-full font-semibold text-slate-900 uppercase">
              End Time
            </p>
          </div>
          <div className="flex items-center justify-around border-t border-gray-600 w-full py-4">
            <div className="space-y-4">
              <TimeSelector />
              <div class="flex justify-center items-center space-x-4">
                <button
                  //   onClick={setConfirm}
                  data-modal-toggle="deleteModal"
                  type="button"
                  class="py-2 px-4 w-full text-md font-medium text-gray-500 bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="py-2 px-4 w-full text-md font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-900"
                >
                  Choose Time
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <TimeSelector />
              <div class="flex justify-center items-center space-x-4">
                <button
                  //   onClick={setConfirm}
                  data-modal-toggle="deleteModal"
                  type="button"
                  class="py-2 px-4 w-full text-md font-medium text-gray-500 bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="py-2 px-4 w-full text-md font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-900"
                >
                  Choose Time
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
