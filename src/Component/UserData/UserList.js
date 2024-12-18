import React, { useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { MdBlock } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import ClassesCredential from "./ClassesCredential";
import { editStudentData, fetchUserList } from "../../ApiHandler/userListApi";
import { isBlock } from "slate";

const UserList = () => {
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalUser, setTotalUsers] = useState(0);
  // const Totalpage = Math.ceil(users.length / ITEMS_PER_PAGE);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const { subjectData, totalData } = await fetchUserList(accessToken);
      console.log("data :", subjectData);

      setUsers(subjectData);
      setTotalUsers(totalData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const SimpleDate = ({ dateString }) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();

    return (
      <p className="block antialiased font-sans text-sm leading-normal font-normal">
        {formattedDate}
      </p>
    );
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  useEffect(() => {
    setDataToDisplay(users.slice(start, end));
  }, [currentPage, start, end, users]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const EditUserData = async (updatedUser) => {
    try {
      const result = await editStudentData(accessToken, updatedUser);
      if (result.success) {
        toast.success(result.message);
        // navigate("/subjectDetails");
        loadData();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error during data edit:", err.message);
      toast.error("An error occurred while editing the data.");
    }
  };

  const handleIsBlock = (userId) => {
    dataToDisplay.map((user) => {
      if (user._id === userId) {
        const updatedUser = { ...user, isBlocked: !user.isBlocked };

        const userDataToSend = {
          userId: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          gender: updatedUser.gender,
          dob: updatedUser.dob,
          city: updatedUser.city,
          language: updatedUser.language,
          classesShow: updatedUser.classesShow,
          contact: {
            countryCode: updatedUser.contact.countryCode,
            mobile: updatedUser.contact.mobile,
          },
          upscNumber: updatedUser.upscNumber,
          password: updatedUser.password,
          isBlocked: updatedUser.isBlocked,
          profileImage:
            updatedUser.profileImage === null
              ? "string"
              : updatedUser.profileImage,
        };
        console.log("userDataToSend",userDataToSend);

        EditUserData(userDataToSend);
        return userDataToSend;
      }
    });
  };

  useEffect(() => {
    loadData();
  }, [accessToken, currentPage]);

  return (
    <>
      <section className=" space-y-6 pb-4">
        <div className="shadow-md">
          <div className="relative rounded-t-xl px-4 py-2 overflow-hidden text-slate-700 bg-white  bg-clip-border">
            <div className="flex items-center justify-between ">
              <p className="text-2xl font-medium text-slate-800">Students</p>

              <button className="flex space-x-2 bg-orange-500 hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded items-center">
                <svg
                  className="w-8 h-8 p-1 bg-white rounded-full text-orange-500"
                  viewBox="0 0 16 16"
                >
                  <FiBarChart2 />
                </svg>
                <div className="text-left flex flex-col">
                  <span className="font-semibold  text-sm capitalize text-gray-100">
                    total students application
                  </span>
                  <p className="text-xl text-gray-100 font-medium ">
                    {totalUser}
                  </p>
                </div>
              </button>
            </div>
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
                      City
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
                      Referral Code
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
                {dataToDisplay.map((user, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.firstName || "N/A"}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.email || "N/A"}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        India
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <SimpleDate dateString={user.dob} />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                      <img
                        src={user.profileImage}
                        alt={user.firstName}
                        className="w-20 h-20 border"
                      />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.city || "N/A"}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        ABCWF01684JHF43
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center w-[50px]">
                      <button
                        className={` ${
                          user.isBlocked
                            ? "hover:bg-red-100"
                            : "hover:bg-green-100"
                        } relative h-10 w-10 select-none rounded-lg align-middle font-sansfont-medium uppercase  transition-all  active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none `}
                        type="button"
                        onClick={() => handleIsBlock(user._id)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            viewBox="0 0 16 16"
                            className={` ${
                              user.isBlocked
                                ? "text-red-600 "
                                : "text-green-600"
                            } w-6 h-6 text-gray-800 `}
                          >
                            <MdBlock />
                          </svg>
                        </span>
                      </button>
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
    </>
  );
};

export default UserList;  