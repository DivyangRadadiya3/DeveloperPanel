import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const imgUpload = async (file,  token,field) => {
  try {
    if (!file) {
      toast.warning("No file selected");
      return { success: false, message: "No file selected" };
    }
    if (file) {
      console.log(file);

      const fieldsToConvert = [
        "createdAt",
        "updatedAt",
        "startDate",
        "endDate",
      ];
      fieldsToConvert.forEach((field) => {
        if (file[field]) {
          const utcTime = convertIstToUtc(file[field]);
          console.log(`Converted ${field} to UTC:`, utcTime);
          file[field] = utcTime;
        }
      });
    }
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      method: "post",
      url: `${BASE_URL}/upload`,
      headers: {
        Authorization: `${token}`,
        pdfType: `${field}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    const response = await axios.request(config);
    console.log(response);

    if (response.data) {
      // Convert relevant date fields from ISC to UTC
      const fieldsToConvert = [
        "createdAt",
        "updatedAt",
        "startDate",
        "endDate",
        "date",
      ];

      fieldsToConvert.forEach((field) => {
        if (response.data[field]) {
          response.data[field] = convertIstToUtc(response.data[field]);
          console.log(`Converted ${field} to UTC:`, response.data[field]);
        }
      });
    }

    toast.success("Image uploaded successfully");
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (err) {
    console.error("Error uploading image:", err);
    const errorMessage =
      err.response?.data?.message || "Failed to upload image.";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const uploadFile = async (file, field, token) => {
  try {

    if (!file) {
      toast.warning("No file selected");
      return { success: false, message: "No file selected" };
    }

    const fileType = file.type;
    const formData = new FormData();
    let pdfType;

    if (fileType === "application/pdf") {
      if (field === "privacyPolicy") {
        pdfType = "privacy-policy";
        formData.append("privacyPolicy", file); 
        console.log(formData);
      } else if (field === "termsAndConditions") {
        pdfType = "terms-condition";
        formData.append("termsAndConditions", file); 
        console.log(formData);
      } else {
        toast.warning("Unsupported field type for PDF");
        return;
      }
    } else if (fileType.startsWith("image/")) {
      
      if (field === "image") {
        formData.append("image", file); 
        console.log(formData);
      } else {
        toast.warning("Unsupported field type for image");
        return;
      }
    } else {
      toast.warning("Unsupported file type. Please upload an image or PDF.");
      return;
    }

    // Prepare config for the request
    const config = {
      method: "post",
      url: `${BASE_URL}/upload`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        pdfType: pdfType
      },
      data: formData,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data.data, // Assuming the data contains the response data
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message || `Error uploading ${field}`,
      };
    }
  } catch (err) {
    console.error(`Error uploading ${field}:`, err);
    return {
      success: false,
      message: `Failed to upload ${field}.`,
    };
  }
};
