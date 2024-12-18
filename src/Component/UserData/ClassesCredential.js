import React, { useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import ConfirmationPage from "../Confirmation/ConfirmationPage";
import { MdBlock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchClassesData } from "../../ApiHandler/userListApi";
import { editClassesPanel } from "../../Context/Action";

export default function ClassesCredential() {
  // const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [confirm, setConfirm] = useState(false);
  function handleAddUser(value) {
    navigate("/addUser");
  }
  function handleEdit(value) {
    navigate("/editUser");
    dispatch(editClassesPanel(value));
  }
  function handleDelete() {
    setConfirm(!confirm);
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  useEffect(() => {
    setDataToDisplay(data.slice(start, end));
  }, [currentPage, data, start, end]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const loadSubjects = async () => {
      setLoading(true);

      try {
        const { classesData, totalData } = await fetchClassesData(accessToken);

        if (classesData && totalData) {
          // console.log("Classes data fetched successfully:", {
          //   classesData,
          //   totalData,
          // });
          // Latest

          setData(classesData);
          setDataToDisplay(classesData.slice(0, itemsPerPage));
        } else {
          console.error("Failed to fetch classes data:", "No data received.");
          setError("Failed to fetch classes data.");
        }
      } catch (error) {
        console.error("An error occurred while fetching classes data:", error);
        setError("An error occurred while fetching classes data.");
      } finally {
        setLoading(false);
      }
    };

    loadSubjects();
  }, [accessToken, currentPage]);

  const SimpleDate = ({ dateString }) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();

    return (
      <p className="block antialiased font-sans text-sm leading-normal font-normal">
        {formattedDate}
      </p>
    );
  };

  return (
    <>
      <section className=" space-y-6 pb-4">
        {/* classees Credential */}
        <div className="shadow-md">
          <div className="relative flex items-center justify-between rounded-t-xl p-4 overflow-hidden text-slate-700 bg-white  bg-clip-border">
            <p className="text-2xl font-medium text-slate-800">Classes Panel</p>
            <button
              onClick={() => handleAddUser()}
              className=" inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90 "
            >
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <FaPlus />
              </svg>
              <p className="font-semibold">Add Classes Credential</p>
            </button>
          </div>
          <div className="bg-white overflow-auto px-0">
            <table className=" w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      S/N
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Full Name
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Gmail
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Address
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      DOB
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Profile Picture
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Password
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Contact
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Class Name
                    </p>
                  </th>

                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Actions
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataToDisplay.map((classes, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {classes.ownerName || "N/A"}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {classes.email || "N/A"}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        India
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {/* <SimpleDate dateString={"01/01/2000"} /> */} 01/01/2000
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                      <img
                        src={classes.image}
                        alt={classes.name}
                        className="w-20 h-20 border"
                      />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        password
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {classes.contact?.mobile || "N/A"}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {classes.name || "N/A"}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center w-[50px]">
                      <div className="flex items-center justify-evenly  gap-2 font-sans text-md font-medium leading-none text-slate-800">
                        <button
                          className="relative h-10 w-10 select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => handleEdit(classes)}
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
                              onClick={() => handleDelete()}
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
        </div>
      </section>
      <div className={`${confirm === true ? "block" : "hidden"}`}>
        <ConfirmationPage confirm={confirm} setConfirm={() => handleDelete()} />
      </div>
    </>
  );
}
