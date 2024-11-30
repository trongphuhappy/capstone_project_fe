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
  onSelect: (date: Date) => void;
}

export function DatePicker({ date, onSelect }: DatePickerProps) {
  const localDate = date
    ? new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })) // Chuyển đổi sang UTC+7 (Asia/Bangkok)
    : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border border-gray-400 focus-visible:ring-0 focus-visible:none py-5",
            !localDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {localDate ? format(localDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={localDate}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              const utcDate = new Date(
                selectedDate.toLocaleString("en-US", {
                  timeZone: "Asia/Ho_Chi_Minh",
                })
              );
              onSelect(utcDate);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
