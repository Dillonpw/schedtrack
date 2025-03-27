"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronsUpDown, Check } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { DaySelectorProps } from "@/types";



const DAYS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export function DaySelector({ selectedDays, onChange }: DaySelectorProps) {
  const [open, setOpen] = useState(false);

  const toggleDay = (day: number) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    onChange(newDays);
  };

  const removeDay = (day: number) => {
    const newDays = selectedDays.filter((d) => d !== day);
    onChange(newDays);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedDays.map((day) => (
          <Badge
            key={day}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {DAYS.find((d) => d.value === day)?.label}
            <button
              onClick={() => removeDay(day)}
              className="hover:bg-muted ml-1 rounded-full"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select days
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandGroup>
              {DAYS.map((day) => (
                <CommandItem
                  key={day.value}
                  onSelect={() => {
                    toggleDay(day.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedDays.includes(day.value)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {day.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
