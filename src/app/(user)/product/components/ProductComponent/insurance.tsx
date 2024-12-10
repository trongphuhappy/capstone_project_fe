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

interface InsuranceProps {
  insurance: API.TInsurance;
}

export default function Insurance({ insurance }: InsuranceProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-blue-500 underline">See insurance here</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-montserrat">
        <AlertDialogHeader>
          <AlertDialogTitle>Insurance confirmation</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Here is the insurance image for this product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center">
          <img
            src={insurance?.insuranceImagesUrl}
            alt="Insurance Image"
            className="w-full max-w-xl h-auto object-cover cursor-pointer"
          />
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
