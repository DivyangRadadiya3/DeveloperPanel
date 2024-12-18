import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Pagination from "../Pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteResultReport,
  fetchResultreport,
} from "../../ApiHandler/reportApi";
import Loading from "../Loader/Loading";

export default function ResultReport() {
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [result, setResult] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5; // Display 5 items per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages =
    result[0]?.resultData && Array.isArray(result[0]?.resultData)
      ? Math.ceil(result[0].resultData.length / itemsPerPage)
      : 0;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const loadResultReport = async () => {
    try {
      const result = await fetchResultreport(accessToken);
      setLoading(true);
      if (result.success) {
        // console.log("result-report", result.resultdata);
        // console.log("userData", result.userData);
        const combinedData = [
          {
            resultData: result.resultdata,
            userData: result.userdata,
          },
        ];
        const combined = combinedData.map((item) => ({
          resultData: item.resultData,
          userData: item.userData,
        }));

        setResult(combinedData);
        setDataDisplay(combined.slice(0, end));
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
    loadResultReport();
  }, [accessToken]);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log(id);
      const result = await deleteResultReport(id, accessToken);
      if (result.success) {
        toast.success(result.message);

      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && result.length > 0 && Array.isArray(result[0]?.resultData)) {
      setDataDisplay(result[0].resultData.slice(start, end));
    } else {
      setDataDisplay([]);
    }
  }, [currentPage, result]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <Loading />;

  return (
    <>
      <section className="shadow border border-slate-300 bg-white rounded-lg overflow-hidden">
        <div className="px-0">
          <p className="p-2 text-2xl font-medium text-slate-800 uppercase">
            Result Report
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {[
                    "S/N",
                    "Result",
                    "Message",
                    "Category",
                    "User  Id",
                    "User  Name",
                    "User  Email",
                    "Referral Code",
                    "Report Number",
                    "Actions",
                  ].map((header, index) => (
                    <th
                      key={header}
                      scope="col"
                      className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors"
                    >
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {header}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(result[0]?.resultData) &&
                result[0].resultData.length > 0 ? (
                  result[0].resultData.slice(start, end).map((value, index) => {
                    const user = result[0]?.userData.find(
                      (user) => user._id === value.userId
                    );
                    return (
                      <tr
                        key={value._id}
                        className="hover:bg-gray-100 transition-colors"
                      >
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal">
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal">
                            {value.contest?.name || "N/A"}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap max-w-xs">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal">
                            {value?.message || "N/A"}
                          </p>
                        </td>
                       
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal">
                            {user?.userId || "N/A"}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal">
                            {user?.firstName || "N/A"}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal">
                            {user?.contact?.mobile || "N/A"}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal">
                            {user?.email || "N/A"}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal">
                            {user?.referralCode || "N/A"}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block antialiased font-sans text-sm leading-normal font-normal">
                            {user?.phone || "N/A"}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <button
                            className="relative h-10 w-10 select-none rounded-lg align-middle font-sans font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => handleDelete(value._id)}
                            disabled={loading}
                          >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                              <AiOutlineDelete className="w-6 h-6" />
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="10" className="p-4 text-center">
                      No data available.
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
        </div>
      </section>
    </>
  );
}
