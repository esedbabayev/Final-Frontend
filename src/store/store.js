import { configureStore } from "@reduxjs/toolkit";

// Slices
import { authSlice } from "./slices/auth-slice.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store