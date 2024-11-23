import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAvatarProfile } from "@/stores/userSlice";
import { store } from "@/stores/store";

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
        state.profile.biography = action.payload.biography;
        state.profile.firstName = action.payload.firstName;
        state.profile.lastName = action.payload.lastName;
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
