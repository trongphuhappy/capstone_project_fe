// import { IPaginationResponse } from "@/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  product: API.TProduct | null;
}

const initialState: InitialState = {
  product: null,
};

const rentSlice = createSlice({
  name: "rentSlice",
  initialState: initialState,
  reducers: {
    addRentProduct: (state, action: PayloadAction<API.TProduct>) => {
      state.product = action.payload;
    },
    removeRentProduct: (state) => {
      state.product = null;
    },
  },
});

export const { addRentProduct, removeRentProduct } =
  rentSlice.actions;

export default rentSlice.reducer;
