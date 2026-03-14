import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthState/index"
import ProductSlice from "./AdminStates/ProductSlice"

import UserProduct from "./UserSlices/UserProductSlice";

import CartSlice from "./UserSlices/UserCartSlice";

const store = configureStore({
    reducer: {
        Auth : AuthSlice,
        Product: ProductSlice,
        UserProduct: UserProduct,
        Cart: CartSlice
    }
})

export default store;