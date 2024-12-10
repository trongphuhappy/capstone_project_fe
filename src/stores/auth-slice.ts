import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Data {}

export interface InitialState {
  forgotPassword: {
    email: string;
    otp: string;
  };
}

let initialState: InitialState = {
  forgotPassword: {
    email: "",
    otp: "",
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setForgotPasswordEmail: (
      state,
      action: PayloadAction<API.TAuthForgotPassword>
    ) => {
      state.forgotPassword.email = action.payload.email;
    },
    setForgotPasswordOtp: (
      state,
      action: PayloadAction<API.TAuthForgotPassword>
    ) => {
      state.forgotPassword.otp = action.payload.otp;
    },
    resetForgotPasswordOtp: (state) => {
      state.forgotPassword.otp = "";
    },
    resetForgotPasswordEmail: (state) => {
      state.forgotPassword.email = "";
    },
    resetForgotPassword: (state) => {
      state.forgotPassword.email = "";
      state.forgotPassword.otp = "";
    },
  },
});

export const {
  setForgotPasswordEmail,
  setForgotPasswordOtp,
  resetForgotPasswordOtp,
  resetForgotPasswordEmail,
  resetForgotPassword,
} = authSlice.actions;

export default authSlice.reducer;
