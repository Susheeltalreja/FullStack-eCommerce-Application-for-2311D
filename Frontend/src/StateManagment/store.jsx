import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthState/index"
import ProductSlice from "./AdminStates/ProductSlice"

const store = configureStore({
    reducer: {
        Auth : AuthSlice,
        Product: ProductSlice
    }
})

export default store;