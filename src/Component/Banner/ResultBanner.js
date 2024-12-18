import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import Pagination from "../Pagination/Pagination";
import { bannerDataList, updateImageData } from "../../Context/Action/index"; // Adjust the import based on your file structure
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResultBanner({ result }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(result.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDataToDisplay(result.slice(start, end));
  }, [currentPage, result]);

  const handleToggleUpdate = () => {
    setToggleUpdate(!toggleUpdate);
  };

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
  };
  function handleNavigate() {
    setConfirm(!confirm);
  }

  const handleDataUpdate = (value) => {
    dispatch(updateImageData(value));
    handleToggleUpdate();
  };

  return (
    <>
      <div className="mx-auto space-y-6 ">
        {/* result banner */}
        <div className="relative w-full flex flex-col items-center rounded-t-xl overflow-hidden text-slate-700 bg-white  bg-clip-border">
          <h3 className="px-4 py-2 text-2xl text-left w-full font-semibold text-slate-800">
            Result Banner
          </h3>
          <div className="w-full overflow-auto px-0 rounded-md">
            <table className="w-full min-w-max table-auto text-left bg-white">
              <thead>
                <tr>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      S/N
                      <svg viewBox="0 0 24 24" className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Image
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataToDisplay.map((value, index) => (
                  <tr key={value._id}>
                    <td className="p-4 w-[50px]">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </p>
                    </td>
                    <td className="p-4 overflow-hidden text-wrap max-w -xs">
                      <img
                        src={value.image}
                        alt={`Banner ${index + 1}`}
                        className="w-42 mx-auto h-30"
                      />
                    </td>
                    <td className="p-4 w-[40px] text-center">
                      <button
                        className="relative h-10 w-10 select-none rounded-lg text-md align-middle font-sans font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handleDataUpdate(value)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <LuPencilLine className="w-6 h-6" />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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
