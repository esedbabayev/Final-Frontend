import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signUpUser = createAsyncThunk(
  "/auth/sign-up",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/sign-up",
      formData,
      { withCredentials: true }
    );

    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {},
  },
});

export const { setUser } = authSlice.actions;
