import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  quickViewProduct: {
    open: false | true;
    product: API.IProductCard | null;
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
  quickViewProduct: { open: false, product: null },
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
    openQuickViewProductDialog: (
      state,
      action: PayloadAction<API.IProductCard>
    ) => {
      state.quickViewProduct.open = true;
      state.quickViewProduct.product = action.payload;
    },
    closeQuickProductViewDialog: (state) => {
      state.quickViewProduct.open = false;
      state.quickViewProduct.product = null;
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
