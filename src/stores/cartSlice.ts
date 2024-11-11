import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  products: API.TProductCard[] | null;
}

const initialState: InitialState = { products: [] };

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    addProductCart: (state, action: PayloadAction<API.TProductCard>) => {
      const existProduct = state.products?.some(
        (product) => product.id === action.payload.id
      );
      if (existProduct) return;
      state.products?.unshift(action.payload);
    },
    removeProductCart: (state, action: PayloadAction<number>) => {
      if (state.products?.length) {
        if (action.payload > 0 && action.payload < state.products?.length - 1)
          state.products?.splice(action.payload, 1);
      }
    },
  },
});

export const { addProductCart, removeProductCart } = cartSlice.actions;

export default cartSlice.reducer;
