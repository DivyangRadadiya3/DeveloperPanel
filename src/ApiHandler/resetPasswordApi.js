import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc,  convertUtcToIst } from "../Utils/timeUtils"; // Import the time conversion function

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const resetPasswordApiCall = async (currentUser, token) => {
  try {
    const data = JSON.stringify(currentUser);

    const config = {
      method: "post",
      url: `${BASE_URL}/auth/reset-password`,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.data) {
      // Convert relevant fields from ISC to UTC if they exist
      const fieldsToConvert = ['createdAt', 'updatedAt', 'startDate', 'endDate', 'date'];

      fieldsToConvert.forEach(field => {
        if (response.data[field]) {
          response.data[field] = convertIstToUtc(response.data[field]);
        }
      });
      
      if (response.data.updatedAt) {
        console.log("Converted UTC time:", response.data.updatedAt);
      }
    }

    if (response.status === 200) {
      toast.success(response.data.data.message);
      return {
        success: true,
        data: response.data,
        message: "Password reset successfully.",
      };
    } else if (response.status === 500) {
      toast.error(response.data.data.message);
      return { success: false, message: response.data.data.message };
    } else {
      toast.error(response.message);
      return { success: false, message: response.message };
    }
    
  } catch (err) {
    console.error("Error resetting password:", err);

    // Return a structured response indicating failure
    return {
      success: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "An error occurred while resetting the password",
    };
  }
};

