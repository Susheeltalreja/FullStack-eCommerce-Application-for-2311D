

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AddProductThunk = createAsyncThunk(
    "/product/AddProductThunk",
    async(data) => {
        const response = await axios.post("http://localhost:5000/product/add-product", data);
        return response?.data;
    }
)

export const FetchProductThunk = createAsyncThunk(
    "/product/FetchProductThunk",
    async() => {
        const response = await axios.get("http://localhost:5000/product/fetch-product")
        return response?.data
    }
)

export const UpdateProductThunk = createAsyncThunk(
    "/product/UpdateProductThunk",
    async({Data, id}) => {
        const response = await axios.put(`http://localhost:5000/product/update-product/${id}`, Data);
        return response?.data;
    }
)

const ProductSlice = createSlice({
    name: "ProductSlice",
    initialState: {
        isLoading: false,
        Products: []
    },
    extraReducers: (build) => {
        build.addCase(FetchProductThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchProductThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Products = action?.payload?.data
        }).addCase(FetchProductThunk.rejected, (state) => {
            state.isLoading = false;
            state.Products = [];
        })
    }
})

export default ProductSlice.reducer;