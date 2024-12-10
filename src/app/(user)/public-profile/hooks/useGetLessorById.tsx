import useToast from "@/hooks/use-toast";
import {
  getInfoLessor,
  getInfoLessorById,
  getProfile,
} from "@/services/member/api-services";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { addInfoLessor, removeInfoLessor } from "@/stores/user-profile-slice";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetLessorById() {
  const { addToast } = useToast();
  const profileState = useAppSelector((state) => state.userProfileslice);
  const dispatch = useAppDispatch();
  const [isPendingLessor, setPendingLessor] = useState(false);

  const getLessorByIdApi = async (params: REQUEST.TGetInfoLessorById) => {
    setPendingLessor(true);
    try {
      const res = await getInfoLessorById(params);
      if (isTResponseData(res)) {
        dispatch(addInfoLessor(res.value.data));
      } else {
        dispatch(removeInfoLessor());
        return null;
      }
    } catch (error) {
      addToast({
        type: "error",
        description: "An error occurred while fetching applications",
      });
      return null;
    } finally {
      setPendingLessor(false);
    }
  };
  return { getLessorByIdApi, isPendingLessor, lessorState: profileState.lessor };
}
