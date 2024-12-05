import useToast from "@/hooks/use-toast";
import { getFeedbacks } from "@/services/feedback/api-services";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetFeedbacks() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getFeedbackApi = async (params: REQUEST.TGetFeedbacks) => {
    setPending(true);
    try {
      const res = await getFeedbacks(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.TGetFeedbacks>;
      } else {
        addToast({
          type: "error",
          description: "Failed to fetch applications",
        });
        return null;
      }
    } catch (error) {
      return null;
    } finally {
      setPending(false);
    }
  };

  return {
    isPending,
    getFeedbackApi,
  };
}
