"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar, ChevronsUpDown, Check, X } from "lucide-react";
import { RepeatEvent } from "@/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type WeeklyScheduleCardProps = {
  event: RepeatEvent;
  onUpdate: (eventId: string, field: keyof RepeatEvent, value: any) => void;
  onRemove: (eventId: string) => void;
};

export function WeeklyScheduleCard({
  event,
  onUpdate,
  onRemove,
}: WeeklyScheduleCardProps) {
  const [open, setOpen] = useState(false);

  const toggleDay = (day: number) => {
    const currentDays = event.daysOfWeek || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];

    onUpdate(event.id, "daysOfWeek", newDays);
  };

  const removeDay = (day: number) => {
    const newDays = (event.daysOfWeek || []).filter((d) => d !== day);
    onUpdate(event.id, "daysOfWeek", newDays);
  };

  const DAYS = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  return (
    <Card className="border-dashed">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-4 w-4" />
              <span className="font-medium">Weekly Schedule</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(event.id)}
              className="text-muted-foreground hover:text-destructive h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove schedule</span>
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm font-medium">
              Days of Week
            </Label>
            <div className="flex flex-wrap gap-2">
              {(event.daysOfWeek || []).map((day) => (
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
                  <CommandInput placeholder="Search days..." />
                  <CommandEmpty>No days found.</CommandEmpty>
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
                            (event.daysOfWeek || []).includes(day.value)
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

          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm font-medium">
              Description (Optional)
            </Label>
            <Textarea
              value={event.description || ""}
              onChange={(e) =>
                onUpdate(event.id, "description", e.target.value)
              }
              placeholder="What's on the Agenda 🤔"
              className="w-full dark:text-black"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
