import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  staff: {
    openSidebar: boolean;
  };
  admin: {
    openSidebar: boolean;
  };
  message: {
    openMessageUser: boolean;
  };
}

let initialState: InitialState = {
  staff: {
    openSidebar: false,
  },
  admin: {
    openSidebar: false,
  },
  message: {
    openMessageUser: false,
  },
};

const differenceSlice = createSlice({
  name: "differenceSlice",
  initialState: initialState,
  reducers: {
    openSidebar: (state) => {
      state.staff.openSidebar = true;
    },
    closeSidebar: (state) => {
      state.staff.openSidebar = false;
    },
    openAdminSidebar: (state) => {
      state.admin.openSidebar = true;
    },
    closeAdminSidebar: (state) => {
      state.admin.openSidebar = false;
    },
    openMessageUser: (state) => {
      state.message.openMessageUser = true;
    },
    closeMessageUser: (state) => {
      state.message.openMessageUser = false;
    },
  },
});

export const { openSidebar, closeSidebar, openAdminSidebar, closeAdminSidebar, openMessageUser, closeMessageUser } =
  differenceSlice.actions;

export default differenceSlice.reducer;
