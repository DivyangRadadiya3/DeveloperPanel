import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Loading from "../Loader/Loading";
import Pagination from "../Pagination/Pagination";
import {
  deleteQuestionFAQ,
  fetchQuestionFAQ,
} from "../../ApiHandler/reportApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function QuestionReport() {
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [faqData, setFaqData] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages =
    faqData[0]?.reportData && Array.isArray(faqData[0]?.reportData)
      ? Math.ceil(faqData[0].reportData.length / itemsPerPage)
      : 0;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const getFAQ = async () => {
    try {
      setLoading(true);
      const result = await fetchQuestionFAQ(accessToken);
      if (result.success) {
        // console.log("question-report", result.data);
        // console.log("userData", result.userData);
        const combinedData = [
          {
            reportData: result.data,
            userData: result.userData,
          },
        ];

        const combined = combinedData.map((item) => ({
          reportData: item.reportData,
          userData: item.userData,
        }));

        setFaqData(combinedData);
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
    getFAQ();
  }, [accessToken]);

  useEffect(() => {
    if (
      faqData &&
      faqData.length > 0 &&
      Array.isArray(faqData[0]?.reportData)
    ) {
      setDataDisplay(faqData[0].reportData.slice(start, end));
    } else {
      setDataDisplay([]);
    }
  }, [currentPage, faqData]);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log(id);

      const result = await deleteQuestionFAQ(id, accessToken);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <Loading />;

  return (
    <>
      <section className="shadow border border-slate-300 bg-white rounded-lg overflow-hidden">
        <div className="px-0">
          <p className="p-2 text-2xl font-medium text-slate-800 uppercase">
            Question Report
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {[
                    "S/N",
                    "Question",
                    "Message",
                    "Contest Name",
                    "Subject",
                    "User  Name",
                    "Gmail",
                    "Referral Code",
                    "Report Number",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors"
                    >
                      <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
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
                {Array.isArray(faqData[0]?.reportData) &&
                faqData[0].reportData.length > 0 ? (
                  faqData[0].reportData
                    .slice(start, end)
                    .map((value, index) => {
                      const user = faqData[0]?.userData.find(
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
                          <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap max-w-xs">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal">
                              {value.question?.englishQuestion?.question}
                            </p>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal">
                              {value.message}
                            </p>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal">
                              {value.contest?.name}
                            </p>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal">
                              {value.subject?.name}
                            </p>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <p className="block antialiased font-sans text-sm leading-normal font-normal">
                              {user?.firstName || "N/A"}
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
                              className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg align-middle font-sans font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                    <td colSpan="9" className="p-4 text-center">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
