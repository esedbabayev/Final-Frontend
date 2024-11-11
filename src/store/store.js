import { configureStore } from "@reduxjs/toolkit";

// Slices
import { authSlice } from "./slices/auth-slice.js";
import { adminProductSlice } from "./admin/products.slice.js";
import { userProductSlice } from "./user/products.slice.js";
import { cartSlice } from "./user/cart.slice.js";
import { addressSlice } from "./user/address.slice.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    adminProducts: adminProductSlice.reducer,
    userProducts: userProductSlice.reducer,
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
  },
});

export default store;
