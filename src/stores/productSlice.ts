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
    createProduct: (state, action: PayloadAction<REQUEST.TCreateProduct>) => {
      state.createProduct.status = true;
      state.createProduct.product = action.payload;
    },
    removeProduct: (state) => {
      state.createProduct.status = false;
      state.createProduct.product = null;
    },
  },
});

export const { createProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
