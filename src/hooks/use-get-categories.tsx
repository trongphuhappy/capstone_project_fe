"use client";

import { useState } from "react";
import useToast from "@/hooks/use-toast";
import { getCategories } from "@/services/product-categories/api-services";
import { isTResponseData } from "@/utils/compare";

export default function useGetCategories() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getCategoriesApi = async (params: REQUEST.ICategories) => {
    setPending(true);
    try {
      const res = await getCategories(params);
      if (isTResponseData(res)) {
        return res as TResponseData<API.TGetCategories>;
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
    getCategoriesApi,
  };
}
