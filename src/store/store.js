import { configureStore } from "@reduxjs/toolkit";

// Slices
import { authSlice } from "./slices/auth-slice.js";
import { adminProductSlice } from "./admin/products.slice.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    adminProducts: adminProductSlice.reducer,
  },
});

export default store;
