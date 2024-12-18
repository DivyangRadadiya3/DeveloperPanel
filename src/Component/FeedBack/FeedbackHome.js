import React, { useEffect, useState } from "react";
import FeedBackTable from "./FeedBackTable";
import Loading from "../Loader/Loading";
import {
  deleteFeedbackData,
  fetchFeedbackData,
} from "../../ApiHandler/FeedBackService";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

function FeedbackHome() {
  const [feedback, setFeedBack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tempStatus, setTempStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageUnverified, setCurrentPageUnverified] = useState(1);
  const itemsPerPage = 5;
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const end = currentPage * itemsPerPage;
  const start = end - itemsPerPage;
  const current = feedback.slice(start, end);
  const totalPages = Math.ceil(feedback.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFeedbackData(accessToken);
        if (result.success) {
          const combinedData = [
            {
              feedBackData: result.feedbackData,
              userData: result.userData,
            },
          ];

          const combined = combinedData.map((item) => ({
            feedBackData: item.feedBackData,
            userData: item.userData,
          }));
          console.log(result.feedbackData);

          setFeedBack(combined);
        }
      } catch (err) {
        if (err.message.includes("NetworkError")) {
          setError("Network error. Please check your internet connection.");
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log(id);

    //   const result = await deleteFeedbackData(id, accessToken);
    //   if (result.success) {
    //     toast.success(result.message);
    //   } else {
    //     setError(result.message);
    //   }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) {
    return <div className="error-message text-red-500 font-bold">{error}</div>;
  }

  return (
    <>
      <div className="shadow drop-shadow-1">
        <FeedBackTable
          users={feedback}
          title="FeedBack"
          // handleStatusChange={handleStatusChange}
          deleteAction={handleDelete}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

export default FeedbackHome;
