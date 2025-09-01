import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";

export function initProducts(currentState: ProductModel[], action: PayloadAction<ProductModel[]>): ProductModel[] {
    return action.payload.map(product => ({
        ...product,
    }));
}

export function addProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const newState = [...currentState];
    newState.push({
        ...action.payload,
    });
    return newState;
}

export function updateProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === action.payload.id);
    newState[index] = {
        ...action.payload,
    };
    return newState;
}

export function deleteProduct(currentState: ProductModel[], action: PayloadAction<string>): ProductModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === action.payload);
    newState.splice(index, 1);
    return newState;
}

export function clearProducts(currentState: ProductModel[], action: PayloadAction): ProductModel[] {
    return [];
}





export const productSlice = createSlice({
    name: "products",
    initialState: [] as ProductModel[],
    reducers: {
        initProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        clearProducts,
    }
});

export const productActions = productSlice.actions;