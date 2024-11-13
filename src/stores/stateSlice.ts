import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  quickViewProduct: {
    open: false | true;
  };
  addedCartDialog: {
    open: false | true;
  };
  searchDialog: {
    open: false | true;
  };
}

const initialState: InitialState = {
  addedCartDialog: { open: false },
  quickViewProduct: { open: false },
  searchDialog: { open: false },
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
    openSearchDialog: (state) => {
      state.searchDialog.open = true;
    },
    closeSearchDialog: (state) => {
      state.searchDialog.open = false;
    },
  },
});

export const {
  openAddedCartDialog,
  closeAddedCartDialog,
  openQuickViewProductDialog,
  closeQuickProductViewDialog,
  openSearchDialog,
  closeSearchDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
