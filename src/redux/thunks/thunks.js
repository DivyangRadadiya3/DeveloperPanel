// src/redux/thunks/loginThunk.js
import axios from "axios";
import { convertIstToUtc } from "../../Utils/timeUtils";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Async thunk for login
export const handleLogin = async (input, { rejectWithValue }) => {
  try {
    const userData = JSON.stringify(input);

    const config = {
      method: "post",
      url: `${BASE_URL}/auth/login`,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: userData,
    };

    const response = await axios.request(config);
    const { status, data, message, error } = response.data;

    if (status === 200) {
      if (data.lastLogin) {
        // Convert lastLogin from IST to UTC
        data.lastLogin = convertIstToUtc(data.lastLogin);
        console.log("Converted Login Time (UTC):", data.lastLogin);
      }
      // Store login data in localStorage
      localStorage.setItem("adminData", JSON.stringify(data));
      return data; // Return the data for the reducer to store in state
    } else {
      return rejectWithValue(message || error || "Login failed");
    }
  } catch (err) {
    return rejectWithValue(
      err.response?.data?.message || "An error occurred during login"
    );
  }
};
