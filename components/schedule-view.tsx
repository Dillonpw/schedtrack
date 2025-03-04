"use client";

import React, { useState, useEffect } from "react";
import { ScheduleEntry } from "@/types";
import DownloadButton from "@/components/download-data";
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
      <div className="mb-10 lg:mx-40 md:mx-20 flex items-center justify-between">
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
    setProcessedEntries(
      new Map(scheduleEntriesData.map((entry) => [entry.date, entry])),
    );
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

  const changeMonth = (offset: number) => {
    setDirection(offset);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1),
    );
  };

  const getScheduleForDate = (date: Date) =>
    processedEntries.get(date.toISOString().split("T")[0]);

  const getColorClass = (scheduleEntry?: ScheduleEntry) =>
    scheduleEntry?.shift === "Work"
      ? "bg-blue-700 dark:bg-red-500 text-gray-100 dark:text-gray-100"
      : "bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-300";

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
    <div className="mx-auto w-full max-w-4xl px-2 dark:bg-muted">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div>
          <Button onClick={() => changeMonth(-1)} size="icon" className="mr-2">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous Month</span>
          </Button>
          <Button onClick={() => changeMonth(1)} size="icon" className="ml-2">
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
              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={index} className="p-2"></div>
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
                    className={`flex h-20 w-full flex-col items-start rounded-md border p-2 ${colorClass}`}
                  >
                    <div className="font-semibold">{index + 1}</div>
                    {scheduleEntry ? (
                      <>
                        <div className="mt-1 text-xs">
                          {scheduleEntry.shift}
                        </div>
                        {scheduleEntry.shift === "Work" &&
                          scheduleEntry.title && (
                            <div className="mt-1 text-xs font-medium">
                              {scheduleEntry.title}
                            </div>
                          )}
                      </>
                    ) : (
                      <div className="mt-1 text-xs">No Data</div>
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
          <div className="mr-2 h-4 w-4 rounded border border-green-800 bg-blue-700 dark:bg-red-500"></div>
          <span>Work Day</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-200 dark:bg-gray-700"></div>
          <span>Off Day / No Data</span>
        </div>
      </div>
    </div>
  );
}
