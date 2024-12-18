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
        {/* verified */}
        <div class="bg-white relative shadow-md drop-shadow-1 ">
          <h2 class="text-2xl p-4">Verified Users</h2>
          <div class="overflow-x-auto rounded-t-lg">
            <table class="min-w-full bg-white border">
              <thead>
                <tr>
                  {[
                    "S/N",
                    "Name",
                    "DOB",
                    "Email",
                    "Contact",
                    "Proof Type",
                    "Proof Number",
                    "Front Image",
                    "Back Image",
                    "Status",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="text-left py-3 px-4 border-b border-slate-300 bg-slate-200 text-sm font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentVerifiedUsers.map((user, index) => {
                  const {
                    _id,
                    idNumber,
                    user: userInfo,
                    frontSideImage,
                    backSideImage,
                    status,
                  } = user;

                  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
                  const dob = new Date(userInfo.dob).toLocaleDateString();
                  const mobile = `${userInfo.contact.countryCode} ${userInfo.contact.mobile}`;

                  return (
                    <tr
                      key={_id}
                      className="hover:bg-slate-50 transition-colors duration-200 text-nowrap"
                    >
                      <td className="p-3 border-b border-slate-200">
                        {index + 1}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {fullName}
                      </td>
                      <td className="p-3 border-b border-slate-200">{dob}</td>
                      <td className="p-3 border-b border-slate-200">
                        {userInfo.email}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {mobile}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {user.idProof}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {userInfo.uniqueId}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <img
                          src={frontSideImage}
                          alt="Front ID"
                          className="w-24 h-16 object-cover rounded border"
                        />
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <img
                          src={backSideImage}
                          alt="Back ID"
                          className="w-24 h-16 object-cover rounded border"
                        />
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <select
                          name="status"
                          value={tempStatus[_id] || status}
                          onChange={(e) =>
                            handleStatusChange(_id, e.target.value)
                          }
                          className={`${
                            (tempStatus[_id] || status) === "verified"
                              ? "bg-green-100 text-green-600"
                              : (tempStatus[_id] || status) === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : (tempStatus[_id] || status) === "unverified"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-900"
                          } text-md text-center rounded-full cursor-pointer appearance-none focus:outline-none w-24 px-2 py-1`}
                        >
                          <option
                            value="verified"
                            className="bg-green-100 text-green-600"
                          >
                            Verified
                          </option>
                          <option
                            value="pending"
                            className="bg-yellow-100 text-yellow-600"
                          >
                            Pending
                          </option>
                          <option
                            value="unverified"
                            className="bg-red-100 text-red-600"
                          >
                            Unverified
                          </option>
                        </select>
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <button
                          onClick={() => handleSave(user)}
                          className="px-6 py-1 min-w-[100px]  border border-violet-600 rounded hover:bg-violet-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-300 active:bg-violet-800 transition-colors duration-300"
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={totalPagesVerified}
            currentPage={currentPageVerified}
            onPageChange={setCurrentPageVerified}
          />
        </div>
        {/* pending */}
        <div class="bg-white relative rounded-md shadow-md drop-shadow-1">
          <h2 class="text-2xl p-4">Pending Users</h2>
          <div class="overflow-x-auto rounded-t-lg">
            <table class="min-w-full bg-white border">
              <thead>
                <tr>
                  {[
                    "S/N",
                    "Name",
                    "DOB",
                    "Email",
                    "Contact",
                    "Proof Type",
                    "Proof Number",
                    "Front Image",
                    "Back Image",
                    "Status",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="text-left py-3 px-4 border-b border-slate-300 bg-slate-200 text-sm font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentPendingUsers.map((user, index) => {
                  const {
                    _id,
                    idNumber,
                    user: userInfo,
                    frontSideImage,
                    backSideImage,
                    status,
                  } = user;

                  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
                  const dob = new Date(userInfo.dob).toLocaleDateString();
                  const mobile = `${userInfo.contact.countryCode} ${userInfo.contact.mobile}`;

                  return (
                    <tr
                      key={_id}
                      className="hover:bg-slate-50 transition-colors duration-200  text-nowrap"
                    >
                      <td className="p-3 border-b border-slate-200">
                        {index + 1}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {fullName}
                      </td>
                      <td className="p-3 border-b border-slate-200">{dob}</td>
                      <td className="p-3 border-b border-slate-200">
                        {userInfo.email}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {mobile}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {user.idProof}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {userInfo.uniqueId}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <img
                          src={frontSideImage}
                          alt="Front ID"
                          className="w-24 h-16 object-cover rounded border"
                        />
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <img
                          src={backSideImage}
                          alt="Back ID"
                          className="w-24 h-16 object-cover rounded border"
                        />
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <select
                          name="status"
                          value={tempStatus[_id] || status}
                          onChange={(e) =>
                            handleStatusChange(_id, e.target.value)
                          }
                          className={`${
                            (tempStatus[_id] || status) === "verified"
                              ? "bg-green-100 text-green-600"
                              : (tempStatus[_id] || status) === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : (tempStatus[_id] || status) === "unverified"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-900"
                          } text-md text-center rounded-full cursor-pointer appearance-none focus:outline-none w-24 px-2 py-1`}
                        >
                          <option
                            value="verified"
                            className="bg-green-100 text-green-600"
                          >
                            Verified
                          </option>
                          <option
                            value="pending"
                            className="bg-yellow-100 text-yellow-600"
                          >
                            Pending
                          </option>
                          <option
                            value="unverified"
                            className="bg-red-100 text-red-600"
                          >
                            Unverified
                          </option>
                        </select>
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <button
                          onClick={() => handleSave(user)}
                          className="px-6 py-1 min-w-[100px]  border border-violet-600 rounded hover:bg-violet-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-300 active:bg-violet-800 transition-colors duration-300"
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={totalPagesPending}
            currentPage={currentPagePending}
            onPageChange={setCurrentPagePending}
          />
        </div>

        {/* unverified */}
        <div class="bg-white relative shadow-md drop-shadow-1">
          <h2 class="text-2xl p-4">Unverified Users</h2>
          <div class="overflow-x-auto rounded-t-lg">
            <table class="min-w-full bg-white border">
              <thead>
                <tr>
                  {[
                    "S/N",
                    "Name",
                    "DOB",
                    "Email",
                    "Contact",
                    "Proof Type",
                    "Proof Number",
                    "Front Image",
                    "Back Image",
                    "Status",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="text-left py-3 px-4 border-b border-slate-300 bg-slate-200 text-sm font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentUnverifiedUsers.map((user, index) => {
                  const {
                    _id,
                    idNumber,
                    user: userInfo,
                    frontSideImage,
                    backSideImage,
                    status,
                  } = user;

                  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
                  const dob = new Date(userInfo.dob).toLocaleDateString();
                  const mobile = `${userInfo.contact.countryCode} ${userInfo.contact.mobile}`;

                  return (
                    <tr
                      key={_id}
                      className="hover:bg-slate-50 transition-colors duration-200 text-nowrap"
                    >
                      <td className="p-3 border-b border-slate-200">
                        {index + 1}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {fullName}
                      </td>
                      <td className="p-3 border-b border-slate-200">{dob}</td>
                      <td className="p-3 border-b border-slate-200">
                        {userInfo.email}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {mobile}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {user.idProof}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {userInfo.uniqueId}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <img
                          src={frontSideImage}
                          alt="Front ID"
                          className="w-24 h-16 object-cover rounded border"
                        />
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <img
                          src={backSideImage}
                          alt="Back ID"
                          className="w-24 h-16 object-cover rounded border"
                        />
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <select
                          name="status"
                          value={tempStatus[_id] || status}
                          onChange={(e) =>
                            handleStatusChange(_id, e.target.value)
                          }
                          className={`${
                            (tempStatus[_id] || status) === "verified"
                              ? "bg-green-100 text-green-600"
                              : (tempStatus[_id] || status) === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : (tempStatus[_id] || status) === "unverified"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-900"
                          } text-md text-center rounded-full cursor-pointer appearance-none focus:outline-none w-24 px-2 py-1`}
                        >
                          <option
                            value="verified"
                            className="bg-green-100 text-green-600"
                          >
                            Verified
                          </option>
                          <option
                            value="pending"
                            className="bg-yellow-100 text-yellow-600"
                          >
                            Pending
                          </option>
                          <option
                            value="unverified"
                            className="bg-red-100 text-red-600"
                          >
                            Unverified
                          </option>
                        </select>
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <button
                          onClick={() => handleSave(user)}
                          className="px-6 py-1 min-w-[100px]  border border-violet-600 rounded hover:bg-violet-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-300 active:bg-violet-800 transition-colors duration-300"
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={totalPagesUnverified}
            currentPage={currentPageUnverified}
            onPageChange={setCurrentPageUnverified}
          />
        </div>
        {/* <div className="border rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto rounded-t-lg">
            <h2 className="text-xl font-semibold px-6 py-4 bg-white shadow-md text-gray-800">
              Unverified Users
            </h2>
            <table className="min-w-full bg-white border-separate border-spacing-0">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "S/N",
                    "Name",
                    "DOB",
                    "Email",
                    "Contact",
                    "Proof Type",
                    "Proof Number",
                    "Front Image",
                    "Back Image",
                    "Status",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="text-left py-3 px-4 border-b border-slate-300 bg-slate-200 text-sm font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentUnverifiedUsers.map((user, index) => {
                  const {
                    _id,
                    idNumber,
                    user: userInfo,
                    frontSideImage,
                    backSideImage,
                    status,
                  } = user;

                  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
                  const dob = new Date(userInfo.dob).toLocaleDateString();
                  const mobile = `${userInfo.contact.countryCode} ${userInfo.contact.mobile}`;

                  return (
                    <tr
                      key={_id}
                      className="hover:bg-slate-50 transition-colors duration-200 text-nowrap"
                    >
                      <td className="p-3 border-b border-slate-200">
                        {index + 1}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {fullName}
                      </td>
                      <td className="p-3 border-b border-slate-200">{dob}</td>
                      <td className="p-3 border-b border-slate-200">
                        {userInfo.email}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {mobile}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {user.idProof}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        {userInfo.uniqueId}
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <img
                          src={frontSideImage}
                          alt="Front ID"
                          className="w-24 h-16 object-cover rounded border"
                        />
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <img
                          src={backSideImage}
                          alt="Back ID"
                          className="w-24 h-16 object-cover rounded border"
                        />
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <select
                          name="status"
                          value={tempStatus[_id] || status}
                          onChange={(e) =>
                            handleStatusChange(_id, e.target.value)
                          }
                          className={`${
                            (tempStatus[_id] || status) === "verified"
                              ? "bg-green-100 text-green-600"
                              : (tempStatus[_id] || status) === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : (tempStatus[_id] || status) === "unverified"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-900"
                          } text-md text-center rounded-full cursor-pointer appearance-none focus:outline-none w-24 px-2 py-1`}
                        >
                          <option
                            value="verified"
                            className="bg-green-100 text-green-600"
                          >
                            Verified
                          </option>
                          <option
                            value="pending"
                            className="bg-yellow-100 text-yellow-600"
                          >
                            Pending
                          </option>
                          <option
                            value="unverified"
                            className="bg-red-100 text-red-600"
                          >
                            Unverified
                          </option>
                        </select>
                      </td>
                      <td className="p-3 border-b border-slate-200">
                        <button
                          onClick={() => handleSave(user)}
                          className="px-6 py-1 min-w-[100px]  border border-violet-600 rounded hover:bg-violet-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-300 active:bg-violet-800 transition-colors duration-300"
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="">
            <Pagination
              totalPages={totalPagesUnverified}
              currentPage={currentPageUnverified}
              onPageChange={setCurrentPageUnverified}
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default KYCHomePage;
