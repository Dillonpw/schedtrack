"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
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
import { DayPicker, DayProps } from "react-day-picker";
import { cn } from "@/lib/utils";

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

  const getEntriesForDay = (day: Date) => {
    return scheduleEntriesData.filter((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(12, 0, 0, 0);
      const dayDate = new Date(day);
      dayDate.setUTCHours(12, 0, 0, 0);
      return (
        entryDate.getUTCFullYear() === dayDate.getUTCFullYear() &&
        entryDate.getUTCMonth() === dayDate.getUTCMonth() &&
        entryDate.getUTCDate() === dayDate.getUTCDate() &&
        visibleSchedules.includes(entry.scheduleName) &&
        entry.shift === "On"
      );
    });
  };

  const renderDay = (day: Date) => {
    const entriesForDay = getEntriesForDay(day);
    const entriesBySchedule: Record<string, ScheduleEntryWithName[]> = {};

    entriesForDay.forEach((entry) => {
      if (!entriesBySchedule[entry.scheduleName]) {
        entriesBySchedule[entry.scheduleName] = [];
      }
      entriesBySchedule[entry.scheduleName].push(entry);
    });

    return (
      <div className="h-full min-h-[60px] w-full p-0.5 sm:min-h-[80px] sm:p-1 md:min-h-[100px] md:p-2">
        <div className="mb-0.5 text-xs font-medium sm:mb-1 sm:text-sm">
          {day.getDate()}
        </div>
        {entriesForDay.length >= 3 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent absolute top-0.5 right-0.5 h-4 w-4 p-0 sm:h-6 sm:w-6"
              >
                <span className="text-[10px] sm:text-xs">
                  +{entriesForDay.length}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 sm:w-72">
              <ScrollArea className="h-48 sm:h-72">
                <div className="space-y-2 p-2 sm:space-y-4 sm:p-4">
                  {entriesForDay.map((entry, idx) => (
                    <div
                      key={idx}
                      className="border-b pb-2 last:border-0 last:pb-0 sm:pb-4"
                    >
                      <div className="relative">
                        <h4 className="max-w-[140px] truncate pr-6 text-sm font-medium sm:max-w-[180px] sm:pr-8 sm:text-base">
                          {entry.scheduleName}
                        </h4>
                        <div className="absolute top-0 right-0">
                          <EditScheduleEntryDialog
                            scheduleId={entry.scheduleId}
                            entry={{
                              id: entry.id,
                              shift: (entry.overrides?.shift || entry.shift) as
                                | "On"
                                | "Off",
                              note: entry.overrides?.note ?? entry.note,
                              description:
                                entry.overrides?.description ??
                                entry.description,
                              repeatEvents: entry.repeatEvents,
                            }}
                          />
                        </div>
                        {(entry.overrides?.note ?? entry.note) && (
                          <div className="mt-0.5 sm:mt-1">
                            <Badge
                              variant="outline"
                              className="text-[10px] whitespace-nowrap sm:text-xs"
                            >
                              {entry.overrides?.note ?? entry.note}
                            </Badge>
                          </div>
                        )}
                      </div>
                      {(entry.overrides?.description ?? entry.description) && (
                        <p className="text-muted-foreground mt-1 text-xs sm:mt-2 sm:text-sm">
                          {entry.overrides?.description ?? entry.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        )}
        <ScrollArea className="h-[calc(100%-1rem)] sm:h-[calc(100%-1.5rem)]">
          <div className="flex flex-wrap gap-0.5 sm:gap-1">
            {Object.entries(entriesBySchedule).map(([scheduleName, entries]) =>
              entries.slice(0, 3).map((entry, idx) => (
                <Popover key={`${scheduleName}-${idx}`}>
                  <PopoverTrigger asChild>
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-2 cursor-pointer rounded-full border border-current/30 sm:h-3 sm:w-3 lg:hidden ${scheduleColors[scheduleName]} text-[${scheduleColors[scheduleName]}] transition-colors hover:opacity-60`}
                        title={scheduleName}
                      />
                      <Badge
                        className={`hidden cursor-pointer text-center text-[8px] tracking-tighter sm:text-[10px] lg:inline-flex ${scheduleColors[scheduleName]} hover:bg-opacity-70 max-w-[80px] truncate transition-colors sm:max-w-[120px]`}
                      >
                        {scheduleName}
                      </Badge>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2 sm:w-56 sm:p-4">
                    <div className="space-y-2 sm:space-y-4">
                      <div className="flex flex-col gap-1 sm:gap-2">
                        <div className="relative">
                          <h4 className="max-w-[140px] truncate pr-6 text-sm font-medium sm:max-w-[180px] sm:pr-8 sm:text-base">
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
                            <div className="mt-0.5 sm:mt-1">
                              <Badge
                                variant="outline"
                                className="text-[10px] whitespace-nowrap sm:text-xs"
                              >
                                {entry.overrides?.note ?? entry.note}
                              </Badge>
                            </div>
                          )}
                        </div>
                        {(entry.overrides?.description ??
                          entry.description) && (
                          <p className="text-muted-foreground/80 text-xs sm:text-sm">
                            {entry.overrides?.description ?? entry.description}
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
      </div>
    );
  };

  return (
    <div className="container mx-auto px-1 py-2 sm:px-2 sm:py-4 md:px-4 md:py-6">
      <DayPicker
        mode="single"
        selected={currentDate}
        onSelect={(date) => date && setCurrentDate(date)}
        defaultMonth={currentDate}
        onMonthChange={setCurrentDate}
        showOutsideDays
        classNames={{
          root: "w-full",
          months: "w-full",
          month: "w-full space-y-2 sm:space-y-4",
          caption:
            "relative flex items-center justify-center px-8 mb-2 sm:mb-4",
          caption_label:
            "text-base sm:text-lg md:text-xl font-semibold text-center flex-1",
          nav: "flex absolute left-1 right-1 justify-between w-full",
          nav_button: cn(
            "h-6 w-6 sm:h-7 sm:w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground",
          ),
          nav_button_previous: "",
          nav_button_next: "",
          table: "w-full mx-auto max-w-6xl",
          head_row: "grid grid-cols-7 gap-0.5 sm:gap-1",
          head_cell:
            "p-0.5 sm:p-1 md:p-2 text-center text-[10px] sm:text-xs md:text-sm font-medium",
          row: "grid grid-cols-7 gap-0.5 sm:gap-1 mt-0.5",
          cell: "relative aspect-square p-0",
          day: "h-full w-full p-0",
          day_today: "",
          day_outside: "opacity-50",
          day_disabled: "opacity-50",
          day_hidden: "invisible",
        }}
        components={{
          Day: ({ date, ...props }: DayProps) => {
            const { displayMonth, ...dayProps } = props;
            const isOutsideMonth = displayMonth.getMonth() !== date.getMonth();
            return (
              <div
                {...dayProps}
                className={cn(
                  "border-border dark:outline-border group relative aspect-square rounded-sm border p-0 sm:border-2 dark:outline-1",
                  isOutsideMonth && "opacity-40",
                )}
              >
                {renderDay(date)}
              </div>
            );
          },
        }}
      />
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
            <CalendarIcon className="text-muted-foreground h-12 w-12 opacity-70" />
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
