import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "/address/addAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/address/add",
      formData
    );
    return response?.data;
  }
);

export const getAllAddresses = createAsyncThunk(
  "/address/getAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/address/get/${userId}`
    );
    return response?.data;
  }
);

export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.patch(
      `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response?.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response?.data;
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action?.payload?.data;
      })
      .addCase(getAllAddresses.rejected, (state) => {
        (state.isLoading = false), (state.addressList = []);
      });
    //   .addCase(editAddress.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(editAddress.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.addressList = action?.payload?.data;
    //   })
    //   .addCase(editAddress.rejected, (state) => {
    //     (state.isLoading = false), (state.addressList = []);
    //   })
    //   .addCase(deleteAddress.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteAddress.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.addressList = action?.payload?.data;
    //   })
    //   .addCase(deleteAddress.rejected, (state) => {
    //     (state.isLoading = false), (state.addressList = []);
    //   });
  },
});
