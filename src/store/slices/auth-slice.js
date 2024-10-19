import { createSlice } from "@reduxjs/toolkit";

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
