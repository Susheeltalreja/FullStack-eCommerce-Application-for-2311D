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

const CartSlice = createSlice({
    name: "CartSlice",
    initialState: {
        isLoading: false,
        Cart: []
    },
    extraReducers: (build) => {

    }
})

export default CartSlice.reducer;