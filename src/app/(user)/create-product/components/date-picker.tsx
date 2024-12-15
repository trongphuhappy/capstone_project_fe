"use client";

import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  type?: "rent" | "return";
  onSelect: (date: Date) => void;
}

export function DatePicker({ date, type, onSelect }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={togglePopover}
        className={cn(
          "w-full flex gap-x-2 h-max py-2 px-3 border-2 border-gray-300 rounded-xl hover:bg-gray-200",
        )}
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </button>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-12 left-0 bg-white border rounded shadow-lg p-4 z-20"
        >
          <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          disabled={(date) => {
            if (type === "rent") {
              return date < new Date();
            }
            return false;
          }}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              const adjustedDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                12
              );
              onSelect(adjustedDate);
            }
          }}
          initialFocus
        />
        </div>
      )}
    </div>
    // <Popover>
    //   <PopoverTrigger asChild>

    //   </PopoverTrigger>
    //   <PopoverContent className="w-auto p-0" align="start">
    //     <Calendar
    //       mode="single"
    //       selected={date ? new Date(date) : undefined}
    //       disabled={(date) => {
    //         if (type === "rent") {
    //           return date < new Date();
    //         }
    //         return false;
    //       }}
    //       onSelect={(selectedDate) => {
    //         if (selectedDate) {
    //           const adjustedDate = new Date(
    //             selectedDate.getFullYear(),
    //             selectedDate.getMonth(),
    //             selectedDate.getDate(),
    //             12
    //           );
    //           onSelect(adjustedDate);
    //         }
    //       }}
    //       initialFocus
    //     />
    //   </PopoverContent>
    // </Popover>
  );
}
