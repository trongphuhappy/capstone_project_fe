import useToast from "@/hooks/use-toast";
import { getDashboard } from "@/services/dashboard/api-services";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetDashboard() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getDashboardApi = async (params: REQUEST.TYear) => {
    setPending(true);
    try {
      const res = await getDashboard(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.TDashboardData>;
      } else {
        addToast({
          type: "error",
          description: "Failed to fetch data",
        });
        return null;
      }
    } catch (error) {
      addToast({
        type: "error",
        description: "Failed to fetch data",
      });
      return null;
    } finally {
      setPending(false);
    }
  };

  return {
    isPending,
    getDashboardApi,
  };
}
