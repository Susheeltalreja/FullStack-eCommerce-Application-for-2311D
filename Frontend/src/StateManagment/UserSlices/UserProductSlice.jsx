
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UserProductThunk = createAsyncThunk(
    "/user/UserProductThunk",
    async({Filters, Sort}) => {
        let query = new URLSearchParams({
            ...Filters,
            SortBy: Sort
        })
        const response = await axios.get(`http://localhost:5000/user/product/get-products?${query}`);
        return response?.data;
    }
)

const UserProduct = createSlice({
    name: "UserProduct",
    initialState: {
        isLoading: false,
        Products: []
    },
    extraReducers: (build) => {
        build.addCase(UserProductThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(UserProductThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Products = action?.payload?.Data;
        }).addCase(UserProductThunk.rejected, (state) => {
            state.isLoading = false;
            state.Products = [];
        })
    }
})

export default UserProduct.reducer;