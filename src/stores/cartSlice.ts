import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  product: null;
}

const initialState: InitialState = {
  product: null,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {},
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
