"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatCurrencyVND } from "@/utils/format-currency";
import { format } from "path";

interface SurchargeProps {
  surcharges: API.TProductSurcharge[];
}

export default function Surcharge({ surcharges }: SurchargeProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-blue-500 underline">See surcharge here</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Surcharge Details</AlertDialogTitle>
          <AlertDialogDescription>
            {surcharges?.length > 0
              ? "Here are the surcharge details for this product."
              : "No surcharge details for this product."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2 mt-4">
          {surcharges?.map((surcharge, index) => (
            <div key={index} className="flex gap-4">
              <span className="font-semibold">{surcharge?.surchargeName}:</span>
              <span className="text-gray-700">
                {formatCurrencyVND(surcharge?.price | 0)}
              </span>
            </div>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
