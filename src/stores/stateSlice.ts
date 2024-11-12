import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  quickViewProduct: {
    open: false | true;
  };
  addedCartDialog: {
    open: false | true;
  };
}

const initialState: InitialState = {
  addedCartDialog: { open: false },
  quickViewProduct: { open: false },
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: initialState,
  reducers: {
    openAddedCartDialog: (state) => {
      state.addedCartDialog.open = true;
    },
    closeAddedCartDialog: (state) => {
      state.addedCartDialog.open = false;
    },
    openQuickViewProductDialog: (state) => {
      state.quickViewProduct.open = true;
    },
    closeQuickProductViewDialog: (state) => {
      state.quickViewProduct.open = false;
    },
  },
});

export const {
  openAddedCartDialog,
  closeAddedCartDialog,
  openQuickViewProductDialog,
  closeQuickProductViewDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
