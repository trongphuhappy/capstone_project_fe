import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface InitialState {
  createProduct: { status: boolean; product: REQUEST.TCreateProduct | null };
  reviewProduct: API.TProduct | null;
}

const initialState: InitialState = {
  createProduct: { status: false, product: null },
  reviewProduct: null,
};

const productSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    createProductStart: (state) => {
      state.createProduct.status = true;
    },
    createProductSuccess: (
      state,
      action: PayloadAction<REQUEST.TCreateProduct>
    ) => {
      state.createProduct.product = action.payload;
      state.createProduct.status = false;
    },
    createProductEnd: (state) => {
      state.createProduct.status = false;
    },
    removeProduct: (state) => {
      state.createProduct.status = false;
      state.createProduct.product = null;
    },
    addReviewProduct: (state, action: PayloadAction<API.TProduct>) => {
      state.reviewProduct = action.payload;
    },
    removeReviewProduct: (state) => {
      state.reviewProduct = null;
    },
  },
});

export const {
  createProductStart,
  createProductSuccess,
  createProductEnd,
  removeProduct,
  addReviewProduct,
  removeReviewProduct,
} = productSlice.actions;
export default productSlice.reducer;
