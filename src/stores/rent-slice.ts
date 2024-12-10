// import { IPaginationResponse } from "@/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IReviewProduct {
  order: API.TOrders;
  isLessor: boolean;
  isAdmin: boolean;
}

export interface InitialState {
  product: API.TProduct | null;
  checkOrderProduct: IReviewProduct | null;
}

const initialState: InitialState = {
  product: null,
  checkOrderProduct: null,
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
    addCheckOrderProduct: (state, action: PayloadAction<IReviewProduct>) => {
      state.checkOrderProduct = action.payload;
    },
    removeCheckOrderProduct: (state) => {
      state.checkOrderProduct = null;
    },
  },
});

export const {
  addRentProduct,
  removeRentProduct,
  addCheckOrderProduct,
  removeCheckOrderProduct,
} = rentSlice.actions;

export default rentSlice.reducer;
