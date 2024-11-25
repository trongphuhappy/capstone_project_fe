import useToast from "@/hooks/use-toast";
import { getProfile } from "@/services/member/api-services";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { addProfileUser } from "@/stores/userProfileSlice";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetProfile() {
  const { addToast } = useToast();
  const profileState = useAppSelector((state) => state.userProfileslice);
  const dispatch = useAppDispatch();
  const [isPending, setPending] = useState(false);

  const getProfileApi = async () => {
    setPending(true);
    try {
      const res = await getProfile();
      if (isTResponseData(res)) {
        dispatch(addProfileUser(res.value.data));
      } else {
        addToast({
          type: "error",
          description: "Failed to fetch applications",
        });
        return null;
      }
    } catch (error) {
      addToast({
        type: "error",
        description: "An error occurred while fetching applications",
      });
      return null;
    } finally {
      setPending(false);
    }
  };
  return { getProfileApi, isPending, profileState };
}
