import axios from "axios";
import { toast } from "react-toastify";

import { convertIstToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUserList = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/user/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

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
        subjectData,
        totalData,
      };
    } else {
      throw new Error(`Error fetching user list: ${response.data.message}`);
    }
  } catch (err) {
    console.error("Error fetching user list:", err.message);
    throw new Error(err.message);
  }
};

export const fetchClassesData = async (accessToken) => {
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

    if (response.status === 200) {
      let classesData = response.data.data.classes_data;
      const totalData = response.data.data.totalData;

      // Convert any necessary UTC dates in the data to IST
      if (classesData && Array.isArray(classesData)) {
        classesData = classesData.map((item) => {
          // Convert UTC to IST for createdAt and updatedAt
          if (item.createdAt) {
            item.createdAt = convertUtcToIst(item.createdAt);
          }
          if (item.updatedAt) {
            item.updatedAt = convertUtcToIst(item.updatedAt);
          }
          // You can add more fields if needed
          return item;
        });
        // console.log("Updated classesData data with IST:", classesData);
      }

      return {
        classesData,
        totalData,
      };
    } else {
      throw new Error(`Error fetching classes: ${response.data.message}`);
    }
  } catch (err) {
    console.error("Error fetching classes data:", err.message);
    throw new Error(err.message);
  }
};

export const addNewUser = async (input, accessToken) => {
  try {
    if (!input.name) {
      toast.warning("Fill up empty space");
      return { success: false, message: "Fill up empty space" };
    }

    // Convert date fields from ISC to UTC
    const fieldsToConvert = [
      "date",
      "createdAt",
      "updatedAt",
      "startDate",
      "endDate",
    ];
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
      url: `${BASE_URL}/user/add`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      console.log("Success", response.data);
      toast.success("User added successfully");
      return { success: true, data: response.data };
    } else {
      console.error("Failed", response);
      toast.error("Failed to add user");
      return {
        success: false,
        message: response.data.message || "Failed to add user",
      };
    }
  } catch (error) {
    console.error("Error adding user:", error);
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while adding the user.";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const editUser = async (input, accessToken) => {
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
      url: `${BASE_URL}/user/edit`,
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

export const editStudentData = async (accessToken, userData) => {
  try {
    if (userData) {
      if (userData.createdAt) {
        userData.createdAt = convertIstToUtc(userData.createdAt);
      }
      if (userData.updatedAt) {
        userData.updatedAt = convertIstToUtc(userData.updatedAt);
      }
      if (userData.dob) {
        userData.dob = convertIstToUtc(userData.dob);
      }
    }
    console.log("Updated userData data with UTC:", userData);

    const data = JSON.stringify(userData);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/user/edit`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response);

    if (response.status === 200) {
      toast.success(response.data.message);
      return {
        success: true,
        dataList: response.data.data,
      };
    } else {
      toast.success(response.data.message);
      throw new Error(`Error fetching user list: ${response.data.message}`);
    }
  } catch (err) {
    console.error("Error fetching user list:", err.message);
    throw new Error(err.message);
  }
};