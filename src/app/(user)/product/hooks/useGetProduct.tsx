import useToast from "@/hooks/use-toast";
import { getProductById, getProducts } from "@/services/product/api-services";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetProductDetail() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getProductDetail = async (params: REQUEST.TGetProductById) => {
    setPending(true);
    try {
      const res = await getProductById(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.TProduct>;
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
    getProductDetail,
  };
}
