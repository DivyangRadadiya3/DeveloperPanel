// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { dataReducer, authReducer } from "./slices";

const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
  },
});

export default store;
