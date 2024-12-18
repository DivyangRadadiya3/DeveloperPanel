import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc,  convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch Privacy Policy and convert dates (if any) to IST
export const fetchPrivacyPolicy = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/privacy-policy`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);

    if (response.data.status === 200) {
      if (response.data.data) {
        const updatedPrivacyPolicy = {
          ...response.data.data, // Spread the original object
          createdAt: convertUtcToIst(response.data.data.createdAt), // Convert createdAt
          updatedAt: convertUtcToIst(response.data.data.updatedAt), // Convert updatedAt
          startDate: response.data.data.startDate ? convertUtcToIst(response.data.data.startDate) : null,
          endDate: response.data.data.endDate ? convertUtcToIst(response.data.data.endDate) : null,
        };

        return {
          success: true,
          data: updatedPrivacyPolicy,
          message: response.data.message || "PrivacyPolicy fetched successfully.",
        };
      } else {
        return {
          success: false,
          message: "Privacy Policy data is missing the necessary date fields.",
        };
      }
    } else {
      throw new Error(`Failed to fetch Privacy Policy. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    throw error;
  }
};

// Fetch Terms & Conditions and convert dates (if any) to IST
export const fetchTermsCondition = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/terms-condition`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.data.status === 200) {
      if (response.data.data) {
        const updatedTermsConditionData = {
          ...response.data.data, // Spread the original object
          createdAt: convertUtcToIst(response.data.data.createdAt), // Convert createdAt
          updatedAt: convertUtcToIst(response.data.data.updatedAt), // Convert updatedAt
          startDate: response.data.data.startDate ? convertUtcToIst(response.data.data.startDate) : null,
          endDate: response.data.data.endDate ? convertUtcToIst(response.data.data.endDate) : null,
        };

        return {
          success: true,
          data: updatedTermsConditionData,
          message: response.data.message || "Terms & Conditions fetched successfully.",
        };
      } else {
        return {
          success: false,
          message: "Terms & Conditions data is missing the necessary date fields.",
        };
      }
    } else {
      throw new Error(`Failed to fetch Terms & Conditions. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching Terms & Conditions:", error);
    return {
      success: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};

// Fetch About Us and convert dates (if any) to IST
export const fetchAboutUs = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/about-us`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);

    if (response.data.status === 200) {
      if (response.data.data) {
        const updatedAboutUs = {
          ...response.data.data, // Spread the original object
          createdAt: convertUtcToIst(response.data.data.createdAt), // Convert createdAt
          updatedAt: convertUtcToIst(response.data.data.updatedAt), // Convert updatedAt
          startDate: response.data.data.startDate ? convertUtcToIst(response.data.data.startDate) : null,
          endDate: response.data.data.endDate ? convertUtcToIst(response.data.data.endDate) : null,
        };

        return {
          success: true,
          data: updatedAboutUs,
          message: response.data.message || "About Us fetched successfully.",
        };
      } else {
        return {
          success: false,
          message: "About Us data is missing the necessary date fields.",
        };
      }
    } else {
      throw new Error(`Failed to fetch About Us. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching About Us:", error);
    throw error;
  }
};

// Fetch Legality and convert dates (if any) to IST
export const fetchLegality = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/illegality`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);

    if (response.data.status === 200) {
      if (response.data.data) {
        const updatedLegality = {
          ...response.data.data, // Spread the original object
          createdAt: convertUtcToIst(response.data.data.createdAt), // Convert createdAt
          updatedAt: convertUtcToIst(response.data.data.updatedAt), // Convert updatedAt
          startDate: response.data.data.startDate ? convertUtcToIst(response.data.data.startDate) : null,
          endDate: response.data.data.endDate ? convertUtcToIst(response.data.data.endDate) : null,
        };

        return {
          success: true,
          data: updatedLegality,
          message: response.data.message || "Legality fetched successfully.",
        };
      } else {
        return {
          success: false,
          message: "Legality data is missing the necessary date fields.",
        };
      }
    } else {
      throw new Error(`Failed to fetch Legality. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching Legality:", error);
    throw error;
  }
};

// Fetch HowToPlay API and convert dates (if any) to IST
export const fetchHowToPlayAPI = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/how-to-play/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.data.status === 200) {
      if (
        response.data.data &&
        Array.isArray(response.data.data.how_to_play_data)
      ) {
        // Convert createdAt, updatedAt, startDate, and endDate for each item in the data array
        const updatedHowToPlayData = response.data.data.how_to_play_data.map(
          (item) => ({
            ...item,
            createdAt: item.createdAt ? convertUtcToIst(item.createdAt) : null,
            updatedAt: item.updatedAt ? convertUtcToIst(item.updatedAt) : null,
            startDate: item.startDate ? convertUtcToIst(item.startDate) : null,
            endDate: item.endDate ? convertUtcToIst(item.endDate) : null,
          })
        );

        return {
          success: true,
          data: updatedHowToPlayData, // Return the updated data
          message:
            response.data.message || "HowToPlayData fetched successfully.",
        };
      } else {
        // Handle case where data is missing or not an array
        return {
          success: false,
          message: "HowToPlayData is missing or not in the expected format.",
        };
      }
    } else {
      throw new Error(
        `Failed to fetch HowToPlayData. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching HowToPlayData:", error);
    // Return a structured error response
    return {
      success: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};

// Add or Edit Privacy Policy
export const addOrEditPrivacyPolicy = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    // Convert any ISC date fields in the editorContent if applicable
    if (editorContent.createdAt) {
      editorContent.createdAt = convertIstToUtc(editorContent.createdAt);
    }
    if (editorContent.updatedAt) {
      editorContent.updatedAt = convertIstToUtc(editorContent.updatedAt);
    }
    if (editorContent.startDate) {
      editorContent.startDate = convertIstToUtc(editorContent.startDate);
    }
    if (editorContent.endDate) {
      editorContent.endDate = convertIstToUtc(editorContent.endDate);
    }

    let data;
    if (typeof editorContent === "string") {
      data = { privacyPolicy: editorContent };
    } else {
      data = { privacyPolicy: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: `${BASE_URL}/privacy-policy/add/edit`,
      headers: {
        Authorization: ` ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      console.log(response.data.message);
    } else {
      console.log("Request failed: " + response.data);
      console.log("Request failed message: " + response.data.message);
    }
  } catch (err) {
    console.error("Error during API request:", err);
    toast.error("An error occurred while saving the privacy policy.");
  }
};

