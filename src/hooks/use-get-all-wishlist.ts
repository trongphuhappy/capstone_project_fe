import useToast from "@/hooks/use-toast";
import { getAllWishlist } from "@/services/product/api-services";
import { isTResponseData } from "@/utils/compare";
import { useState } from "react";

export default function useGetAllWishlist() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getAllWishListApi = async (params: REQUEST.TGetWishlist) => {
    setPending(true);
    try {
      const res = await getAllWishlist(params);
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
    getAllWishListApi,
  };
}
