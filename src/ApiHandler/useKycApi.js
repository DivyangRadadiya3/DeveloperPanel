import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchKycData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/kyc/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const kycData = response.data.data.kyc_data;

      const fieldsToConvert = [
        "createdAt",
        "updatedAt",
        "startDate",
        "endDate",
      ];

      const updatedKycData = kycData.map((item) => {
        const hasDateField = fieldsToConvert.some((field) => item[field]);

        if (hasDateField) {
          fieldsToConvert.forEach((field) => {
            if (item[field]) {
              item[field] = convertUtcToIst(item[field]);
            }
          });
        }

        return item;
      });
      // console.log(`Converted to ISC:`, updatedKycData);

      return { success: true, data: updatedKycData };
    } else {
      console.error("Failed to fetch KYC data:", response.data.message);
      console.error("Failed to fetch KYC data: " + response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (err) {
    console.error("Error fetching KYC data:", err.message);
    toast.error("Error fetching KYC data: " + err.message);
    return { success: false, message: err.message };
  }
};

export const filterData = (kycData) => {
  const pending = kycData.filter((user) => user.status === "pending");
  const unverified = kycData.filter((user) => user.status === "unverified");
  const verified = kycData.filter((user) => user.status === "verified");

  return { pending, unverified, verified };
};

export const updateAndFetchKycStatus = async (accessToken, updateData) => {
  try {
    const fieldsToConvert = [
      "createdAt",
      "updatedAt",
      "startDate",
      "endDate",
      "updatedAt",
      "createdAt",
    ];
    fieldsToConvert.forEach((field) => {
      if (updateData[field]) {
        updateData[field] = convertIstToUtc(updateData[field]);
        console.log(`Converted ${field} to UTC:`, updateData[field]);
      }
    });

    // Prepare request data
    const data = JSON.stringify(updateData);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/kyc/edit`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    // Fetch updated KYC data
    const updateResponse = await axios.request(config);

    if (updateResponse.status === 200) {
      toast.success("KYC Status updated successfully.");

      const fetchResponse = await fetchKycData(accessToken);
      if (fetchResponse.success) {
        console.log("Fetched KYC Data after update:", fetchResponse.data);
        return { success: true, data: fetchResponse.data };
      } else {
        console.error(
          "Failed to fetch KYC data after update:",
          fetchResponse.message
        );
        return { success: false, message: fetchResponse.message };
      }
    } else {
      console.error("Request failed:", updateResponse.data.message);
      console.error(
        "Failed to update KYC Status: " + updateResponse.data.message
      );
      return { success: false, message: updateResponse.data.message };
    }
  } catch (err) {
    console.error("Error updating KYC status:", err.message);
    toast.error("Error updating KYC status: " + err.message);
    return { success: false, message: err.message };
  }
};
