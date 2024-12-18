import React, { useEffect, useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdBlock } from "react-icons/md";

import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchResultreport, fetchUserReport } from "../../ApiHandler/reportApi";
import Loading from "../Loader/Loading";

export default function UserReport() {
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [blockedUser, setBlockedUser] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5; // Display 5 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(blockedUser.length / itemsPerPage)
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Get the current page data to display
  const currentData = blockedUser.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTotalPages(Math.ceil(blockedUser.length / itemsPerPage)); 
  }, [blockedUser]);

  const loadResultReport = async () => {
    try {
      setLoading(true);
      const result = await fetchUserReport(accessToken);
      if (result.success) {
        console.log("result-report", result.resultdata);
        // console.log("userData", result.userData);

        setBlockedUser(result.resultdata);
        // setDataDisplay(result.subjectData.slice(0, end));
      } else {
        console.error(result.message);
      }
    } catch (err) {
      setError("Error fetching FAQ data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(blockedUser);

    loadResultReport();
  }, [accessToken]);

  // const handleDelete = async (id) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     console.log(id);
  //     const result = await deleteResultReport(id, accessToken);
  //     if (result.success) {
  //       toast.success(result.message);

  //     } else {
  //       setError(result.message);
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   console.log(blockedUser);

  //   if (
  //     blockedUser &&
  //     blockedUser.length > 0 &&
  //     Array.isArray(blockedUser)
  //   ) {
  //     setDataDisplay(blockedUser.slice(start, end));
  //   } else {
  //     setDataDisplay([]);
  //   }
  // }, [currentPage, blockedUser]);

  if (loading) return <Loading />;

  return (
    <>
      <section className="border border-slate-300 bg-white rounded-lg overflow-hidden">
        <div className="overflow-auto px-0">
          <p className="px-4 py-2 text-2xl text-left font-medium text-slate-800 uppercase">
            User Report
          </p>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {[
                  "S/N",
                  "Name",
                  "Referral Code",
                  "Contact",
                  "Gmail",
                  "DOB",
                  "KYC",
                  "Unlock",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors"
                  >
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      {header}
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
                ))}
              </tr>
            </thead>
            <tbody>
              {blockedUser && blockedUser.length > 0 ? (
                blockedUser.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap max-w-xs">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.firstName} {user.lastName}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.referralCode}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.contact?.mobile}{" "}
                        {/* Accessing mobile from nested object */}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.email}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {new Date(user.dob).toLocaleDateString()}{" "}
                        {/* Formatting date */}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <li
                        className={`text-sm text-center rounded-full ${
                          user.kyc
                            ? "text-green-800 bg-green-100"
                            : "text-red-800 bg-red-100"
                        }`}
                      >
                        {user.kyc ? "Verified" : "Not Verified"}
                      </li>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        className="relative h-10 w-10 select-none rounded-lg align-middle font-sans font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        // onClick={() => handleDelete(user._id)}
                        disabled={loading}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <AiOutlineDelete className="w-6 h-6" />
                        </span>
                      </button>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center w-[50px]">
                      <button
                        className={`${
                          user.isBlocked
                            ? "hover:bg-red-100"
                            : "hover:bg-green-100"
                        } relative h-10 w-10 select-none rounded-lg align-middle font-sans font-medium uppercase transition-all active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                        type="button"
                        // onClick={() => handleIsBlock(user._id)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            viewBox="0 0 16 16"
                            className={`${
                              user.isBlocked ? "text-red-600" : "text-green-600"
                            } w-6 h-6 text-gray-800`}
                          >
                            <MdBlock />
                          </svg>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No blocked users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}
