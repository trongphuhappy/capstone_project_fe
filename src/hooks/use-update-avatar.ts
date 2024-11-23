"use client";

import { useServiceUpdateAvatar } from "@/services/member/services";
import useUpdateProfileDialog from "@/hooks/use-update-profile-dialog";

export default function useUpdateAvatar() {
  const { mutate, isPending, isSuccess } = useServiceUpdateAvatar();
  const { avatarOpen, onCloseUpdateAvatarProfile } = useUpdateProfileDialog();

  const onUpdateAvatar = async (request: REQUEST.TUpdateAvatar) => {
    mutate(request, {
      onSuccess: () => {
        onCloseUpdateAvatarProfile();
      },
      onError: () => {
        onCloseUpdateAvatarProfile();
      },
    });
  };

  return { onUpdateAvatar, isSuccess };
}
