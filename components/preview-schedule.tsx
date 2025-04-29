"use client";

import { useState } from "react";
import { Calendar, Filter, X, ChevronDown } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SignIn } from "@/components/sign-in";
import { DayPicker, DayProps } from "react-day-picker";
import { cn } from "@/lib/utils";

const mockScheduleNames = ["Work Shifts", "On Call"] as const;
type MockScheduleName = (typeof mockScheduleNames)[number];

type MockScheduleEntry = {
  id: string;
  date: string;
  shift: "On" | "Off";
  scheduleName: MockScheduleName;
  scheduleId: string;
  note: string | null;
  description: string | null;
};

function PreviewCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visibleSchedules, setVisibleSchedules] = useState<MockScheduleName[]>([
    ...mockScheduleNames,
  ]);

  const scheduleColors: Record<MockScheduleName, string> = {
    "Work Shifts": "bg-blue-600",
    "On Call": "bg-amber-600",
  };

  const toggleSchedule = (scheduleName: MockScheduleName) => {
    setVisibleSchedules((prev) =>
      prev.includes(scheduleName)
        ? prev.filter((name) => name !== scheduleName)
        : [...prev, scheduleName],
    );
  };

  const toggleAllSchedules = (checked: boolean) => {
    setVisibleSchedules(checked ? [...mockScheduleNames] : []);
  };

  const getEntriesForDay = (day: Date): MockScheduleEntry[] => {
    const entries: MockScheduleEntry[] = [];
    const dateStr = day.toISOString().split("T")[0];

    const dayOfYear = Math.floor(
      (day.getTime() - new Date(day.getFullYear(), 0, 0).getTime()) /
        (24 * 60 * 60 * 1000),
    );
    const workCyclePosition = dayOfYear % 6;
    const isWorkDay = workCyclePosition < 3;

    if (isWorkDay && visibleSchedules.includes("Work Shifts")) {
      const shiftNote =
        workCyclePosition === 0
          ? "Day 1"
          : workCyclePosition === 1
            ? "Day 2"
            : "Day 3";
      entries.push({
        id: `work-${dateStr}`,
        date: dateStr,
        shift: "On",
        scheduleName: "Work Shifts",
        scheduleId: "mock-work-schedule",
        note: shiftNote,
        description: workCyclePosition === 0 ? "Start of shift cycle" : null,
      });
    }

    if (day.getDate() % 14 === 0 && visibleSchedules.includes("On Call")) {
      entries.push({
        id: `oncall-${dateStr}`,
        date: dateStr,
        shift: "On",
        scheduleName: "On Call",
        scheduleId: "mock-oncall-schedule",
        note: "Primary",
        description: "24-hour on-call duty",
      });
    }

    return entries;
  };

  const renderDay = (day: Date) => {
    const entriesForDay = getEntriesForDay(day);

    const entriesBySchedule: Record<string, MockScheduleEntry[]> = {};
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
                        {entry.note && (
                          <div className="mt-0.5 sm:mt-1">
                            <Badge
                              variant="outline"
                              className="text-[10px] whitespace-nowrap sm:text-xs"
                            >
                              {entry.note}
                            </Badge>
                          </div>
                        )}
                      </div>
                      {entry.description && (
                        <p className="text-muted-foreground mt-1 text-xs sm:mt-2 sm:text-sm">
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

        <ScrollArea className="h-[calc(100%-1rem)] sm:h-[calc(100%-1.5rem)]">
          <div className="flex flex-wrap gap-0.5 sm:gap-1">
            {Object.entries(entriesBySchedule).map(([scheduleName, entries]) =>
              entries.slice(0, 3).map((entry, idx) => (
                <Popover key={`${scheduleName}-${idx}`}>
                  <PopoverTrigger asChild>
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-2 cursor-pointer rounded-full border border-current/30 sm:h-3 sm:w-3 lg:hidden ${scheduleColors[scheduleName as MockScheduleName]}`}
                        title={scheduleName}
                      />
                      <Badge
                        className={`hidden cursor-pointer text-center text-[8px] tracking-tighter sm:text-[10px] lg:inline-flex ${scheduleColors[scheduleName as MockScheduleName]} hover:bg-opacity-70 max-w-[80px] truncate transition-colors sm:max-w-[120px]`}
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
                          {entry.note && (
                            <div className="mt-0.5 sm:mt-1">
                              <Badge
                                variant="outline"
                                className="text-[10px] whitespace-nowrap sm:text-xs"
                              >
                                {entry.note}
                              </Badge>
                            </div>
                          )}
                        </div>
                        {entry.description && (
                          <p className="text-muted-foreground/80 text-xs sm:text-sm">
                            {entry.description}
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
    <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-6">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full overflow-visible sm:max-w-[calc(100%-150px)]">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {mockScheduleNames.map(
              (name) =>
                visibleSchedules.includes(name) && (
                  <div
                    key={name}
                    className="group bg-card flex cursor-default items-center gap-2 rounded-full border px-2 py-1 text-xs transition-all select-none sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${scheduleColors[name]}`}
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
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="text-foreground flex w-[120px] shrink-0 items-center justify-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Schedules</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-card w-56" align="end">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all-schedules"
                  checked={visibleSchedules.length === mockScheduleNames.length}
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
                {mockScheduleNames.map((name) => (
                  <div key={name} className="flex items-center space-x-2 py-1">
                    <Checkbox
                      id={`schedule-${name}`}
                      checked={visibleSchedules.includes(name)}
                      onCheckedChange={() => toggleSchedule(name)}
                    />
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${scheduleColors[name]}`}
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
      </div>

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
              const isOutsideMonth =
                displayMonth.getMonth() !== date.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div
                  {...dayProps}
                  className={cn(
                    "border-border dark:outline-border group relative aspect-square rounded-sm border p-0 sm:border-2 dark:outline-1",
                    isOutsideMonth && "opacity-40",
                    isToday &&
                      "border-primary/50 bg-primary/5 dark:bg-primary/10 border-2 shadow-sm sm:border-3",
                  )}
                >
                  {renderDay(date)}
                </div>
              );
            },
          }}
        />
      </div>
    </div>
  );
}

function PreviewTodayView() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (24 * 60 * 60 * 1000),
  );
  const cyclePosition = dayOfYear % 6;
  const isWorkDay = cyclePosition < 3;
  const dayLabel =
    cyclePosition === 0
      ? "Day 1"
      : cyclePosition === 1
        ? "Day 2"
        : cyclePosition === 2
          ? "Day 3"
          : `Off Day ${cyclePosition - 2}`;
  const isOnCall = today.getDate() % 14 === 0;

  const scheduleColors: Record<MockScheduleName, string> = {
    "Work Shifts": "bg-blue-600",
    "On Call": "bg-amber-600",
  };

  return (
    <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-6">
      <Card className="mx-auto max-w-md">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <Calendar className="text-primary mb-2 h-8 w-8" />
              <h3 className="text-xl font-semibold">Today's Schedule</h3>
              <p className="text-muted-foreground mb-2 text-center text-sm">
                {today.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="space-y-4">
              <div className="group relative rounded-md border p-4 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-600" />
                    <h4 className="font-medium">Work Shifts</h4>
                  </div>
                  <Badge
                    variant={isWorkDay ? "default" : "outline"}
                    className={isWorkDay ? "bg-blue-600" : ""}
                  >
                    {isWorkDay ? "On" : "Off"}
                  </Badge>
                </div>

                {isWorkDay && (
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="text-xs whitespace-nowrap"
                    >
                      {dayLabel}
                    </Badge>
                    {cyclePosition === 0 && (
                      <p className="text-muted-foreground mt-1 text-sm">
                        Start of shift cycle
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="group relative rounded-md border p-4 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-600" />
                    <h4 className="font-medium">On Call</h4>
                  </div>
                  <Badge
                    variant={isOnCall ? "default" : "outline"}
                    className={isOnCall ? "bg-amber-600" : ""}
                  >
                    {isOnCall ? "On" : "Off"}
                  </Badge>
                </div>

                {isOnCall && (
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="text-xs whitespace-nowrap"
                    >
                      Primary
                    </Badge>
                    <p className="text-muted-foreground mt-1 text-sm">
                      24-hour on-call duty
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center pt-2">
              <p className="text-muted-foreground mb-3 text-center text-sm">
                Sign in to access your complete schedule and make changes
              </p>
              <SignIn />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PreviewSchedule() {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <section>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-4 flex justify-center">
          <TabsList>
            <TabsTrigger value="schedule">Calendar</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="schedule" className="mt-0">
          <PreviewCalendarView />
        </TabsContent>

        <TabsContent value="today" className="mt-0">
          <PreviewTodayView />
        </TabsContent>
      </Tabs>

      <div className="mt-6 border-t-2 px-4">
        <div className="p-4">
          <h2 className="mb-3 text-lg font-medium">All Schedules</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mockScheduleNames.map((name, index) => (
              <div
                key={index}
                className="group relative rounded-md border p-3 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium transition-colors">{name}</div>
                  <Badge variant="outline" className="text-xs">
                    {name === "Work Shifts" ? "3/3" : "Rotation"}
                  </Badge>
                </div>
                <div className="text-muted-foreground group-hover:text-muted-foreground/80 mt-1 text-sm transition-colors">
                  {name === "Work Shifts"
                    ? "3 days on, 3 days off"
                    : "14-day rotation"}
                </div>
                <div className="text-muted-foreground group-hover:text-muted-foreground/80 mt-1 text-xs transition-colors">
                  <div className="mt-0.5">
                    Started: <br />{" "}
                    {
                      new Date(Date.now() - index * 5 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                    }
                  </div>
                </div>
              </div>
            ))}
            <div className="group hover:bg-accent/5 relative flex items-center justify-center rounded-md border border-dashed p-6 transition-all">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="text-muted-foreground text-sm">
                  Sign in to create more schedules
                </div>
                <SignIn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
