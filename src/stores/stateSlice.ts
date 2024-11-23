import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  backdrop: {
    status: false | true;
  };
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
  updateAvatarProfileDialog: {
    open: false | true;
  };
}

const initialState: InitialState = {
  backdrop: { status: false },
  addedCartDialog: { open: false },
  quickViewProduct: { open: false, product: null },
  searchDialog: { open: false },
  updateAvatarProfileDialog: { open: false },
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState: initialState,
  reducers: {
    openBackdrop: (state) => {
      state.backdrop.status = true;
    },
    closeBackdrop: (state) => {
      state.backdrop.status = false;
    },
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
    openUpdateAvatarProfileDialog: (state) => {
      state.updateAvatarProfileDialog.open = true;
    },
    closeUpdateAvatarProfileDialog: (state) => {
      state.updateAvatarProfileDialog.open = false;
    },
  },
});

export const {
  openBackdrop,
  closeBackdrop,
  openAddedCartDialog,
  closeAddedCartDialog,
  openQuickViewProductDialog,
  closeQuickProductViewDialog,
  openSearchDialog,
  closeSearchDialog,
  openUpdateAvatarProfileDialog,
  closeUpdateAvatarProfileDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
