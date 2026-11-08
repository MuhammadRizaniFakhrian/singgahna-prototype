"use client"

import * as React from "react"
import moment from 'moment'
import { Calendar as CalendarIcon } from "lucide-react"
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { Button } from "@/components/atomics/button"
import { Calendar } from "@/components/atomics/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atomics/popover"

interface DatePickerDemoProps {
  placeholder: string;
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  listingId: number;
  startDate?: Date; // opsional, hanya untuk end date
}

export function DatePickerDemo({
  placeholder,
  date,
  setDate,
  listingId,
  startDate,
}: DatePickerDemoProps) {

  const today = new Date();

  // ✨ minSelectableDate hanya untuk end date
  const minSelectableDate = startDate
    ? new Date(startDate.getTime() + 24*60*60*1000) // startDate + 1 hari
    : today;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    // hanya untuk end date
    if (startDate && selectedDate <= startDate) {
      const nextDay = new Date(startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setDate(nextDay);
    } else {
      setDate(selectedDate);
    }
  };

  // ✨ build disabled array
  const disabledArray = [
    { before: minSelectableDate } // start date bebas, end date tidak bisa pilih sebelum startDate + 1
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"third"}
          className={cn(
            "w-full justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <div className="flex gap-4">
            <Image src="/icons/calendar.svg" alt="icon" height={24} width={24} />
            {date ? moment(date).format("MMMM DD, YYYY") : <span>{placeholder}</span>}
          </div>
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabledArray}
          initialFocus
          className="w-full min-w-[358px] rounded-lg bg-white"
        />
      </PopoverContent>
    </Popover>
  );
}
