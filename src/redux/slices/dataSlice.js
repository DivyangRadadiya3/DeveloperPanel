import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleLogin } from "../thunks/loginThunks";
import {
  deleteQuestionFAQ,
  fetchQuestionFAQ,
} from "../../ApiHandler/reportApi";

import { fetchClassData } from "../../ApiHandler/contestService";

export const loadClassData = createAsyncThunk(
  "class/loadClassData",
  async (accessToken, { rejectWithValue }) => {
    try {
      const result = await fetchClassData(accessToken);
      if (!result.success) {
        return rejectWithValue(result.message);
      }
     console.log(result.data);
     
      return {
        data: result.data,
        message: result.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while loading class data"
      );
    }
  }
);

export const fetchFAQs = createAsyncThunk(
  "faq/fetchFAQs",
  async (accessToken) => {
    const response = await fetchQuestionFAQ(accessToken);
    if (!response.success) {
      throw new Error(response.message);
    }

    // Return the entire response object
    return {
      data: response.data,
      userData: response.userData,
      message: response.message,
    };
  }
);

// Async thunk for deleting a FAQ
export const removeFAQ = createAsyncThunk(
  "faq/removeFAQ",
  async ({ id, accessToken }) => {
    const response = await deleteQuestionFAQ(id, accessToken);
    if (!response.success) {
      throw new Error(response.message);
    }
    return id; // Return the ID of the deleted FAQ
  }
);

export const loginAdmin = createAsyncThunk(
  "user/handleLogin",
  async (credentials) => {
    const response = await handleLogin(credentials);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  }
);

const initialData = {
  AdminData: JSON.parse(localStorage.getItem("adminData")) || [],
  privacyPolicy: null,
  bannerDataList: [],
  imageData: [],
  tearmAndCondition: null,
  howtoplayData: [],
  contestData: [],
  editContestData: null,
  contestType: [],
  editContestTypeData: null,
  classesData: [],
  classData: [],
  subjectList: [],
  editSubjectData: null,
  subtopicList: [],
  existClassesPanel: [],
  faqData: [],
  Logintype: "Admin",
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialData,
  reducers: {
    LOGIN_ADMIN(state, action) {
      state.AdminData = action.payload;
      localStorage.setItem("adminData", JSON.stringify(action.payload));
    },
    LOGOUT(state) {
      state.AdminData = [];
      localStorage.removeItem("adminData");
    },
    SET_PRIVACY_POLICY(state, action) {
      state.privacyPolicy = action.payload;
    },
    SET_BANNER(state, action) {
      state.bannerDataList = [action.payload];
    },
    EDIT_BANNER(state, action) {
      const index = state.bannerDataList.findIndex(
        (banner) => banner._id === action.payload._id
      );
      if (index !== -1) {
        state.bannerDataList[index] = {
          ...state.bannerDataList[index],
          ...action.payload,
        };
      }
    },
    UPDATE_IMAGE_DATA(state, action) {
      state.imageData = action.payload;
    },
    SET_HOW_TO_PLAY(state, action) {
      state.howtoplayData = [action.payload];
    },
    SET_TERMS_AND_CONDITIONS(state, action) {
      state.tearmAndCondition = action.payload;
    },
    SET_CONTEST_DATA(state, action) {
      state.contestData = action.payload;
    },
    SET_CONTEST_TYPE(state, action) {
      state.contestType = action.payload;
    },
    EDIT_CONTEST_DATA(state, action) {
      state.editContestData = action.payload;
    },
    EDIT_CONTEST_TYPE_DATA(state, action) {
      state.editContestTypeData = action.payload;
    },
    ADD_CLASSES_DATA(state, action) {
      state.classesData = action.payload;
    },
    SET_SUBJECT_LIST(state, action) {
      state.subjectList = action.payload;
    },
    EDIT_SUBJECT_DATA(state, action) {
      state.editSubjectData = action.payload;
    },
    SET_SUBTOPIC_LIST(state, action) {
      state.subtopicList = action.payload;
    },
    SET_EXIST_CLASSES_PANEL(state, action) {
      state.existClassesPanel = action.payload;
    },
    SET_LOGIN_TYPE(state, action) {
      state.Logintype = action.payload;
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadClassData.pending, (state) => {
          state.loading = true; // Set loading to true when the request is pending
          state.error = null; // Reset error
        })
        .addCase(loadClassData.fulfilled, (state, action) => {
          state.loading = false; // Set loading to false when the request is fulfilled
          state.classData = action.payload.data; // Store the fetched class data
        })
        .addCase(loadClassData.rejected, (state, action) => {
          state.loading = false; // Set loading to false when the request is rejected
          state.error = action.payload; // Store the error message
        })
        .addCase(fetchFAQs.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchFAQs.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload.data; // Store FAQ data
          state.userData = action.payload.userData; // Store user data
          state.message = action.payload.message; // Store success message
        })
        .addCase(fetchFAQs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(removeFAQ.fulfilled, (state, action) => {
          state.data = state.data.filter((item) => item.id !== action.payload);
        })
        .addCase(handleLogin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(handleLogin.fulfilled, (state, action) => {
          state.loading = false;
          state.AdminData = action.payload;
          state.error = null;
        })
        .addCase(handleLogin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Login failed";
        });
    },
  },
});

// Export actions
export const {
  LOGIN_ADMIN,
  LOGOUT,
  SET_PRIVACY_POLICY,
  SET_BANNER,
  EDIT_BANNER,
  UPDATE_IMAGE_DATA,
  SET_HOW_TO_PLAY,
  SET_TERMS_AND_CONDITIONS,
  SET_CONTEST_DATA,
  SET_CONTEST_TYPE,
  EDIT_CONTEST_DATA,
  EDIT_CONTEST_TYPE_DATA,
  ADD_CLASSES_DATA,
  SET_SUBJECT_LIST,
  EDIT_SUBJECT_DATA,
  SET_SUBTOPIC_LIST,
  SET_EXIST_CLASSES_PANEL,
  SET_LOGIN_TYPE,
} = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
