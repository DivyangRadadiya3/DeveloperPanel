import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc,  convertUtcToIst } from "../Utils/timeUtils";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchSubjectData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/subject/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const data = response.data.data.subject_data;

      const updatedBannerData = data.map((value) => {
        // Convert relevant date fields from UTC to IST
        if (value.createdAt) {
          value.createdAt = convertUtcToIst(value.createdAt);
        }
        if (value.updatedAt) {
          value.updatedAt = convertUtcToIst(value.updatedAt);
        }
        if (value.startDate) {
          value.startDate = convertUtcToIst(value.startDate);
        }
        if (value.endDate) {
          value.endDate = convertUtcToIst(value.endDate);
        }
        return value;
      });

      console.log("Updated subject data with IST:", updatedBannerData);
      return {
        success: true,
        data: updatedBannerData,
        message: "Subject data fetched successfully.",
      };
    } else {
      console.warn("Failed:", response.data.error);
      return {
        success: false,
        message: "Failed to fetch data from the API.",
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching data.",
    };
  }
};

export const fetchSubTopicData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/sub-topic/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const data = response.data.data.sub_topic_data;

      const updatedBannerData = data.map((value) => {
        // Convert relevant date fields from UTC to IST
        if (value.createdAt) {
          value.createdAt = convertUtcToIst(value.createdAt);
        }
        if (value.updatedAt) {
          value.updatedAt = convertUtcToIst(value.updatedAt);
        }
        if (value.startDate) {
          value.startDate = convertUtcToIst(value.startDate);
        }
        if (value.endDate) {
          value.endDate = convertUtcToIst(value.endDate);
        }
        return value;
      });

      console.log("Updated sub-topic data with IST:", updatedBannerData);
      return {
        success: true,
        data: updatedBannerData,
        message: "Sub-topic data fetched successfully.",
      };
    } else {
      console.warn("Failed:", response.data.error);
      return {
        success: false,
        message: "Failed to fetch data from the API.",
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching data.",
    };
  }
};

export const deleteSubject = async (subjectId, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/subject/delete/${subjectId}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    if (response.status === 200) {
      toast.success("Subject deleted successfully");
      return { success: true, message: "Subject deleted successfully" };
    } else {
      toast.error("Failed to delete subject");
      return { success: false, message: "Failed to delete subject" };
    }
  } catch (error) {
    console.error("Error deleting subject:", error);
    toast.error(
      error.response?.data?.message ||
        "An error occurred while deleting the subject"
    );
    return {
      success: false,
      message: error.message || "An error occurred while deleting the subject",
    };
  }
};
export const deleteSubTopic = async (subtopicId, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/subject/delete/${subtopicId}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    if (response.status === 200) {
      toast.success("Subtopic deleted successfully");
      return { success: true, message: "Subtopic deleted successfully" };
    } else {
      toast.error("Failed to delete Subtopic");
      return { success: false, message: "Failed to delete subtopic" };
    }
  } catch (error) {
    console.error("Error deleting subtopic:", error);
    toast.error(
      error.response?.data?.message ||
        "An error occurred while deleting the subtopic"
    );
    return {
      success: false,
      message: error.message || "An error occurred while deleting the subtopic",
    };
  }
};

export const addNewSubject = async (input, accessToken) => {
  try {
    // Convert date fields from IST to UTC if they exist
    const fieldsToConvert = ['createdAt', 'updatedAt', 'startDate', 'endDate', 'date'];

    fieldsToConvert.forEach((field) => {
      if (input[field]) {
        input[field] = convertIstToUtc(input[field]);
      }
    });

    if (!input.name || !input.image || !input.subTopicIds) {
      toast.warning("Fill up empty space");
      return { success: false, message: "Fill up empty space" };
    }

    const data = JSON.stringify(input);
    console.log(input);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/subject/add`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      console.log("Success", response.data);
      toast.success("Subject added successfully");
      return { success: true, data: response.data };
    } else {
      console.log("Failed", response);
      toast.error("Failed to add subject");
      return { success: false, message: "Failed to add subject" };
    }
  } catch (error) {
    console.error("Error adding subject:", error);
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while adding the subject.";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const addNewSubTopic = async (input, accessToken) => {
  try {
    // Convert date fields from IST to UTC if they exist
    const fieldsToConvert = ['createdAt', 'updatedAt', 'startDate', 'endDate', 'date'];

    fieldsToConvert.forEach((field) => {
      if (input[field]) {
        input[field] = convertIstToUtc(input[field]);
      }
    });

    const data = JSON.stringify(input);
    console.log(input);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/sub-topic/add`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      console.log("Success", response.data);
      toast.success("Subtopic added successfully");
      return { success: true, data: response.data };
    } else {
      console.log("Failed", response);
      toast.error("Failed to add subtopic");
      return { success: false, message: "Failed to add subtopic" };
    }
  } catch (error) {
    console.error("Error adding subtopic:", error);
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while adding the subtopic.";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const editSubject = async (input, accessToken) => {
  try {
    // Convert date fields from IST to UTC if they exist
    const fieldsToConvert = ['createdAt', 'updatedAt', 'startDate', 'endDate', 'date'];

    fieldsToConvert.forEach((field) => {
      if (input[field]) {
        input[field] = convertIstToUtc(input[field]);
      }
    });

    if (!input.name || !input.image || !input.subTopicIds) {
      toast.warning("Fill up empty space");
      return { success: false, message: "Fill up empty space" };
    }

    const data = JSON.stringify(input);
    console.log(input);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/subject/edit`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      console.log("Success", response.data);
      toast.success("Subject edited successfully");
      return { success: true, data: response.data };
    } else {
      console.log("Failed", response);
      toast.error("Failed to edit subject");
      return { success: false, message: response.data.message || "Failed to edit subject" };
    }
  } catch (error) {
    console.error("Error editing subject:", error);
    const errorMessage = error.response?.data?.message || "An error occurred while editing the subject.";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};
