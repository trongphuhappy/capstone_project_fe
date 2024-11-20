import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  profile: API.TAuthProfile | null;
}

const initialState: InitialState = { profile: null };

const userProfileSlice = createSlice({
  name: "userProfileSlice",
  initialState: initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<API.TAuthProfile>) => {
      state.profile = action.payload;
    },
    removeInfoLogin: (state) => {
      state.profile = null;
    },
  },
});

export const { loginUser, removeInfoLogin } = userProfileSlice.actions;
export default userProfileSlice.reducer;
