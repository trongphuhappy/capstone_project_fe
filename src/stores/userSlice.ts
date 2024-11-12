import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  profile: API.TAuthProfile | null;
}

const initialState: InitialState = { profile: null };

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<API.TAuthProfile>) => {
      state.profile = action.payload;
    },
    removeProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { addProfile, removeProfile } = userSlice.actions;

export default userSlice.reducer;
