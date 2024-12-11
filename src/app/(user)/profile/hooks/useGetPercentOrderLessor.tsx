import useToast from "@/hooks/use-toast";
import { getPercentOrderByLessor } from "@/services/statistic/api-services";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetPercentOrderLessor() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getPercentOrderByLessorApi = async () => {
    setPending(true);
    try {
      const res = await getPercentOrderByLessor();
      if (isTResponseData(res)) {
        return res as TResponseData<API.TOrderPercent>;
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
    getPercentOrderByLessorApi,
  };
}
