// import { IPaginationResponse } from "@/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  furniture: API.Category[];
  car: API.Category[];
}

const initialState: InitialState = {
  furniture: [],
  car: [],
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<API.Category[]>) => {
      state.furniture = action.payload.filter((item) => !item.isVehicle);
      state.car = action.payload.filter((item) => item.isVehicle);
    },
    removeCategory: (state) => {
      state.furniture = [];
      state.car = [];
    },
  },
});

export const { addCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