// Add or Edit Terms and Conditions
export const addOrEditTearmAndCondition = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    // Convert any ISC date fields in the editorContent if applicable
    if (editorContent.createdAt) {
      editorContent.createdAt = convertIstToUtc(editorContent.createdAt);
    }
    if (editorContent.updatedAt) {
      editorContent.updatedAt = convertIstToUtc(editorContent.updatedAt);
    }
    if (editorContent.startDate) {
      editorContent.startDate = convertIstToUtc(editorContent.startDate);
    }
    if (editorContent.endDate) {
      editorContent.endDate = convertIstToUtc(editorContent.endDate);
    }

    let data;
    if (typeof editorContent === "string") {
      data = { termsCondition: editorContent };
    } else {
      data = { termsCondition: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: `${BASE_URL}/terms-condition/add/edit`,
      headers: {
        Authorization: ` ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      console.log(response.data.message);
    } else {
      console.log("Request failed: " + response.data);
      console.log("Request failed message: " + response.data.message);
    }
  } catch (err) {
    console.error("Error during API request:", err);
    toast.error("An error occurred while saving the terms and conditions.");
  }
};

// Add or Edit About Us
export const addOrEditAboutUs = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    // Convert any ISC date fields in the editorContent if applicable
    if (editorContent.createdAt) {
      editorContent.createdAt = convertIstToUtc(editorContent.createdAt);
    }
    if (editorContent.updatedAt) {
      editorContent.updatedAt = convertIstToUtc(editorContent.updatedAt);
    }
    if (editorContent.startDate) {
      editorContent.startDate = convertIstToUtc(editorContent.startDate);
    }
    if (editorContent.endDate) {
      editorContent.endDate = convertIstToUtc(editorContent.endDate);
    }

    let data;
    if (typeof editorContent === "string") {
      data = { aboutUs: editorContent };
    } else {
      data = { aboutUs: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: `${BASE_URL}/about-us/add/edit`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      console.log(response.data.message);
    } else {
      console.log("Request failed: " + response.data);
      console.log("Request failed message: " + response.data.message);
    }
  } catch (err) {
    console.error("Error during API request:", err);
    toast.error("An error occurred while saving the about us content.");
  }
};

// Add or Edit Legality
export const addOrEditLegality = async (editorContent, accessToken) => {
  try {
    if (!editorContent) {
      toast.warning("Fill up empty space");
      return;
    }

    // Convert any ISC date fields in the editorContent if applicable
    if (editorContent.createdAt) {
      editorContent.createdAt = convertIstToUtc(editorContent.createdAt);
    }
    if (editorContent.updatedAt) {
      editorContent.updatedAt = convertIstToUtc(editorContent.updatedAt);
    }
    if (editorContent.startDate) {
      editorContent.startDate = convertIstToUtc(editorContent.startDate);
    }
    if (editorContent.endDate) {
      editorContent.endDate = convertIstToUtc(editorContent.endDate);
    }

    let data;
    if (typeof editorContent === "string") {
      data = { illegality: editorContent };
    } else {
      data = { illegality: JSON.stringify(editorContent) };
    }

    const config = {
      method: "post",
      url: `${BASE_URL}/illegality/add/edit`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      console.log(response.data.message);
    } else {
      console.log("Request failed: " + response.data);
      console.log("Request failed message: " + response.data.message);
    }
  } catch (err) {
    console.error("Error during API request:", err);
    toast.error("An error occurred while saving the legality content.");
  }
};


const isEmpty = (data) => {
  return Object.values(data).some((value) => value === null || value === "");
};

export const AddNewQuestion = async (addNewData, accessToken) => {
  try {
    if (isEmpty(addNewData)) {
      toast.warning("Please fill up empty fields.");
      return { success: false, message: "Empty fields detected." };
    }

    if (addNewData.dateField) {
      addNewData.dateField = convertIstToUtc(addNewData.dateField);
    }

    const data = JSON.stringify(addNewData);
    console.log(addNewData);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/how-to-play/add`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success("'How to Play' entry added successfully");
      return { success: true };
    } else {
      toast.error("Failed to add the question");
      return { success: false, message: "Failed to add the question" };
    }
  } catch (err) {
    console.error(err.message);
    toast.error("An error occurred while adding the question.");
    return { success: false, message: err.message };
  }
};

export const deleteSubtopic = async (value, accessToken) => {
  try {
    // If you need to convert any date fields, do it here
    // const dateInUtc = convertIstToUtc(dateInIsc); // Example if you have a date to convert

    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/how-to-play/delete/${value}`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    if (response.status === 200) {
      toast.success("How to Play entry deleted successfully");
      return { success: true };
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete How to Play entry");
    return { success: false, message: error.message };
  }
};
