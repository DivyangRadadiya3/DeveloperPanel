// api.js
import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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

    // Check if response is valid and contains data
    if (
      response.status === 200 &&
      response.data &&
      response.data.data &&
      response.data.data.classes_data
    ) {
      // Convert any date fields from UTC to IST
      const fieldsToConvert = [
        "createdAt",
        "updatedAt",
        "startDate",
        "endDate",
      ];

      const classesData = response.data.data.classes_data.map((classItem) => {
        fieldsToConvert.forEach((field) => {
          // Check if the field exists and if it does, convert it
          if (classItem[field]) {
            classItem[field] = convertUtcToIst(classItem[field]);
          }
        });
        return classItem;
      });

      return classesData;
    } else {
      console.error("Failed to fetch class data or no data found");
      throw new Error("Failed to fetch class data or no data found");
    }
  } catch (err) {
    // Handle API call errors
    console.error("Error fetching class data:", err.message);
    throw new Error(
      `An error occurred while fetching class data: ${err.message}`
    );
  }
};

export const handleAddClassData = async (input, accessToken) => {
  try {
    if (input) {
      const fieldsToConvert = [
        "createdAt",
        "updatedAt",
        "startDate",
        "endDate",
      ];

      fieldsToConvert.forEach((field) => {
        if (input[field]) {
          input[field] = convertIstToUtc(input[field]);
        }
      });
    }
    const data = JSON.stringify(input);
    console.log("Input Data:", input);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/class/add`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log("API Response:", response.data);

    if (response.status === 200) {
      toast.success(response.data.message || "Class added successfully.");
      return {
        success: true,
        message: response.data.message || "Class added successfully.",
      };
    } else if (response.status === 500) {
      const errorMessage = response.data?.message || "Internal Server Error";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } else {
      const errorMessage =
        response.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  } catch (err) {
    console.error("Error:", err.message);
    console.error("An error occurred while adding the class.");
    return { success: false, message: err.message };
  }
};

export const handleEditClassData = async (input, accessToken) => {
  try {
    if (!input.name) {
      toast.warning("Fill up empty space");
      return { success: false, message: "Fill up empty space" };
    }

    // Convert date fields from ISC to UTC
    const fieldsToConvert = ["createdAt", "updatedAt", "startDate", "endDate"];
    fieldsToConvert.forEach((field) => {
      if (input[field]) {
        input[field] = convertIstToUtc(input[field]);
        console.log(`Converted ${field} to UTC:`, input[field]);
      }
    });

    const data = JSON.stringify(input);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/classes/edit`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      console.log("Success", response.data);
      toast.success("User edited successfully");
      return { success: true, data: response.data };
    } else {
      console.error("Failed", response);
      toast.error("Failed to edit user");
      return {
        success: false,
        message: response.data.message || "Failed to edit user",
      };
    }
  } catch (error) {
    console.error("Error editing user:", error);
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while editing the user.";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const deleteClassData = async (id, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/classes/${id}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    // Check if response is successful (status 200)
    if (response.status === 200) {
      console.log("Class data deleted successfully:", response.data);
      return response.data;
    } else {
      throw new Error("Failed to delete class data.");
    }
  } catch (err) {
    // Log and throw error for better debugging
    console.error("Error deleting class data:", err.message);
    throw new Error(err.response ? err.response.data.message : err.message);
  }
};
