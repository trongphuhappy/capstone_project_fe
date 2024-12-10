"use client";

import { useServiceUpdateAvatar } from "@/services/member/services";
import useUpdateAvatarDialog from "@/hooks/use-update-avatar-dialog";

export default function useUpdateAvatar() {
  const { mutate, isPending, isSuccess } = useServiceUpdateAvatar();
  const { avatarOpen, onCloseUpdateAvatarProfile } = useUpdateAvatarDialog();

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
