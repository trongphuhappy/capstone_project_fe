import useToast from "@/hooks/use-toast";
import { checkLessorExistLessorByAccountId } from "@/services/member/api-services";
import { closeBackdrop, openBackdrop } from "@/stores/stateSlice";
import { useAppDispatch } from "@/stores/store";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useCheckExsitLessor() {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Boolean>(false);

  const checkExistLessorApi = async () => {
    dispatch(openBackdrop());
    try {
      const res = await checkLessorExistLessorByAccountId();
      if (isTResponseData(res)) {
        setData(res.value.data);
      } else {
        setData(false);
        return null;
      }
    } catch (error) {
      setData(false);
      addToast({
        type: "error",
        description: "An error occurred while fetching applications",
      });
      return null;
    } finally {
      dispatch(closeBackdrop());
    }
  };
  return { checkExistLessorApi, data };
}
