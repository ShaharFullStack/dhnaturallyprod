import { configureStore } from "@reduxjs/toolkit";
// import { LikeModel } from "../Models/LikeModel";
import { ProductModel } from "../Models/ProductModel";
import { loggerMiddleware } from "./Middleware";
import { userSlice } from "./UserSlice";
import { productSlice } from "./ProductSlice";
import { UserModel } from "../Models/UserModel";


export type AppState = {
    products: ProductModel[];
    user: UserModel | null;
};

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        user: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
});