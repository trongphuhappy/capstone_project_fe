"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

interface SurchargeFormProps {
  surcharges: API.Surcharge[];
  onSubmit: (data: REQUEST.TSurcharge[]) => void;
}

export default function SurchargeForm({
  surcharges,
  onSubmit,
}: SurchargeFormProps) {
  const [selectedSurcharges, setSelectedSurcharges] = useState<{
    [key: string]: number | "";
  }>({});

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedSurcharges((prev) =>
      checked
        ? { ...prev, [id]: "" }
        : Object.fromEntries(Object.entries(prev).filter(([key]) => key !== id))
    );
  };

  const handleInputChange = (id: string, value: string) => {
    setSelectedSurcharges((prev) => ({
      ...prev,
      [id]: value === "" ? "" : Number(value),
    }));
  };

  const handleSubmit = () => {
    const formattedData = Object.entries(selectedSurcharges)
      .filter(([, value]) => value !== "")
      .map(
        ([id, value]) =>
          ({
            surchargeId: id,
            price: Number(value),
          } as REQUEST.TSurcharge)
      );

    onSubmit(formattedData);
  };

  const renderSurcharges = () => {
    return surcharges?.map((item, index) => {
      const isChecked = selectedSurcharges[item.id] !== undefined;
      return (
        <div key={index}>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`surcharge-${item.id}`}
              checked={isChecked}
              onCheckedChange={(checked) =>
                handleCheckboxChange(item.id, checked as boolean)
              }
            />
            <label
              htmlFor={`surcharge-${item.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.name}
            </label>
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-500">
                    <span className="text-white text-[12px]">?</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                  <span className="text-[#00000d] text-xs font-montserrat font-normal">
                    {item.description}
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isChecked && (
            <Input
              type="number"
              className="mt-4 border border-gray-400 focus-visible:ring-0 focus-visible:none py-5"
              autoComplete="off"
              placeholder={`${item.name}`}
              value={selectedSurcharges[item.id]}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
          )}
        </div>
      );
    });
  };

  // useEffect(() => {
  //   if (submit === true) handleSubmit();
  // }, [submit]);

  return (
    <div className="font-montserrat flex flex-col gap-y-5">
      {renderSurcharges()}
    </div>
  );
}
