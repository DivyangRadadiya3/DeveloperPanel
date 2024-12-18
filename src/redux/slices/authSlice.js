// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    LOGIN(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;
export default authSlice.reducer;
