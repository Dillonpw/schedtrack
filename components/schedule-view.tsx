"use client";

import React, { useState, useEffect } from "react";
import { ScheduleEntry } from "@/types";
import DownloadButton from "@/components/download-data";
import { ChevronLeftIcon, ChevronRightIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function ClientScheduleView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[];
}): JSX.Element {
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between md:mx-20 lg:mx-40">
        <h1 className="text-2xl font-bold">Your Schedule</h1>
        <DownloadButton scheduleEntriesData={scheduleEntriesData} />
      </div>
      <CalendarView scheduleEntriesData={scheduleEntriesData} />
    </div>
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
      ? "bg-blue-700 dark:bg-red-500 text-white dark:text-white"
      : "bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-200";

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
    <Card className="mx-auto w-full max-w-4xl overflow-hidden">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="flex space-x-2">
            <Button
              onClick={() => changeMonth(-1)}
              size="icon"
              variant="outline"
              className="dark:border-gray-100 dark:text-gray-100"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous Month</span>
            </Button>
            <Button
              onClick={() => changeMonth(1)}
              size="icon"
              variant="outline"
              className="dark:border-gray-100 dark:text-gray-100"
            >
              <ChevronRightIcon className="h-4 w-4" />
              <span className="sr-only">Next Month</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div style={{ position: "relative", minHeight: "520px" }}>
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
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center text-sm font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
                {[...Array(firstDayOfMonth)].map((_, index) => (
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
                  const isToday =
                    new Date().toDateString() === date.toDateString();

                  return (
                    <div
                      key={`day-${index}`}
                      className={`flex h-14 flex-col rounded-md border sm:h-20 ${colorClass} ${
                        isToday ? "ring-2 ring-blue-400 dark:ring-red-300" : ""
                      } transition-all`}
                    >
                      <div className="p-1 text-right text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="flex flex-1 flex-col items-center justify-center p-1">
                        {scheduleEntry ? (
                          <>
                            <div className="text-center text-sm font-medium">
                              {scheduleEntry.shift}
                            </div>
                            {scheduleEntry.shift === "Work" &&
                              scheduleEntry.title && (
                                <div className="mt-1 text-center text-xs">
                                  {scheduleEntry.title}
                                </div>
                              )}
                          </>
                        ) : (
                          <div className="text-xs text-muted-foreground dark:text-gray-300">
                            No Data
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4 border-t pt-4">
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded border border-blue-800 bg-blue-700 dark:border-red-600 dark:bg-red-500"></div>
            <span className="text-sm">Work Day</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded border border-gray-400 bg-gray-300 dark:border-gray-600 dark:bg-gray-700"></div>
            <span className="text-sm">Off Day / No Data</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
