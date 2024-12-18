import React, { useState } from "react";
import { TfiPlus, TfiFilter, TfiPencil } from "react-icons/tfi";
import { SlArrowDownCircle, SlArrowUpCircle } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmationPage from "./ConfirmationPage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterSide from "../Filterpage/FilterSide";
import MultiSelection from "../MultiselectUi/MultiSelection";

function SubjectDetails() {
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [filter, setFilter] = useState(false);
  function handleCheck() {
    setConfirm(!confirm);
  }
  function handleFilter() {
    setFilter(!filter);
  }
  function handleCreateque() {
    navigate("/addQuestion");
  }
  function handleEditque() {
    navigate("/editQuestion");
  }

  return (
    <>
      <section className=" font-sans p-4">
        <div className="space-y-10">
          <div className=" space-y-4">
            <div className="flex items-center 2xl:justify-end xl:justify-end  lg:justify-end md:justify-end sm:justify-center space-x-4">
              <button
                onClick={() => handleFilter()}
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-orange-400 border border-orange-400 hover:bg-opacity-90  "
              >
                <svg
                  className="font-bold text-orange-400 w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <TfiFilter />
                </svg>
                <p className=" font-semibold">filter</p>
              </button>
              <button
                onClick={() => handleCreateque()}
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-400 hover:bg-opacity-90  "
              >
                <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                  <TfiPlus />
                </svg>
                <p className=" font-semibold">create new question</p>
              </button>
            </div>
            <div className=" space-y-2 flex flex-col items-start w-full">
              <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
                subject
              </p>
              <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-2 2xl:grid-cols-4 2xl:gap-6">
                <MultiSelection />
              </div>
            </div>
          </div>
          <div className="w-full space-y-6 text-left  md:gap-16 dark:border-gray-700 font-sans">
            <ul className="space-y-4">
              <li className="space-y-2">
                <div className="flex items-center justify-between text-lg font-medium text-gray-900 dark:text-white">
                  1. What is ReactJS?
                  <div className="flex items-center justify-end space-x-4 pr-2">
                    <button
                      onClick={() => handleCheck()}
                      className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase bg-red-100 border  hover:bg-opacity-90  "
                    >
                      <svg className="font-bold  w-5 h-5" viewBox="0 0 16 16">
                        <AiOutlineDelete />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleEditque()}
                      className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase bg-green-100 border  hover:bg-opacity-90  "
                    >
                      <svg className="font-bold  w-5 h-5" viewBox="0 0 17 17">
                        <TfiPencil />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="rounded-md border border-gray-300 px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                  React, also known as ReactJS, is a popular and powerful
                  JavaScript library used for building dynamic and interactive
                  user interfaces, primarily for single-page applications
                  (SPAs). It was developed and maintained by Facebook and has
                  gained significant popularity due to its efficient rendering
                  techniques, reusable components, and active community support.
                  In this article, we will explore React Introduction, what
                  React is, its key features, benefits, and why it’s a great
                  choice for modern web development.
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={`${confirm === true ? "block" : "hidden"}`}>
          <ConfirmationPage
            confirm={confirm}
            setConfirm={() => handleCheck()}
          />
        </div>
        <div className={`${filter === true ? "block" : "hidden"}`}>
          <FilterSide filter={filter} setFilter={() => handleFilter()} />
        </div>
      </section>
    </>
  );
}
export default SubjectDetails;
