import useToast from "@/hooks/use-toast";
import { getProducts } from "@/services/product/api-services";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetProducts() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getProductsApi = async (params: REQUEST.TGetProductsFilter) => {
    setPending(true);
    try {
      const res = await getProducts(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.TGetProducts>;
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
    getProductsApi,
  };
}
