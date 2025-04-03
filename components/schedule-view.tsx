"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import type { ScheduleEntry } from "@/types";
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
import { EditScheduleEntryDialog } from "@/components/edit-schedule-entry-dialog";
import { CalendarViewProps, ScheduleEntryWithName } from "@/types";

const colorPalette = [
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-amber-600",
  "bg-pink-600",
  "bg-teal-600",
  "bg-red-600",
  "bg-indigo-600",
  "bg-emerald-600",
  "bg-rose-600",
];

function CalendarView({
  scheduleEntriesData,
  visibleSchedules,
  scheduleColors,
}: CalendarViewProps): React.ReactNode {
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

  const getPreviousMonthDays = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 0).getDate();
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = [];
  const paddingDays = firstDayOfMonth(currentDate);
  const previousMonthDays = getPreviousMonthDays(currentDate);
  const daysInCurrentMonth = daysInMonth(currentDate);

  for (let i = 0; i < paddingDays; i++) {
    const dayNumber = previousMonthDays - paddingDays + i + 1;
    days.push(
      <div
        key={`padding-${i}`}
        className="border-border dark:outline-border relative aspect-square rounded-sm border-2 p-1 sm:p-2 dark:outline-1"
      >
        <div className="text-muted-foreground/50 text-sm font-medium sm:text-base">
          {dayNumber}
        </div>
      </div>,
    );
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
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
        className="group border-border dark:outline-border relative aspect-square rounded-sm border-2 p-1 sm:p-2 dark:outline-1"
      >
        <div className="mb-1 text-sm font-medium sm:text-base">{i}</div>
        {entriesForDay.length >= 3 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent absolute top-1 right-1 h-6 w-6 p-0"
              >
                <span className="text-xs">+{entriesForDay.length}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <Suspense
                fallback={
                  <div className="p-4 text-center">Loading entries...</div>
                }
              >
                <ScrollArea className="h-72">
                  <div className="space-y-4 p-4">
                    {entriesForDay.map((entry, idx) => (
                      <div
                        key={idx}
                        className="border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="relative">
                          <h4 className="max-w-[180px] truncate pr-8 font-medium">
                            {entry.scheduleName}
                          </h4>
                          <div className="absolute top-0 right-0">
                            <EditScheduleEntryDialog
                              scheduleId={entry.scheduleId}
                              entry={{
                                id: entry.id,
                                shift: (entry.overrides?.shift ||
                                  entry.shift) as "On" | "Off",
                                note: entry.overrides?.note ?? entry.note,
                                description:
                                  entry.overrides?.description ??
                                  entry.description,
                                repeatEvents: entry.repeatEvents,
                              }}
                            />
                          </div>
                          {(entry.overrides?.note ?? entry.note) && (
                            <div className="mt-1">
                              <Badge
                                variant="outline"
                                className="text-xs whitespace-nowrap"
                              >
                                {entry.overrides?.note ?? entry.note}
                              </Badge>
                            </div>
                          )}
                        </div>
                        {(entry.overrides?.description ??
                          entry.description) && (
                          <p className="text-muted-foreground mt-2 text-sm">
                            {entry.overrides?.description ?? entry.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Suspense>
            </PopoverContent>
          </Popover>
        )}
        <Suspense
          fallback={
            <div className="flex h-[calc(100%-2rem)] items-center justify-center">
              Loading...
            </div>
          }
        >
          <ScrollArea className="h-[calc(100%-2rem)]">
            <div className="flex flex-wrap gap-1">
              {Object.entries(entriesBySchedule).map(
                ([scheduleName, entries]) =>
                  entries.slice(0, 3).map((entry, idx) => (
                    <Popover key={`${scheduleName}-${idx}`}>
                      <PopoverTrigger asChild>
                        <div className="flex items-center">
                          <div
                            className={`h-3 w-3 cursor-pointer rounded-full border border-current/30 lg:hidden ${scheduleColors[scheduleName]} text-[${scheduleColors[scheduleName]}] transition-colors hover:opacity-60`}
                            title={scheduleName}
                          />
                          <Badge
                            className={`hidden cursor-pointer text-center text-[10px] tracking-tighter lg:inline-flex ${scheduleColors[scheduleName]} hover:bg-opacity-70 max-w-[120px] truncate transition-colors`}
                          >
                            {scheduleName}
                          </Badge>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 p-4">
                        <div className="space-y-4">
                          <div className="flex flex-col gap-2">
                            <div className="relative">
                              <h4 className="max-w-[180px] truncate pr-8 font-medium">
                                {scheduleName}
                              </h4>
                              <div className="absolute top-0 right-0">
                                <EditScheduleEntryDialog
                                  scheduleId={entry.scheduleId}
                                  entry={{
                                    id: entry.id,
                                    shift: (entry.overrides?.shift ||
                                      entry.shift) as "On" | "Off",
                                    note: entry.overrides?.note ?? entry.note,
                                    description:
                                      entry.overrides?.description ??
                                      entry.description,
                                    repeatEvents: entry.repeatEvents,
                                  }}
                                />
                              </div>
                              {(entry.overrides?.note ?? entry.note) && (
                                <div className="mt-1">
                                  <Badge
                                    variant="outline"
                                    className="text-xs whitespace-nowrap"
                                  >
                                    {entry.overrides?.note ?? entry.note}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            {(entry.overrides?.description ??
                              entry.description) && (
                              <p className="text-muted-foreground/80 text-sm">
                                {entry.overrides?.description ??
                                  entry.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )),
              )}
            </div>
          </ScrollArea>
        </Suspense>
      </div>,
    );
  }

  const totalDays = paddingDays + daysInCurrentMonth;
  const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

  for (let i = 1; i <= remainingDays; i++) {
    days.push(
      <div
        key={`next-${i}`}
        className="border-border dark:outline-border relative aspect-square rounded-sm border-2 p-1 sm:p-2 dark:outline-1"
      >
        <div className="text-muted-foreground/50 text-sm font-medium sm:text-base">
          {i}
        </div>
      </div>,
    );
  }

  return (
    <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-6">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold sm:text-xl">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button variant="outline" size="icon" onClick={goToNextMonth}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {dayLabels.map((day, index) => (
            <div
              key={index}
              className="p-1 text-center text-xs font-medium sm:p-2 sm:text-sm"
            >
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    </div>
  );
}

function getConsistentColors(
  scheduleNames: string[],
  existingColors: Record<string, string> = {},
): Record<string, string> {
  const colors = { ...existingColors };
  const availableColors = [...colorPalette];

  const usedColors = Object.values(colors);
  const unusedColors = availableColors.filter(
    (color) => !usedColors.includes(color),
  );

  scheduleNames.forEach((name) => {
    if (!colors[name]) {
      if (unusedColors.length > 0) {
        const randomIndex = Math.floor(Math.random() * unusedColors.length);
        colors[name] = unusedColors[randomIndex];
        unusedColors.splice(randomIndex, 1);
      } else {
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        colors[name] = availableColors[randomIndex];
      }
    }
  });

  try {
    localStorage.setItem("scheduleColors", JSON.stringify(colors));
  } catch (error) {
    console.error("Error saving colors:", error);
  }

  return colors;
}

export default function ClientScheduleView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntryWithName[];
}): React.ReactNode {
  const [visibleSchedules, setVisibleSchedules] = useState<string[]>([]);

  const scheduleColorsRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const scheduleNames = Array.from(
      new Set(scheduleEntriesData.map((entry) => entry.scheduleName)),
    );

    if (Object.keys(scheduleColorsRef.current).length === 0) {
      try {
        const savedColors = localStorage.getItem("scheduleColors");
        if (savedColors) {
          const parsedColors = JSON.parse(savedColors);
          scheduleColorsRef.current = parsedColors;
        }
      } catch (error) {
        console.error("Error loading saved colors:", error);
      }
    }

    scheduleColorsRef.current = getConsistentColors(
      scheduleNames,
      scheduleColorsRef.current,
    );

    if (visibleSchedules.length === 0) {
      setVisibleSchedules(scheduleNames);
    }
  }, [scheduleEntriesData, visibleSchedules.length]);

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
        <Card className="border-muted w-full max-w-md border-2 p-6 text-center shadow-md">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <Calendar className="text-muted-foreground h-12 w-12 opacity-70" />
            <p className="text-lg font-medium">No schedule available</p>
            <p className="text-muted-foreground text-sm">
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
    <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-6">
      <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between md:mx-20 lg:mx-40">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <Suspense
            fallback={
              <div className="bg-muted h-10 w-32 animate-pulse rounded-md"></div>
            }
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="text-foreground flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  <Filter className="h-4 w-4" />
                  <span>Schedules</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-card w-56">
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
                      className="text-foreground cursor-pointer text-sm leading-none font-medium"
                    >
                      All Schedules
                    </label>
                  </div>
                  <div className="border-border border-t pt-3">
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
                            className="text-foreground max-w-[150px] cursor-pointer truncate text-sm leading-none font-medium"
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
          </Suspense>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex h-10 items-center gap-2">
            <div className="bg-muted h-6 w-24 animate-pulse rounded-full"></div>
            <div className="bg-muted h-6 w-24 animate-pulse rounded-full"></div>
          </div>
        }
      >
        <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
          {scheduleNames.map(
            (name) =>
              visibleSchedules.includes(name) && (
                <div
                  key={name}
                  className="group bg-card flex cursor-default items-center gap-2 rounded-full border px-2 py-1 text-xs transition-all select-none hover:shadow-md sm:px-3 sm:py-1.5 sm:text-sm"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${scheduleColorsRef.current[name]}`}
                  />
                  {name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent ml-1 h-3 w-3 p-3 opacity-50 transition-opacity group-hover:opacity-100 hover:text-red-700"
                    onClick={() => toggleSchedule(name)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ),
          )}
        </div>
      </Suspense>

      <Suspense
        fallback={
          <div className="grid animate-pulse grid-cols-7 gap-0.5 sm:gap-1">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="p-1 text-center">
                  <div className="bg-muted mx-auto h-4 w-8 rounded"></div>
                </div>
              ))}
            {Array(35)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-muted aspect-square rounded-sm"
                ></div>
              ))}
          </div>
        }
      >
        <CalendarView
          scheduleEntriesData={scheduleEntriesData}
          visibleSchedules={visibleSchedules}
          scheduleColors={scheduleColorsRef.current}
        />
      </Suspense>
    </div>
  );
}
