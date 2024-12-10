"use client";

import { useState } from "react";
import useToast from "@/hooks/use-toast";
import { isTResponseData } from "@/utils/compare";
import { getSurcharges } from "@/services/surcharge/api-services";

export default function useGetSurcharges() {
  const { addToast } = useToast();
  const [isPending, setPending] = useState(false);

  const getSurchargesApi = async () => {
    setPending(true);
    try {
      const res = await getSurcharges();
      if (isTResponseData(res)) {
        return res as TResponseData<API.TGetSurcharges>;
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
    getSurchargesApi,
  };
}
