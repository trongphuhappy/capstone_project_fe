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
    setAvatarProfile: (state, action: PayloadAction<API.TImageProfile>) => {
      if (state.profile) {
        state.profile.cropAvatarLink = action.payload.cropAvatarUrl;
        state.profile.fullAvatarLink = action.payload.fullAvatarUrl;
      }
    },
  },
});

export const { loginUser, removeInfoLogin, setAvatarProfile } = userSlice.actions;
export default userSlice.reducer;
