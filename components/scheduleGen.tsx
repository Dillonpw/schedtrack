"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar } from "./ui/calendar";
import { Switch } from "@/components/ui/switch";

interface ScheduleEntry {
  date: string;
  dayOfWeek: string;
  shift: string;
}

const ScheduleForm: React.FC = () => {
  const [workDays, setWorkDays] = useState<number>(4);
  const [offDays, setOffDays] = useState<number>(2);
  const [totalDays, setTotalDays] = useState<number>(90);
  const [startDate, setStartDate] = useState<string>("");
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false); // Toggle state

  useEffect(() => {
    prefillInputs();
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}-${year}`;
  };

  const getDayOfWeek = (dayIndex: number): string => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayIndex];
  };

  const generateRotatingSchedule = (
    workDays: number,
    offDays: number,
    totalDays: number,
    startDate: Date,
  ): ScheduleEntry[] => {
    const schedule: ScheduleEntry[] = [];
    let currentDate = new Date(startDate);
    currentDate.setHours(0, 0, 0, 0);
    let daysScheduled = 0;

    while (daysScheduled < totalDays) {
      const formattedDate = formatDate(currentDate);
      const dayOfWeek = getDayOfWeek(currentDate.getDay());
      const shift =
        daysScheduled % (workDays + offDays) < workDays ? "Work" : "Off";

      schedule.push({ date: formattedDate, dayOfWeek, shift });
      daysScheduled++;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return schedule;
  };

  const handleGenerateSchedule = (e: FormEvent): void => {
    e.preventDefault();
    const startDateObj =
      selectedDates.length > 0
        ? selectedDates[0]
        : new Date(startDate + "T00:00:00");
    const rotatingSchedule = generateRotatingSchedule(
      workDays,
      offDays,
      totalDays,
      startDateObj,
    );
    setSchedule(rotatingSchedule);
    setCookie("workDays", workDays.toString(), 30);
    setCookie("offDays", offDays.toString(), 30);
    setCookie("totalDays", totalDays.toString(), 30);
    setCookie("startDate", startDate, 30);
  };

  const renderTableView = (schedule: ScheduleEntry[]): JSX.Element => (
    <Table className="text-lg">
      <TableCaption>Work Schedule</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px] text-left text-xl font-semibold">
            Day of Week
          </TableHead>
          <TableHead className="w-[300px] text-center text-xl font-semibold">
            Date
          </TableHead>
          <TableHead className="w-[300px] text-right text-xl font-semibold">
            Shift
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedule.map((entry, index) => (
          <TableRow key={index}>
            <TableCell className="w-[300px] text-left">
              {entry.dayOfWeek}
            </TableCell>
            <TableCell className="w-[300px] text-center">
              {entry.date}
            </TableCell>
            <TableCell className="w-[300px] text-right">
              {entry.shift}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const setCookie = (
    name: string,
    value: string,
    daysToExpire: number,
  ): void => {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
  };

  const prefillInputs = (): void => {
    const savedWorkDays = getCookie("workDays");
    const savedOffDays = getCookie("offDays");
    const savedTotalDays = getCookie("totalDays");
    const savedStartDate = getCookie("startDate");

    if (savedWorkDays) setWorkDays(parseInt(savedWorkDays));
    if (savedOffDays) setOffDays(parseInt(savedOffDays));
    if (savedTotalDays) setTotalDays(parseInt(savedTotalDays));
    if (savedStartDate) setStartDate(savedStartDate);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDates((prevDates) => {
      const index = prevDates.findIndex(
        (date) => date.getTime() === day.getTime(),
      );
      if (index > -1) {
        return prevDates.filter((_, i) => i !== index);
      }
      return [...prevDates, day];
    });
  };

  return (
    <main>
      <div className="flex flex-col items-center space-x-2">
        <Switch checked={showCalendar} onCheckedChange={setShowCalendar} />

        {showCalendar ? <span>Show Inputs</span> : <span>Show Calendar</span>}
      </div>
      <form
        className="mt-4 flex flex-col items-center gap-2 text-lg font-semibold"
        onSubmit={handleGenerateSchedule}
      >
        {showCalendar ? (
          <div className="m-4 flex items-center justify-center">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onDayClick={handleDayClick}
            />
          </div>
        ) : (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <label htmlFor="workDays">
                    Work Days:{" "}
                    <span className="text-md rounded-full border bg-muted px-2 py-1">
                      ?
                    </span>
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  Enter the number of consecutive work days in your rotation
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              className="w-40 rounded-md bg-gray-300 px-2 py-1 text-black"
              type="number"
              id="workDays"
              min="1"
              value={workDays}
              onChange={(e) => setWorkDays(parseInt(e.target.value))}
              required
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <label htmlFor="offDays">
                    Off Days:{" "}
                    <span className="text-md rounded-full border bg-muted px-2 py-1">
                      ?
                    </span>
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  Enter the number of consecutive days off in your rotation
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              className="w-40 rounded-md bg-gray-300 px-2 py-1 text-black"
              type="number"
              id="offDays"
              min="1"
              value={offDays}
              onChange={(e) => setOffDays(parseInt(e.target.value))}
              required
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <label htmlFor="totalDays">
                    Total Days:{" "}
                    <span className="text-md rounded-full border bg-muted px-2 py-1">
                      ?
                    </span>
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  Enter the number of days ahead you would like to display
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              className="w-40 rounded-md bg-gray-300 px-2 py-1 text-black"
              type="number"
              id="totalDays"
              min="1"
              value={totalDays}
              onChange={(e) => setTotalDays(parseInt(e.target.value))}
              required
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <label htmlFor="startDate">
                    Start Date:{" "}
                    <span className="text-md rounded-full border bg-muted px-2 py-1">
                      ?
                    </span>
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  Select the first date of your previous or next rotation for
                  the generator to build out from
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              className="w-40 rounded-md bg-gray-300 px-2 py-1 text-black"
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </>
        )}

        <Button type="submit" variant="default" id="generate">
          Show Schedule
        </Button>
      </form>
      {schedule.length > 0 && renderTableView(schedule)}
    </main>
  );
};

export default ScheduleForm;
