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

/**
 * The main component for the client-side schedule view.
 *
 * @param {{ scheduleEntriesData: ScheduleEntry[] }} props
 * @returns {JSX.Element}
 */
export default function ClientScheduleView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[];
}): JSX.Element {
  const [isCalendarView, setIsCalendarView] = useState(true);

  /**
   * If the schedule is empty, render a message.
   */
  if (scheduleEntriesData.length === 0) {
    return <p className="text-center text-lg">No schedule available</p>;
  }

  /**
   * Render the main view with the buttons and the calendar/list view.
   */
  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <DownloadButton scheduleEntriesData={scheduleEntriesData} />
        <div className="flex items-center space-x-2">
          <Label
            htmlFor="view-toggle"
            className="text-black dark:text-gray-100"
          >
            {isCalendarView ? "List View" : "Calendar View"}
          </Label>

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

/**
 * The `ListView` component is responsible for rendering the list view of the
 * schedule entries.
 *
 * @param {{ scheduleEntriesData: ScheduleEntry[] }} props - The schedule entries
 * data as an array of `ScheduleEntry` objects.
 *
 * @returns {JSX.Element} The JSX element representing the list view of the
 * schedule entries.
 */
function ListView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[];
}): JSX.Element {
  return (
    <Table>
      <TableCaption className="mb-5">
        This is the end of the list, but you can always go back to the calendar
        view by clicking the button above.
      </TableCaption>
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

/**
 * A component that displays the schedule in a calendar format.
 *
 * @param {{ scheduleEntriesData: ScheduleEntry[] }} props - The schedule entries
 * data as an array of `ScheduleEntry` objects.
 *
 * @returns {JSX.Element} The JSX element representing the calendar view of the
 * schedule.
 */
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

  /**
   * Move to the previous month.
   */
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  /**
   * Move to the next month.
   */
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  /**
   * Get the schedule entry for the given date.
   *
   * @param {Date} date - The date to get the schedule entry for.
   * @returns {ScheduleEntry | undefined} The schedule entry for the given date,
   * or undefined if there is no data for that date.
   */
  const getScheduleForDate = (date: Date) => {
    const dateString = formatDate(date);
    return processedEntries.get(dateString);
  };

  /**
   * Format a date as a string in the format 'YYYY-MM-DD'.
   *
   * @param {Date} date - The date to format.
   * @returns {string} The date formatted as a string in the format 'YYYY-MM-DD'.
   */
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  /**
   * Get the color class for a given schedule entry.
   *
   * @param {ScheduleEntry | undefined} scheduleEntry - The schedule entry to get
   * the color class for.
   * @returns {string} The color class for the given schedule entry.
   */
  const getColorClass = (scheduleEntry: ScheduleEntry | undefined) => {
    if (!scheduleEntry)
      return "bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300";
    return scheduleEntry.shift === "Work"
      ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
      : "bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300";
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
      <div className="grid grid-cols-7 gap-1">
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
            <div key={index} className={`rounded-md border p-1 ${colorClass}`}>
              <div className="font-semibold">{index + 1}</div>
              {scheduleEntry && (
                <div className="mt-1 h-8 text-xs">{scheduleEntry.shift}</div>
              )}
              {!scheduleEntry && (
                <div className="mt-1 h-8 text-xs">No Data</div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded border border-green-800 bg-green-100 dark:bg-green-800"></div>
          <span>Work Day</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-100 dark:bg-gray-700"></div>
          <span>Off Day / No Data</span>
        </div>
      </div>
    </div>
  );
}
