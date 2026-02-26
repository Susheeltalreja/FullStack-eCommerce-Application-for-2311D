

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AddProductThunk = createAsyncThunk(
    "/product/AddProductThunk",
    async(data) => {
        const response = await axios.post("http://localhost:5000/product/add-product", data);
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

    }
})

export default ProductSlice.reducer;