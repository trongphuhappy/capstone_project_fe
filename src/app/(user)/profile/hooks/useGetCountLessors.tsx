import useToast from "@/hooks/use-toast";
import { getCountOrderByLessor } from "@/services/statistic/api-services";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetCountLessors() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getCountLessorApi = async () => {
    setPending(true);
    try {
      const res = await getCountOrderByLessor();
      if (isTResponseData(res)) {
        return res as TResponseData<API.TOrderStatistic[]>;
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
    getCountLessorApi,
  };
}
