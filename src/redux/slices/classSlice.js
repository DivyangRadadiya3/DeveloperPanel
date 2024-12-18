import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const classSlice = createSlice({
    name: 'class',
    initialState: {
      classData: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        
    },
  });
  
  export default classSlice.reducer;