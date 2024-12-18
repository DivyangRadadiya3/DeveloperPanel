import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import {
  fetchKycData,
  filterData,
  updateAndFetchKycStatus,
} from "../../ApiHandler/useKycApi";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loader/Loading";
import { ResetTvOutlined } from "@mui/icons-material";
import KycTable from "./KycTable";

const KYCHomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tempStatus, setTempStatus] = useState({});
  const [currentPageVerified, setCurrentPageVerified] = useState(1);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageUnverified, setCurrentPageUnverified] = useState(1);
  const itemsPerPage = 5;
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchKycData(accessToken);
        if (result.success) {
          setUsers(result.data);
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

  const handleStatusChange = (userId, newStatus) => {
    setTempStatus((prev) => ({
      ...prev,
      [userId]: newStatus,
    }));
  };

  const handleUpdateStatus = async (updateData) => {
    try {
      const updateResponse = await updateAndFetchKycStatus(
        accessToken,
        updateData
      );
      console.log("responseData -", updateResponse);

      if (updateResponse.success) {
        setUsers(updateResponse.data);
      } else {
        toast.error("Failed to update status: " + updateResponse.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating status: " + error.message);
    }
  };

  function transformKycData(originalData) {
    return {
      kycId: originalData._id,
      idProof: originalData.idProof,
      frontSideImage: originalData.frontSideImage,
      backSideImage: originalData.backSideImage,
      status: originalData.status,
      userId: originalData.userId,
    };
  }

  const handleSave = async (user) => {
    const newStatus = tempStatus[user._id] || user.status;
    const transformedData = transformKycData(user);

    const updateData = {
      ...transformedData,
      status: newStatus,
    };

    console.log("updateData -", updateData);

    await handleUpdateStatus(updateData);
    setTempStatus((prev) => ({ ...prev, [user._id]: undefined }));
  };

  const verifiedUsers = users.filter((user) => user.status === "verified");
  const pendingUsers = users.filter((user) => user.status === "pending");
  const unverifiedUsers = users.filter((user) => user.status === "unverified");

  // Pagination logic for verified users
  const indexOfLastVerifiedUser = currentPageVerified * itemsPerPage;
  const indexOfFirstVerifiedUser = indexOfLastVerifiedUser - itemsPerPage;
  const currentVerifiedUsers = verifiedUsers.slice(
    indexOfFirstVerifiedUser,
    indexOfLastVerifiedUser
  );
  const totalPagesVerified = Math.ceil(verifiedUsers.length / itemsPerPage);

  // Pagination logic for pending users
  const indexOfLastPendingUser = currentPagePending * itemsPerPage;
  const indexOfFirstPendingUser = indexOfLastPendingUser - itemsPerPage;
  const currentPendingUsers = pendingUsers.slice(
    indexOfFirstPendingUser,
    indexOfLastPendingUser
  );
  const totalPagesPending = Math.ceil(pendingUsers.length / itemsPerPage);

  // Pagination logic for unverified users
  const indexOfLastUnverifiedUser = currentPageUnverified * itemsPerPage;
  const indexOfFirstUnverifiedUser = indexOfLastUnverifiedUser - itemsPerPage;
  const currentUnverifiedUsers = unverifiedUsers.slice(
    indexOfFirstUnverifiedUser,
    indexOfLastUnverifiedUser
  );
  const totalPagesUnverified = Math.ceil(unverifiedUsers.length / itemsPerPage);

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
      <div className=" space-y-4">
        <div className="shadow drop-shadow-1">
          <KycTable
            users={currentVerifiedUsers}
            title="Verified Users"
            tempStatus={tempStatus}
            handleStatusChange={handleStatusChange}
            handleSave={handleSave}
          />
          <Pagination
            totalPages={totalPagesVerified}
            currentPage={currentPageVerified}
            onPageChange={setCurrentPageVerified}
          />
        </div>
        <div className="shadow drop-shadow-1">
          <KycTable
            users={currentPendingUsers}
            title="Pending Users"
            tempStatus={tempStatus}
            handleStatusChange={handleStatusChange}
            handleSave={handleSave}
          />
          <Pagination
            totalPages={totalPagesPending}
            currentPage={currentPagePending}
            onPageChange={setCurrentPagePending}
          />
        </div>
        <div className="shadow drop-shadow-1">
          <KycTable
            users={currentUnverifiedUsers}
            title="Unverified Users"
            tempStatus={tempStatus}
            handleStatusChange={handleStatusChange}
            handleSave={handleSave}
          />
          <Pagination
            totalPages={totalPagesUnverified}
            currentPage={currentPageUnverified}
            onPageChange={setCurrentPageUnverified}
          />
        </div>
      </div>
    </>
  );
};

export default KYCHomePage;
