import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthState/index"

const store = configureStore({
    reducer: {
        Auth : AuthSlice
    }
})

export default store;