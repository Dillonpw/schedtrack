"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { ScheduleEntry } from "@/types";
import DownloadButton from "@/components/download-data";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientScheduleView({
  scheduleEntriesData,
  session
}: {
  scheduleEntriesData: ScheduleEntry[];
  session: any;
}): JSX.Element {
  if (scheduleEntriesData.length === 0) {
    return <p className="text-center text-lg">No schedule available</p>;
  }


  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full border-none bg-border dark:bg-muted">
        <CardContent>
          {!session && (
            <div className="mb-6 rounded-lg bg-blue-100 p-4 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
              <p>
                You are using the app as a guest. Your schedule will be lost
                after you leave close this window. Sign in to save your data, and gain
                access to additional features.
              </p>
            </div>
          )}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <DownloadButton scheduleEntriesData={scheduleEntriesData} />
            </div>
            <CalendarView scheduleEntriesData={scheduleEntriesData} />
          </div>
        </CardContent>
      </Card>
    </main>
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
    <div className="mx-auto w-full dark:bg-muted">
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
                <div key={day} className="p-4 text-left font-bold">
                  {day}
                </div>
              ))}
              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={index} className="p-4"></div>
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
                    className={`flex h-20 w-full flex-col items-start rounded-md border p-2 pl-1 text-center ${colorClass}`}
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