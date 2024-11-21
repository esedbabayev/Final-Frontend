import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
};

export const addNewProuct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "/products/getallproducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`
    );
    return response?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
    );
    return response?.data;
  }
);

export const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.products = action.payload.data);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.products = []);
      });
  },
});
