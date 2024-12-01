// import { IPaginationResponse } from "@/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  product: API.TProduct | null;
}

const initialState: InitialState = {
  product: null,
};

const quickViewProductSlice = createSlice({
  name: "quickViewProductSlice",
  initialState: initialState,
  reducers: {
    addQuickViewProduct: (state, action: PayloadAction<API.TProduct>) => {
      state.product = action.payload;
    },
    removeQuickViewProduct: (state) => {
      state.product = null;
    },
  },
});

export const { addQuickViewProduct, removeQuickViewProduct } =
  quickViewProductSlice.actions;

export default quickViewProductSlice.reducer;
