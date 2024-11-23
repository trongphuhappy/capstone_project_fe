import { useMutation } from "@tanstack/react-query";
import { updateAvatar, updateCoverPhoto, updateProfile } from "@/services/member/api-services";
import useToast from "@/hooks/use-toast";
import { useAppDispatch } from "@/stores/store";
import { setAvatarImage, setCoverPhotoImage, updateProfile as storeUpdateProfile } from "@/stores/userProfileSlice";
import { setAvatarProfile } from "@/stores/userSlice";
import { closeBackdrop } from "@/stores/stateSlice";

export const useServiceUpdateAvatar = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<
    TResponseData<API.TImageProfile>,
    TMeta,
    REQUEST.TUpdateAvatar
  >({
    mutationFn: async (data: REQUEST.TUpdateAvatar) => {
      const formData = new FormData();
      formData.append("CropAvatar", data.cropAvatar);
      formData.append("FullAvatar", data.fullAvatar);
      return await updateAvatar(formData);
    },
    onSuccess: (data) => {
      dispatch(closeBackdrop());
      dispatch(setAvatarImage(data.value.data));
      dispatch(setAvatarProfile(data.value.data));
      addToast({
        type: "success",
        description: "Update avatar successfully",
        duration: 3500,
      });
    },
    onError: (error) => {
      dispatch(closeBackdrop());
    },
  });
};

export const useServiceUpdateCoverPhoto = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<
    TResponseData<API.TImageProfile>,
    TMeta,
    REQUEST.TUpdateCoverPhoto
  >({
    mutationFn: async (data: REQUEST.TUpdateCoverPhoto) => {
      const formData = new FormData();
      formData.append("CropCoverPhoto", data.cropCoverPhoto);
      formData.append("FullCoverPhoto", data.fullCoverPhoto);
      return await updateCoverPhoto(formData);
    },
    onSuccess: (data) => {
      dispatch(setCoverPhotoImage(data.value.data));
      addToast({
        type: "success",
        description: "Update cover photo successfully",
        duration: 3500,
      });
    },
    onError: (error) => {},
  });
};

export const useServiceUpdateProfile = () => {
  const dispatch = useAppDispatch();
  return useMutation<TResponseData<API.TProfile>, TMeta, REQUEST.TUpdateProfile>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      dispatch(storeUpdateProfile(data.value.data));
    },
  });
};
