import { CheckOrderStatus, OrderStatusType } from "@/const/order";
import { confirmStatus } from "@/const/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  backdrop: {
    status: false | true;
  };
  quickViewProduct: {
    open: false | true;
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
  updateProfileDialog: {
    openEmail: false | true;
    openFirstName: false | true;
    openLastName: false | true;
    openUpdateLessor: false | true;
  };
  censorProductDialog: {
    open: false | true;
    type: confirmStatus;
  };
  rentDialog: {
    open: false | true;
  };
  checkOrderProductDialog: {
    open: false | true;
    type: CheckOrderStatus;
  };
}

const initialState: InitialState = {
  backdrop: { status: false },
  addedCartDialog: { open: false },
  quickViewProduct: { open: false },
  searchDialog: { open: false },
  updateAvatarProfileDialog: { open: false },
  updateProfileDialog: {
    openEmail: false,
    openFirstName: false,
    openLastName: false,
    openUpdateLessor: false,
  },
  censorProductDialog: { open: false, type: confirmStatus.Approved },
  rentDialog: { open: false },
  checkOrderProductDialog: { open: false, type: CheckOrderStatus.Approved },
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
    openQuickViewProductDialog: (state) => {
      state.quickViewProduct.open = true;
    },
    closeQuickViewProductDialog: (state) => {
      state.quickViewProduct.open = false;
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
    openUpdateEmailDialog: (state) => {
      state.updateProfileDialog.openEmail = true;
    },
    closeUpdateEmailDialog: (state) => {
      state.updateProfileDialog.openEmail = false;
    },
    openUpdateFirstNameDialog: (state) => {
      state.updateProfileDialog.openFirstName = true;
    },
    closeUpdateFirstNameDialog: (state) => {
      state.updateProfileDialog.openFirstName = false;
    },
    openUpdateLastNameDialog: (state) => {
      state.updateProfileDialog.openLastName = true;
    },
    closeUpdateLastNameDialog: (state) => {
      state.updateProfileDialog.openLastName = false;
    },
    openUpdateInfoLessorDialog: (state) => {
      state.updateProfileDialog.openUpdateLessor = true;
    },
    closeUpdateInfoLessorDialog: (state) => {
      state.updateProfileDialog.openUpdateLessor = false;
    },
    openCensorProductDialog: (state, action: PayloadAction<confirmStatus>) => {
      state.censorProductDialog.open = true;
      state.censorProductDialog.type = action.payload;
    },
    closeCensorProductDialog: (state) => {
      state.censorProductDialog.open = false;
      state.censorProductDialog.type = confirmStatus.Approved;
    },
    openRentProductDialog: (state) => {
      state.rentDialog.open = true;
    },
    closeRentProductDialog: (state) => {
      state.rentDialog.open = false;
    },
    openCheckOrderProductDialog: (
      state,
      action: PayloadAction<CheckOrderStatus>
    ) => {
      state.checkOrderProductDialog.open = true;
      state.checkOrderProductDialog.type = action.payload;
    },
    closeCheckOrderProductDialog: (state) => {
      state.checkOrderProductDialog.open = false;
      state.checkOrderProductDialog.type = CheckOrderStatus.Approved;
    },
  },
});

export const {
  openBackdrop,
  closeBackdrop,
  openAddedCartDialog,
  closeAddedCartDialog,
  openQuickViewProductDialog,
  closeQuickViewProductDialog,
  openSearchDialog,
  closeSearchDialog,
  openUpdateAvatarProfileDialog,
  closeUpdateAvatarProfileDialog,
  openUpdateEmailDialog,
  closeUpdateEmailDialog,
  openUpdateFirstNameDialog,
  closeUpdateFirstNameDialog,
  openUpdateLastNameDialog,
  closeUpdateLastNameDialog,
  openUpdateInfoLessorDialog,
  closeUpdateInfoLessorDialog,
  openCensorProductDialog,
  closeCensorProductDialog,
  openRentProductDialog,
  closeRentProductDialog,
  openCheckOrderProductDialog,
  closeCheckOrderProductDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
