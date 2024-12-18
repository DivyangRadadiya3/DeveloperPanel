import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchQuestionFAQ = async (accessToken) => {
  try {
    const config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/question-report/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const config2 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/user/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response1 = await axios.request(config1);
    const response2 = await axios.request(config2);

    if (response1.status === 200 && response2.status === 200) {
      const data = response1.data.data.question_report_data;
      const UserData = response2.data.data.subject_data;
      // console.log(UserData);

      const convertDataToIsc = (data) => {
        if (data && Array.isArray(data)) {
          data.forEach((item) => {
            if (item.createdAt) {
              item.createdAt = convertUtcToIst(item.createdAt);
            }
            if (item.updatedAt) {
              item.updatedAt = convertUtcToIst(item.updatedAt);
            }
            if (item.startDate) {
              item.startDate = convertUtcToIst(item.startDate);
            }
            if (item.endDate) {
              item.endDate = convertUtcToIst(item.endDate);
            }
          });
        }
      };

      convertDataToIsc(data);
      convertDataToIsc(UserData);

      const matchedUsers = [];
      data.forEach((entry) => {
        const user = UserData.find((user) => user._id === entry.userId);
        if (user) {
          matchedUsers.push(user);
        }
      });

      // console.log("Converted question report data:", data);
      // console.log("Converted user data:", UserData);

      // Loop through question report data and find matched users

      return {
        success: true,
        data: data,
        userData: matchedUsers,
        message: "FAQ data fetched successfully.",
      };
    } else {
      // Handle error if either response status is not 200
      throw new Error(
        `Failed to fetch data. Status codes: Response 1 - ${response1.status}, Response 2 - ${response2.status}`
      );
    }
  } catch (error) {
    // Catch and log any errors
    console.error("Error:", error.message || error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching data.",
    };
  }
};

export const deleteQuestionFAQ = async (dataId, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/question-report/delete/${dataId}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      await fetchQuestionFAQ(accessToken);
      console.log("QuestionFAQ deleted successfully");
      return {
        success: true,
        message: "QuestionFAQ deleted successfully",
        data: response.data,
      };
    } else {
      toast.error("Failed to delete QuestionFAQ:", response);
      console.error("Failed to delete QuestionFAQ, status:", response.status);
      return {
        success: false,
        message: `Failed to delete QuestionFAQ with status: ${response.status}`,
      };
    }
  } catch (err) {
    toast.error("Error deleting QuestionFAQ data:", err.message);
    return {
      success: false,
      message: `An error occurred while deleting the QuestionFAQ: ${err.message}`,
    };
  }
};

export const fetchResultreport = async (accessToken) => {
  try {
    const config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/result-report/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const config2 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/user/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response1 = await axios.request(config1);
    const response2 = await axios.request(config2);

    if (response1.status === 200 && response2.status === 200) {
      const data = response1.data.data.result_report_data;
      const UserData = response2.data.data.subject_data;

      if (data && Array.isArray(data)) {
        data.forEach((item) => {
          const fieldsToConvert = [
            "createdAt",
            "updatedAt",
            "startDate",
            "endDate",
          ];
          fieldsToConvert.forEach((field) => {
            if (item[field]) {
              item[field] = convertUtcToIst(item[field]);
            }
          });
        });
      }
      if (UserData && Array.isArray(UserData)) {
        UserData.forEach((item) => {
          const fieldsToConvert = [
            "createdAt",
            "updatedAt",
            "startDate",
            "endDate",
          ];
          fieldsToConvert.forEach((field) => {
            if (item[field]) {
              item[field] = convertUtcToIst(item[field]);
            }
          });
        });
      }

      const matchedUsers = [];
      data.forEach((entry) => {
        const user = UserData.find((user) => user._id === entry.userId);
        if (user) {
          matchedUsers.push(user);
        }
      });

      // console.log("Converted result report data:", data);
      // console.log("Converted user data:", matchedUsers);

      return {
        success: true,
        resultdata: data,
        userdata: matchedUsers,
        message: "Result report fetched successfully.",
      };
    } else {
      throw new Error("Failed to fetch result report data.");
    }
  } catch (error) {
    console.error("Error fetching result report data:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching result report data.",
    };
  }
};

export const deleteResultReport = async (dataId, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/result-report/delete/${dataId}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    // Status handling
    if (response.status === 200) {
      await fetchResultreport(accessToken);
      console.log("ResultReport deleted successfully");
      return {
        success: true,
        message: "ResultReport deleted successfully",
        data: response.data,
      };
    } else {
      toast.error("Failed to delete ResultReport:", response);
      console.error("Failed to delete ResultReport, status:", response.status);
      return {
        success: false,
        message: `Failed to delete ResultReport with status: ${response.status}`,
      };
    }
  } catch (err) {
    toast.error("Error deleting ResultReport data:", err.message);
    return {
      success: false,
      message: `An error occurred while deleting the ResultReport: ${err.message}`,
    };
  }
};

export const fetchUserReport = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/user/all?page=1&limit=10&blockFilter=true`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
// console.log(response);

    if (response.status === 200) {
      let subjectData = response.data.data.subject_data;
      const totalData = response.data.data.totalData;

      if (subjectData && Array.isArray(subjectData)) {
        subjectData = subjectData.map((item) => {
          // Convert UTC to IST for createdAt and updatedAt for all items
          if (item.createdAt) {
            item.createdAt = convertUtcToIst(item.createdAt);
          }
          if (item.updatedAt) {
            item.updatedAt = convertUtcToIst(item.updatedAt);
          }
          return item;
        });
        // console.log("Updated subjectData data with IST:", subjectData);
      }
      return {
        success: true,
        resultdata: subjectData,
        userdata: totalData,
        message: "Result report fetched successfully.",
      };

    } else {
      throw new Error(`Error fetching user list: ${response.data.message}`);
    }
  } catch (err) {
    console.error("Error fetching user list:", err.message);
    throw new Error(err.message);
  }
};
