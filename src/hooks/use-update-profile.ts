import { useServiceUpdateProfile } from "@/services/member/services";

export default function useUpdateProfile() {
  const { mutate, isPending } = useServiceUpdateProfile();

  const onUpdateProfile = async (request: REQUEST.TUpdateProfile) => {
    mutate(request);
  };

  return { onUpdateProfile, isPending };
}
