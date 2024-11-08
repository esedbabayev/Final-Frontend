import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
};

export const getAllFilteredProducts = createAsyncThunk(
  "/products/getallproducts",
  async ({ filterParams, sortParams }) => {
    // console.log(getAllFilteredProducts);

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const response = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );
    return response?.data;
  }
);

export const userProductSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        console.log(action.payload.data, "action.payload.data");
      })
      .addCase(getAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});
