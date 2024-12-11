import useToast from "@/hooks/use-toast";
import { getTotalBoxLessor } from "@/services/statistic/api-services";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetBoxLessors() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getBoxLessorsApi = async () => {
    setPending(true);
    try {
      const res = await getTotalBoxLessor();
      if (isTResponseData(res)) {
        return res as TResponseData<API.TBoxLessor[]>;
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
    getBoxLessorsApi,
  };
}
