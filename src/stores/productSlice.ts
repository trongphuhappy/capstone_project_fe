import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  createProduct: { status: boolean; product: REQUEST.TCreateProduct | null };
}

const initialState: InitialState = {
  createProduct: { status: false, product: null },
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
  },
});

export const {
  createProductStart,
  createProductSuccess,
  createProductEnd,
  removeProduct,
} = productSlice.actions;
export default productSlice.reducer;
