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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrencyVND } from "@/utils/format-currency";

interface SurchargeProps {
  surcharges: API.TProductSurcharge[];
}

export default function Surcharge({ surcharges }: SurchargeProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-blue-500 underline">See surcharge here</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-montserrat">
        <AlertDialogHeader>
          <AlertDialogTitle>Surcharge Details</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {surcharges?.length > 0
              ? "Here are the surcharge details for this product."
              : "No surcharge details for this product."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          {surcharges?.map((surcharge, index) => (
            <div key={index} className="flex gap-4">
              <span className="font-semibold text-base">
                {surcharge?.surchargeName}
              </span>
              <span className="text-gray-700 text-base">
                {formatCurrencyVND(surcharge?.price | 0)}
              </span>
            </div>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction className="bg-[#0056a3] hover:bg-[#0056a#]">
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
