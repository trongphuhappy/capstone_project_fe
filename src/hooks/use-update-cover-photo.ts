"use client";

import { useServiceUpdateCoverPhoto } from "@/services/member/services";

export default function useUpdateCoverPhoto() {
  const { mutate, isPending } = useServiceUpdateCoverPhoto();

  const onUpdateCoverPhoto = async (request: REQUEST.TUpdateCoverPhoto) => {
    mutate(request);
  };

  return { onUpdateCoverPhoto, isPending };
}
