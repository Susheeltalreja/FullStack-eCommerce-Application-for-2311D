import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


export const UserRegister = createAsyncThunk(
    "/auth/UserRegister",
    async (data) => {
        const response = await axios.post("http://localhost:5000/auth/register", data);
        // console.log("Response: ", response)
        return response?.data
    }
)

export const UserLoginThunk = createAsyncThunk(
    "/auth/UserLoginThunk",
    async (data) => {
        const response = await axios.post("http://localhost:5000/auth/login", data, {
            withCredentials: true
        });
        return response?.data;
    }
)

export const UserLoggedOutThunk = createAsyncThunk(
    "/auth/UserLoggedOutThunk",
    async () => {
        const response = await axios.post("http://localhost:5000/auth/logout", {}, {
            withCredentials: true
        })
        return response?.data;
    }
)

export const ReturnUserData = createAsyncThunk(
    "/auth/ReturnUserData",
    async () => {
        const response = await axios.get("http://localhost:5000/auth/return", {
            withCredentials: true
        })
        return response?.data;
    }
)

export const OtpVerifyThunk = createAsyncThunk(
    "/auth/OtpVerifyThunk",
    async (data) => {
        const response = await axios.post("http://localhost:5000/auth/otp", data, {
            withCredentials: true
        });
        return response?.data
    }
)

export const UpdatePasswordThunk = createAsyncThunk(
    "/auth/UpdatePasswordThunk",
    async (data) => {
        const response = await axios.post("http://localhost:5000/auth/update-password", data);
        return response?.data
    }
)

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: {
        isLoading: false,
        isAuth: false,
        UserData: null,
        AuthLoad: false
    },
    extraReducers: (build) => {
        build.addCase(UserLoginThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(UserLoginThunk.fulfilled, (state, action) => {
            console.log("Act: ", action);
            if (action?.payload?.success) {
                state.isLoading = false;
                state.isAuth = true;
                state.UserData = action?.payload?.data
            }
        }).addCase(UserLoginThunk.rejected, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.UserData = null;
        }).addCase(UserLoggedOutThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(UserLoggedOutThunk.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.UserData = null;
        }).addCase(UserLoggedOutThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.UserData = action?.payload?.data;
        }).addCase(ReturnUserData.pending, (state) => {
            state.isLoading = true;
            state.AuthLoad = false;
        }).addCase(ReturnUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.UserData = action?.payload?.data;
            state.AuthLoad = true;
        }).addCase(ReturnUserData.rejected, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.UserData = null;
            state.AuthLoad = true;
        }).addCase(OtpVerifyThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(OtpVerifyThunk.fulfilled, (state, action) => {
            if (action?.payload?.success) {
                state.isLoading = false;
                state.isAuth = true;
                state.UserData = action?.payload?.data
            }
        }).addCase(OtpVerifyThunk.rejected, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.UserData = null;
        })
    }
})

export default AuthSlice.reducer;