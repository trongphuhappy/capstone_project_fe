"use client";

import * as React from "react";
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border border-gray-400 focus-visible:ring-0 focus-visible:none py-5",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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
      </PopoverContent>
    </Popover>
  );
}
