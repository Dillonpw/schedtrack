"use client";

import { useState, useEffect, useRef } from "react";
import type { ScheduleEntry } from "@/types";
import DownloadButton from "@/components/download-data";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Calendar,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScheduleEntryWithName extends ScheduleEntry {
  scheduleName: string;
}

interface CalendarViewProps {
  scheduleEntriesData: ScheduleEntryWithName[];
  visibleSchedules: string[];
  scheduleColors: Record<string, string>;
}

const colorPalette = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-rose-500",
];

function CalendarView({
  scheduleEntriesData,
  visibleSchedules,
  scheduleColors,
}: CalendarViewProps): JSX.Element {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = [];
  const paddingDays = firstDayOfMonth(currentDate);

  for (let i = 0; i < paddingDays; i++) {
    days.push(
      <div
        key={`padding-${i}`}
        className="h-24 rounded-sm border border-muted p-2"
      ></div>,
    );
  }

  for (let i = 1; i <= daysInMonth(currentDate); i++) {
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i,
    );

    const entriesForDay = scheduleEntriesData.filter((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(12, 0, 0, 0);
      dayDate.setUTCHours(12, 0, 0, 0);
      return (
        entryDate.getUTCFullYear() === dayDate.getUTCFullYear() &&
        entryDate.getUTCMonth() === dayDate.getUTCMonth() &&
        entryDate.getUTCDate() === dayDate.getUTCDate() &&
        visibleSchedules.includes(entry.scheduleName) &&
        entry.shift === "On"
      );
    });

    const entriesBySchedule: Record<string, ScheduleEntryWithName[]> = {};
    entriesForDay.forEach((entry) => {
      if (!entriesBySchedule[entry.scheduleName]) {
        entriesBySchedule[entry.scheduleName] = [];
      }
      entriesBySchedule[entry.scheduleName].push(entry);
    });

    days.push(
      <div
        key={i}
        className="group relative h-24 rounded-sm border border-muted p-2 hover:bg-accent hover:text-accent-foreground"
      >
        <div className="mb-1 font-medium">{i}</div>
        <div className="flex max-h-16 flex-wrap gap-1 overflow-hidden">
          {Object.entries(entriesBySchedule).map(([scheduleName, entries]) =>
            entries.slice(0, 4).map((entry, idx) => (
              <Popover key={`${scheduleName}-${idx}`}>
                <PopoverTrigger asChild>
                  <div
                    className={`flex cursor-pointer items-center gap-1 truncate rounded px-1 py-0.5 text-xs ${scheduleColors[scheduleName]}`}
                    title={scheduleName}
                  >
                    <span className="truncate">{scheduleName}</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{scheduleName}</h4>
                      {entry.shift === "On" && entry.title && (
                        <Badge variant="default">{entry.title}</Badge>
                      )}
                    </div>
                    {entry.shift === "On" && entry.description && (
                      <p className="text-sm text-muted-foreground">
                        {entry.description}
                      </p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )),
          )}

          {entriesForDay.length > 4 && (
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer py-0.5 text-center text-xs text-muted-foreground">
                  +{entriesForDay.length - 4} more
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <ScrollArea className="h-72">
                  <div className="space-y-4 p-4">
                    {entriesForDay.map((entry, idx) => (
                      <div
                        key={idx}
                        className="border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{entry.scheduleName}</h4>
                          {entry.shift === "On" && entry.title && (
                            <Badge variant="default">{entry.title}</Badge>
                          )}
                        </div>
                        {entry.shift === "On" && entry.description && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {entry.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>,
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button variant="outline" size="icon" onClick={goToNextMonth}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((day, index) => (
          <div key={index} className="p-2 text-center font-medium">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
}

export default function ClientScheduleView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntryWithName[];
}): JSX.Element {
  const [visibleSchedules, setVisibleSchedules] = useState<string[]>([]);

  const scheduleColorsRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const scheduleNames = Array.from(
      new Set(scheduleEntriesData.map((entry) => entry.scheduleName)),
    );

    if (Object.keys(scheduleColorsRef.current).length === 0) {
      const colors: Record<string, string> = {};
      scheduleNames.forEach((name, index) => {
        colors[name] = colorPalette[index % colorPalette.length];
      });
      scheduleColorsRef.current = colors;
    }

    if (visibleSchedules.length === 0) {
      setVisibleSchedules(scheduleNames);
    }
  }, [scheduleEntriesData]);

  const toggleSchedule = (scheduleName: string) => {
    setVisibleSchedules((prev) =>
      prev.includes(scheduleName)
        ? prev.filter((name) => name !== scheduleName)
        : [...prev, scheduleName],
    );
  };

  const toggleAllSchedules = (checked: boolean) => {
    const scheduleNames = Array.from(
      new Set(scheduleEntriesData.map((entry) => entry.scheduleName)),
    );
    setVisibleSchedules(checked ? scheduleNames : []);
  };

  if (scheduleEntriesData.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Card className="w-full max-w-md border-2 border-muted p-6 text-center shadow-md">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <Calendar className="h-12 w-12 text-muted-foreground opacity-70" />
            <p className="text-lg font-medium">No schedule available</p>
            <p className="text-sm text-muted-foreground">
              Create a new schedule to get started
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const scheduleNames = Array.from(
    new Set(scheduleEntriesData.map((entry) => entry.scheduleName)),
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mx-20 lg:mx-40">
        <h1 className="text-2xl font-bold">Your Schedule</h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white text-foreground"
              >
                <Filter className="h-4 w-4" />
                <span>Schedules</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-card">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="all-schedules"
                    checked={visibleSchedules.length === scheduleNames.length}
                    onCheckedChange={(checked) =>
                      toggleAllSchedules(checked === true)
                    }
                  />
                  <label
                    htmlFor="all-schedules"
                    className="cursor-pointer text-sm font-medium leading-none text-foreground"
                  >
                    All Schedules
                  </label>
                </div>
                <div className="border-t border-border pt-3">
                  {scheduleNames.map((name) => (
                    <div
                      key={name}
                      className="flex items-center space-x-2 py-1"
                    >
                      <Checkbox
                        id={`schedule-${name}`}
                        checked={visibleSchedules.includes(name)}
                        onCheckedChange={() => toggleSchedule(name)}
                      />
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-3 w-3 rounded-full ${scheduleColorsRef.current[name]}`}
                        />
                        <label
                          htmlFor={`schedule-${name}`}
                          className="cursor-pointer text-sm font-medium leading-none text-foreground"
                        >
                          {name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <DownloadButton
            scheduleEntriesData={scheduleEntriesData.filter((entry) =>
              visibleSchedules.includes(entry.scheduleName),
            )}
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        {scheduleNames.map(
          (name) =>
            visibleSchedules.includes(name) && (
              <div
                key={name}
                className="group flex cursor-pointer items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm transition-all hover:border-primary hover:text-primary"
                onClick={() => toggleSchedule(name)}
              >
                <div
                  className={`h-2 w-2 rounded-full ${scheduleColorsRef.current[name]}`}
                />
                {name}
                <X className="ml-1 h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
              </div>
            ),
        )}
      </div>

      <CalendarView
        scheduleEntriesData={scheduleEntriesData}
        visibleSchedules={visibleSchedules}
        scheduleColors={scheduleColorsRef.current}
      />
    </div>
  );
}
