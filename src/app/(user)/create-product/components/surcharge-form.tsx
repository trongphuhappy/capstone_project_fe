"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

interface SurchargeFormProps {
  surcharges: API.TSurcharge[];
  selectedSurcharges: { [key: string]: number | "" };
  setSelectedSurcharges: (
    update: (prev: { [key: string]: number | "" }) => {
      [key: string]: number | "";
    }
  ) => void;
}

export default function SurchargeForm({
  surcharges,
  selectedSurcharges,
  setSelectedSurcharges,
}: SurchargeFormProps) {
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
            <div className="mt-4 relative pr-7 border border-gray-400 rounded-md">
              <Input
                type="number"
                className="border-none focus-visible:ring-0 focus-visible:none py-5 bg-transparent"
                autoComplete="off"
                placeholder={`${item.name}`}
                value={selectedSurcharges[item.id]}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
              />

              <span className="absolute top-1/2 -translate-y-1/2 right-[1%]">
                Vnd
              </span>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="font-montserrat flex flex-col gap-y-5">
      {renderSurcharges()}
    </div>
  );
}
