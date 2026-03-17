import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AddToCartThunk = createAsyncThunk(
    "/cart/AddToCartThunk",
    async(Data) => {
        const response = await axios.post("http://localhost:5000/user/cart/add", Data);
        console.log(response);
        return response?.data
    }
)

export const FetchCartThunk = createAsyncThunk(
    "/cart/FetchCartThunk",
    async(id) => {
        const response = await axios.get(`http://localhost:5000/user/cart/get-cart/${id}`);
        return response?.data;
    }
)

const CartSlice = createSlice({
    name: "CartSlice",
    initialState: {
        isLoading: false,
        Cart: []
    },
    extraReducers: (build) => {
        build.addCase(FetchCartThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Cart = action?.payload?.Data?.Products
        }).addCase(FetchCartThunk.rejected, (state) => {
            state.isLoading = false;
            state.Cart = [];
        })
    }
})

export default CartSlice.reducer;