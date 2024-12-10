import { useState } from "react";
import useToast from "@/hooks/use-toast";
import { getAllOrders } from "@/services/order/api-services";
import { isTResponseData } from "@/utils/compare";

export default function useGetOrders() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getAllOrdersApi = async (params: REQUEST.TGetProductsFilter) => {
    setPending(true);
    try {
      const res = await getAllOrders(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.TGetAllOrders>;
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
    getAllOrdersApi,
  };
}
