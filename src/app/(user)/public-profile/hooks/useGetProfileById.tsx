import useToast from "@/hooks/use-toast";
import { getProfile, getProfileById } from "@/services/member/api-services";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { addProfileUser } from "@/stores/user-profile-slice";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetProfileById() {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  const [isPending, setPending] = useState(false);

  const getProfileByIdApi = async (params: REQUEST.TGetProfileById) => {
    setPending(true);
    try {
      const res = await getProfileById(params);
      if (isTResponseData(res)) {
        dispatch(addProfileUser({ id: params.accountId, ...res.value.data }));
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
  return { getProfileByIdApi, isPending };
}
