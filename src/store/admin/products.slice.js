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
      "http://localhost:5000/api/admin/products/add",
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
      "http://localhost:5000/api/admin/products/get"
    );
    return response?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const response = await axios.patch(
      `http://localhost:5000/api/admin/products/edit/${id}`,
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
      `http://localhost:5000/api/admin/products/edit/${id}`
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
        console.log(action.payload);

        (state.isLoading = false), (state.products = action.payload);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        console.log(action.payload);

        (state.isLoading = false), (state.products = []);
      });
  },
});
