// import { IPaginationResponse } from "@/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  furniture: {
    status: "idle" | "loading" | "succeeded" | "failed";
    products: null;
  };
}

const initialState: InitialState = {
  furniture: {
    status: "idle",
    products: null,
  },
};

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: initialState,
  reducers: {
    getProductFurnitureStart: (state) => {
      state.furniture.status = "loading";
    },
    getProductFurnitureSuccess: (
      state,
      // action: PayloadAction<IPaginationResponse<API.IProductCard>>
    ) => {
      state.furniture.status = "succeeded";
      // state.furniture.products = action.payload;
    },
    getProductFurnitureFailed: (state) => {
      state.furniture.status = "failed";
      state.furniture.products = null;
    },
  },
});

export const {
  getProductFurnitureStart,
  getProductFurnitureSuccess,
  getProductFurnitureFailed,
} = homeSlice.actions;

export default homeSlice.reducer;
