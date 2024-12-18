import axios from "axios";
import { convertIstToUtc, convertUtcToIst } from "../Utils/timeUtils";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Utility function to convert UTC to IST

export const fetchContestData = async (accessToken, params) => {
  console.log(params);

  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest/all?page=${params.page}&limit=10`,

      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const contestTypeData = response.data.data;

      const fieldsToConvert = ["createdAt", "updatedAt"];

      contestTypeData.contest_data.map((item) => {
        fieldsToConvert.forEach((field) => {
          if (item[field]) {
            item[field] = convertUtcToIst(item[field]);
          }
        });
        return item;
      });

      console.log(`Converted to ISC:`, contestTypeData);
      return contestTypeData;
    } else {
      console.error("Failed to fetch contestTypeData:", response.data.message);
      console.error(
        "Failed to fetch contestTypeData: " + response.data.message
      );
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error fetching contest data:", error.message);
    throw new Error(error.message);
  }
};

export const fetchContestDataById = async (accessToken, params) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest/${params}`,

      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const contestData = response.data.data;
      console.log(contestData);

      const fieldsToConvert = [
        "createdAt",
        "updatedAt",
        "startDate",
        "endDate",
      ];

      new Array(contestData).map((item) => {
        fieldsToConvert.forEach((field) => {
          if (item[field]) {
            item[field] = convertUtcToIst(item[field]);
          }
        });
        return item;
      });

      console.log(`Converted to ISC:`, contestData);
      return contestData;
    } else {
      console.error("Failed to fetch contestTypeData:", response.data.message);
      console.error(
        "Failed to fetch contestTypeData: " + response.data.message
      );
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error fetching contest data:", error.message);
    throw new Error(error.message);
  }
};

export const fetchClassData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/classes/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    // Handling various response status codes
    if (response.status === 200) {
      const classesData = response.data.data.classes_data;

      // Check if class data exists and is an array
      if (classesData && Array.isArray(classesData)) {
        const fieldsToConvert = [
          "createdAt",
          "updatedAt",
          "startDate",
          "endDate",
        ];

        const updatedClassesData = classesData.map((item) => {
          fieldsToConvert.forEach((field) => {
            if (item[field]) {
              item[field] = convertUtcToIst(item[field]); // Assuming convertUtcToIst is a valid function
            }
          });
          return item;
        });

        console.log("Converted to ISC:", updatedClassesData);
        return { success: true, data: updatedClassesData }; // Return success flag with data
      } else {
        console.warn("No class data available.");
        return { success: false, message: "No class data available" }; // Handle no data available scenario
      }
    } else if (response.status === 404) {
      console.error("Class data not found:", response.data.message);
      return { success: false, message: "Class data not found." };
    } else if (response.status === 500) {
      console.error("Server error:", response.data.message);
      return {
        success: false,
        message: "Internal server error. Please try again later.",
      };
    } else {
      console.error(`Unexpected response status: ${response.status}`);
      return {
        success: false,
        message: `Unexpected error with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error fetching class data:", error.message);
    return {
      success: false,
      message: `Error fetching class data: ${error.message}`,
    };
  }
};

export const addNewContest = async (contestData, accessToken) => {
  try {
    console.log("Original contest data:", contestData);

    // Convert startDate, endDate, createdAt, and updatedAt from IST to UTC
    if (contestData.startDate) {
      contestData.startDate = convertIstToUtc(contestData.startDate);
    }
    if (contestData.endDate) {
      contestData.endDate = convertIstToUtc(contestData.endDate);
    }
    if (contestData.createdAt) {
      contestData.createdAt = convertIstToUtc(contestData.createdAt);
    }
    if (contestData.updatedAt) {
      contestData.updatedAt = convertIstToUtc(contestData.updatedAt);
    }

    const requestData = JSON.stringify(contestData);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest/add`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      data: requestData,
    };

    const response = await axios.request(config);

    // Status handling
    if (response.status === 200) {
      console.log("Contest added successfully:", response.data);
      toast.success(response.data.message || "Contest added successfully");
      return { success: true, data: response.data };
    } else {
      console.error("Failed to add contest, status:", response.status);
      return {
        success: false,
        message: `Failed to add contest with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error adding contest:", error.message);
    return {
      success: false,
      message: `An error occurred while adding the contest: ${error.message}`,
    };
  }
};

export const editContest = async (contestData, accessToken) => {
  try {
    console.log("Original contest data:", contestData);

    const updatedContestData = { ...contestData };

    if (updatedContestData.startDate) {
      updatedContestData.startDate = convertIstToUtc(
        updatedContestData.startDate
      );
    }
    if (updatedContestData.endDate) {
      updatedContestData.endDate = convertIstToUtc(updatedContestData.endDate);
    }
    if (updatedContestData.createdAt) {
      updatedContestData.createdAt = convertIstToUtc(
        updatedContestData.createdAt
      );
    }
    if (updatedContestData.updatedAt) {
      updatedContestData.updatedAt = convertIstToUtc(
        updatedContestData.updatedAt
      );
    }

    console.log("Updated contest data with UTC dates:", updatedContestData);

    const requestData = JSON.stringify(updatedContestData);

    const startDate = new Date(updatedContestData.startDate);
    const endDate = new Date(updatedContestData.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid start or end date");
    }

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest/edit`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      data: requestData,
    };

    const response = await axios.request(config);
    console.log("Updated contest response data:", response.data);

    // Status handling
    if (response.status === 200) {
      console.log("Contest edited successfully:", response.data);
      return { success: true, data: response.data };
    } else {
      console.error("Failed to edit contest, status:", response.status);
      return {
        success: false,
        message: `Failed to edit contest with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error editing contest:", error.message);
    return {
      success: false,
      message: `An error occurred while editing the contest: ${error.message}`,
    };
  }
};

export const deleteContestData = async (id, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest/delete/${id}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    // Status handling
    if (response.status === 200) {
      console.log("Contest deleted successfully");

      // Fetch the latest data after deletion (optional)
      await fetchClassData(accessToken);
      await fetchContestData(accessToken); // Assuming this function also accepts accessToken

      return {
        success: true,
        message: "Contest deleted successfully",
        data: response.data,
      };
    } else {
      console.error("Failed to delete contest, status:", response.status);
      return {
        success: false,
        message: `Failed to delete contest with status: ${response.status}`,
      };
    }
  } catch (err) {
    console.error("Error deleting contest data:", err.message);
    return {
      success: false,
      message: `An error occurred while deleting the contest: ${err.message}`,
    };
  }
};
