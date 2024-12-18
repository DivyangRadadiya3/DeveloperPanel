import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc,  convertUtcToIst } from "../Utils/timeUtils";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchContestTypes = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest-type/all?page=1&limit=10`, 
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    // Check if the response status is 200
    if (response.status === 200) {
      const contestTypes = response.data.data.contest_type_data || [];
      const updatedContestTypes = contestTypes.map((contest) => {
        // Apply UTC to IST conversion to date fields if they exist
        if (contest.startDate) {
          contest.startDate = convertUtcToIst(contest.startDate);
        }
        if (contest.endDate) {
          contest.endDate = convertUtcToIst(contest.endDate);
        }
        if (contest.createdAt) {
          contest.createdAt = convertUtcToIst(contest.createdAt);
        }
        if (contest.updatedAt) {
          contest.updatedAt = convertUtcToIst(contest.updatedAt);
        }
        return contest;
      });

      return { success: true, data: updatedContestTypes }; 
    } else {
      throw new Error(`Failed to fetch contest types. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching contest types:", error);
    // Return structured error response
    return {
      success: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};


export const editContestType = async (input, accessToken) => {
  try {
    // Convert IST to UTC for relevant date fields if they exist
    if (input.createdAt) {
      input.createdAt = convertIstToUtc(input.createdAt);
    }
    if (input.updatedAt) {
      input.updatedAt = convertIstToUtc(input.updatedAt);
    }
    if (input.startDate) {
      input.startDate = convertIstToUtc(input.startDate);
    }
    if (input.endDate) {
      input.endDate = convertIstToUtc(input.endDate);
    }
    if (input.date) {
      input.date = convertIstToUtc(input.date);
    }

    const userData = JSON.stringify(input);
    console.log("Updated Input Data:", input);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest-type/edit`,
      headers: {
        Authorization: ` ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: userData,
    };

    const response = await axios.request(config);

    const { status, data, message, error } = response.data;

    if (status === 200) {
      toast.success(message || "Contest type updated successfully.");
      return { success: true, message };
    } else {
      console.warn("Contest type edit failed:", error);
      toast.error(error || "An error occurred while editing contest type.");
      return { success: false, message: error };
    }
  } catch (err) {
    // Catch any errors that occur during the request
    console.error("Error editing contest type:", err.message);
    toast.error("An error occurred while editing contest type.");
    return { success: false, message: err.message };
  }
};


export const deleteContestType = async (id, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest-type/delete/${id}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.data.status === 200) {
      // Success: Show success toast and return success data
      toast.success(response.data.message || "Contest deleted successfully.");
      return { success: true, message: response.data.message };
    } else {
      // Failure: Log warning and show error toast
      console.warn(
        "Failed to delete contest:",
        response.data.error || response.data.message
      );
      toast.error(
        response.data.error ||
          response.data.message ||
          "An error occurred while deleting the contest."
      );
      return {
        success: false,
        message: response.data.error || response.data.message,
      };
    }
  } catch (err) {
    // Catch any errors during the request and show error toast
    console.error("Error deleting contest data:", err.message);
    toast.error(`An error occurred while deleting the contest: ${err.message}`);
    return { success: false, message: err.message };
  }
};
