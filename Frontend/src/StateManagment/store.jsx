import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthState/index"
import ProductSlice from "./AdminStates/ProductSlice"

import UserProduct from "./UserSlices/UserProductSlice";

const store = configureStore({
    reducer: {
        Auth : AuthSlice,
        Product: ProductSlice,
        UserProduct: UserProduct
    }
})

export default store;