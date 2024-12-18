import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const fetchFeedbackData = async (accessToken) => {
//   try {
//     const config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: `${BASE_URL}/feedback/all`,
//       headers: {
//         Authorization: `${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     };

//     const response = await axios.request(config);

//     if (response.status === 200) {
//       const data = response.data.data.feedback_data;
//       // console.log(UserData);

//       const convertDataToIsc = (data) => {
//         if (data && Array.isArray(data)) {
//           data.forEach((item) => {
//             if (item.createdAt) {
//               item.createdAt = convertUtcToIst(item.createdAt);
//             }
//             if (item.updatedAt) {
//               item.updatedAt = convertUtcToIst(item.updatedAt);
//             }
//             if (item.startDate) {
//               item.startDate = convertUtcToIst(item.startDate);
//             }
//             if (item.endDate) {
//               item.endDate = convertUtcToIst(item.endDate);
//             }
//           });
//         }
//       };

//       convertDataToIsc(data);

//       // console.log("Converted question report data:", data);
//       // console.log("Converted user data:", UserData);

//       // Loop through question report data and find matched users

//       return {
//         success: true,
//         feedbackData: data,
//         message: "Feedback data fetched successfully.",
//       };
//     } else {
//       // Handle error if either response status is not 200
//       throw new Error(
//         `Failed to fetch data. Status codes: Response 1 - ${response.status}`
//       );
//     }
//   } catch (error) {
//     // Catch and log any errors
//     console.error("Error:", error.message || error);
//     return {
//       success: false,
//       message: error.message || "An error occurred while fetching data.",
//     };
//   }
// };

export const fetchFeedbackData = async (accessToken) => {
  try {
    const config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/feedback/all`,
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
      const data = response1.data.data.feedback_data;
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
        feedbackData: data,
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

export const deleteFeedbackData = async (dataId, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/feedback/delete/${dataId}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      toast.success("FeedbackData deleted successfully");
      await fetchFeedbackData(accessToken);
      return {
        success: true,
        message: "FeedbackData deleted successfully",
        data: response.data,
      };
    } else {
      toast.error("Failed to delete FeedbackData:", response);
      console.error("Failed to delete FeedbackData, status:", response.status);
      return {
        success: false,
        message: `Failed to delete FeedbackData with status: ${response.status}`,
      };
    }
  } catch (err) {
    toast.error("Error deleting FeedbackData data:", err.message);
    return {
      success: false,
      message: `An error occurred while deleting the FeedbackData: ${err.message}`,
    };
  }
};
