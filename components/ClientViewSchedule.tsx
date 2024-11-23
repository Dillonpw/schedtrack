"use client";

import React, { useState, useEffect } from "react";
import { ScheduleEntry } from "@/types";
import DownloadButton from "@/components/DownloadBtn";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientScheduleView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[];
}): JSX.Element {
  if (scheduleEntriesData.length === 0) {
    return <p className="text-center text-lg">No schedule available</p>;
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <DownloadButton scheduleEntriesData={scheduleEntriesData} />
      </div>
      <CalendarView scheduleEntriesData={scheduleEntriesData} />
    </>
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
  const [direction, setDirection] = useState(0);

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
    setDirection(-1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setDirection(1);
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
    if (!scheduleEntry)
      return "bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300";
    return scheduleEntry.shift === "Work"
      ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
      : "bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300";
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
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
            size="icon"
            className="mr-2"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous Month</span>
          </Button>
          <Button onClick={nextMonth} size="icon">
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Next Month</span>
          </Button>
        </div>
      </div>
      <div style={{ position: "relative", height: "auto", minHeight: "500px" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentDate.toISOString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={{ position: "absolute", width: "100%" }}
          >
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
                  <div
                    key={index}
                    className={`rounded-md border p-1 ${colorClass}`}
                  >
                    <div className="font-semibold">{index + 1}</div>
                    {scheduleEntry && (
                      <div className="mt-1 h-8 text-xs">
                        {scheduleEntry.shift}
                      </div>
                    )}
                    {!scheduleEntry && (
                      <div className="mt-1 h-8 text-xs">No Data</div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
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
