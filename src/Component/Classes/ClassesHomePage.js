import React, { useEffect, useState } from "react";
// import { LuPencilLine } from "react-icons/lu";\
import { FaPlus } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import AddClasses from "./AddClasses";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  deleteClassData,
  fetchClassData,
} from "../../ApiHandler/getAllClassApi";
import Loading from "../Loader/Loading";
import { useNavigate } from "react-router-dom";
import { editClassesPanel } from "../../Context/Action";
import EditClasses from "./EditClass";

export default function ClassesHomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [confirm, setConfirm] = useState(false);
  const [page, setPage] = useState(null);
  const [data, setData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [input, setInput] = useState({
    classname: "",
    referralcode: "",
  });

  const handleNavigate = (pageName) => {
    setPage(pageName);
  };

  const getClassData = async () => {
    setLoading(true); // Show loader while fetching
    try {
      const classesData = await fetchClassData(accessToken);
      // console.log("Fetched classes data:", classesData);
      setData(classesData); // Store full data
      setDataToDisplay(classesData.slice(0, itemsPerPage)); // Paginate data
    } catch (err) {
      setError(err.message); // Handle error
      toast.error("Failed to fetch class data");
    } finally {
      setLoading(false); // Hide loader when fetching is complete
    }
  };

  function handleEdit(value) {
    setPage("edit");
    dispatch(editClassesPanel(value));
  }

  async function handleDelete(id) {
    setLoading(true);
    try {
      await deleteClassData(id, accessToken);
      console.log(`Deleted class with id: ${id}`);
      toast.success("Class deleted successfully");

      await getClassData();
    } catch (err) {
      console.error(err.message);
      toast.error(err.message || "Failed to delete class");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getClassData();
  }, [accessToken]);

  useEffect(() => {
    setDataToDisplay(data.slice(start, end));
  }, [currentPage, data, start, end]);

  if (loading) return <Loading />;

  return (
    <>
      <section className="shadow-md">
        <div className="bg-white  px-4 py-2 flex  items-center justify-between rounded-xl">
          <p className="text-2xl text-left font-semibold text-slate-800 uppercase">
            classes
          </p>
          <button
            onClick={handleNavigate}
            className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
          >
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <FaPlus />
            </svg>
            <p className=" font-semibold">Add Class</p>
          </button>
        </div>
        <div className="bg-white overflow-auto px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
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
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Classes Name
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Referral Code
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Uploaded PDF
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Tearms & Condition
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Privacy Policy
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((value, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {start + index + 1}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {value.name}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {value.referralCode}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <button
                      className="relative select-none max-w-12 max-h-12 rounded-lg text-md align-middle font-sansfont-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button"
                    >
                      <img src={value.image} alt="" className="w-full h-full" />
                    </button>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    {value.termsAndConditions ? (
                      <iframe
                        src={value.termsAndConditions}
                        title="PDF"
                        className="border-none max-w-12 max-h-12"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {value.privacyPolicy ? (
                      <iframe
                        src={value.privacyPolicy}
                        title="PDF"
                        className="border-none max-w-12 max-h-12"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center justify-evenly  gap-2 font-sans text-md font-medium leading-none text-slate-800">
                      <button
                        className="relative h-10 w-10 select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handleEdit(value)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg viewBox="0 0 16 16" className="w-5 h-5">
                            <LuPencilLine />
                          </svg>
                        </span>
                      </button>
                      <button
                        className="relative h-10 w-10 select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                        type="button"
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            viewBox="0 0 16 16"
                            className="w-6 h-6"
                            onClick={() => handleDelete(value._id)}
                          >
                            <AiOutlineDelete />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
      {page === "add" && (
        <div className="block">
          <AddClasses onClose={() => setPage(null)} />
        </div>
      )}

      {page === "edit" && (
        <div className="block">
          <EditClasses onClose={() => setPage(null)} />
        </div>
      )}
    </>
  );
}
