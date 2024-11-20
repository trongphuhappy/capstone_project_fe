import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  profile: API.TAuthProfile | null;
}

const initialState: InitialState = { profile: null };

const userSlice = createSlice({
  name: "userSlice",
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

export const { loginUser, removeInfoLogin } = userSlice.actions;
export default userSlice.reducer;
