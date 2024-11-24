import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  profile: API.TProfile | null;
}

const initialState: InitialState = { profile: null };

const userProfileSlice = createSlice({
  name: "userProfileSlice",
  initialState: initialState,
  reducers: {
    addProfileUser: (state, action: PayloadAction<API.TProfile>) => {
      state.profile = action.payload;
    },
    removeProfileUser: (state) => {
      state.profile = null;
    },
    setAvatarImage: (state, action: PayloadAction<API.TImageProfile>) => {
      if (state.profile) {
        state.profile.cropAvatarId = action.payload.cropAvatarId;
        state.profile.cropAvatarUrl = action.payload.cropAvatarUrl;
        state.profile.fullAvatarId = action.payload.fullAvatarId;
        state.profile.fullAvatarUrl = action.payload.fullAvatarUrl;
      }
    },
    setCoverPhotoImage: (state, action: PayloadAction<API.TImageProfile>) => {
      if (state.profile) {
        state.profile.cropCoverPhotoId = action.payload.cropCoverPhotoId;
        state.profile.cropCoverPhotoUrl = action.payload.cropCoverPhotoUrl;
        state.profile.fullCoverPhotoId = action.payload.fullCoverPhotoId;
        state.profile.fullCoverPhotoUrl = action.payload.fullCoverPhotoUrl;
      }
    },
    updateProfile: (state, action: PayloadAction<API.TProfile>) => {
      if (state.profile) {
        if (action.payload.biography !== null)
          state.profile.biography = action.payload.biography;
        if (action.payload.firstName !== null)
          state.profile.firstName = action.payload.firstName;
        if (action.payload.lastName !== null)
          state.profile.lastName = action.payload.lastName;
        if (action.payload.phoneNumber !== null)
          state.profile.phoneNumber = action.payload.phoneNumber;
      }
    },
  },
});

export const {
  addProfileUser,
  removeProfileUser,
  setAvatarImage,
  setCoverPhotoImage,
  updateProfile,
} = userProfileSlice.actions;
export default userProfileSlice.reducer;
