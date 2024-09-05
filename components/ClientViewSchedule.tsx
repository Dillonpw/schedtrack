// ClientScheduleView.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ScheduleEntry } from "@/types";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import DownloadButton from "@/components/DownloadBtn";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientScheduleView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[];
}) {
  const [isCalendarView, setIsCalendarView] = useState(false);

  if (scheduleEntriesData.length === 0) {
    return <p className="text-center text-lg">No schedule available</p>;
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <DownloadButton scheduleEntriesData={scheduleEntriesData} />
        <div className="flex items-center space-x-2">
          <Label htmlFor="view-toggle">Calendar View</Label>
          <Switch
            id="view-toggle"
            checked={isCalendarView}
            onCheckedChange={setIsCalendarView}
          />
        </div>
      </div>
      {isCalendarView ? (
        <CalendarView scheduleEntriesData={scheduleEntriesData} />
      ) : (
        <ListView scheduleEntriesData={scheduleEntriesData} />
      )}
    </>
  );
}

function ListView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[];
}) {
  return (
    <Table>
      <TableCaption className="mb-5">End of List</TableCaption>
      <TableHeader>
        <TableRow className="flex w-full justify-between px-4">
          <TableCell className="w-[33%] text-left text-xl font-semibold">
            Day of Week
          </TableCell>
          <TableCell className="w-[33%] text-center text-xl font-semibold">
            Date
          </TableCell>
          <TableCell className="w-[33%] text-right text-xl font-semibold">
            Shift
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scheduleEntriesData.map((entry, index) => (
          <TableRow key={index} className="flex w-full justify-between">
            <TableCell className="text-md w-[33%] text-left font-bold">
              {entry.dayOfWeek}
            </TableCell>
            <TableCell className="text-md w-[33%] text-center font-bold">
              {entry.date}
            </TableCell>
            <TableCell className="text-md w-[33%] text-right font-bold">
              {entry.shift}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[];
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [processedEntries, setProcessedEntries] = useState<
    Map<string, ScheduleEntry>
  >(new Map());

  useEffect(() => {
    const entriesMap = new Map<string, ScheduleEntry>();
    scheduleEntriesData.forEach((entry) => {
      entriesMap.set(entry.date, entry);
    });
    setProcessedEntries(entriesMap);
  }, [scheduleEntriesData]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const getScheduleForDate = (date: Date) => {
    const dateString = formatDate(date);
    return processedEntries.get(dateString);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getColorClass = (scheduleEntry: ScheduleEntry | undefined) => {
    if (!scheduleEntry) return "bg-gray-100"; // No data
    return scheduleEntry.shift === "Work"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100"; // Work day or Off day
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div>
          <Button
            onClick={prevMonth}
            variant="outline"
            size="icon"
            className="mr-2"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous Month</span>
          </Button>
          <Button onClick={nextMonth} variant="outline" size="icon">
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Next Month</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day) => (
          <div key={day} className="p-2 text-center font-bold">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            index + 1,
          );
          const scheduleEntry = getScheduleForDate(date);
          const colorClass = getColorClass(scheduleEntry);
          return (
            <div key={index} className={`rounded-md border p-2 ${colorClass}`}>
              <div className="font-semibold">{index + 1}</div>
              {scheduleEntry && (
                <div className="mt-1 text-xs">{scheduleEntry.shift}</div>
              )}
              {!scheduleEntry && <div className="mt-1 text-xs">No Data</div>}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded border border-green-800 bg-green-100"></div>
          <span>Work Day</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-100"></div>
          <span>Off Day / No Data</span>
        </div>
      </div>
    </div>
  );
}
