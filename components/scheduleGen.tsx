"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar } from "./ui/calendar";
import { generateSchedule } from "../lib/actions/generateSchedule";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ScheduleForm: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [workDays, setWorkDays] = useState<number>(4);
  const [offDays, setOffDays] = useState<number>(2);
  const [totalDays, setTotalDays] = useState<number>(90);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const handleGenerateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !session) return;
    try {
      await generateSchedule({
        workDays,
        offDays,
        totalDays,
        startDate: selectedDate,
      });
      router.push(`/schedule`);
    } catch (error) {
      console.error("Failed to generate schedule:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to generate a schedule.</div>;
  }

  return (
    <main>
      <h1 className="pb-5 text-center text-3xl font-bold">
        Schedule Generator
      </h1>
      <form
        className="mt-4 flex flex-col items-center gap-2 text-lg font-semibold"
        onSubmit={handleGenerateSchedule}
      >
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
          max="61"
          value={totalDays}
          onChange={(e) => setTotalDays(parseInt(e.target.value))}
          required
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <label>
                Start Date:{" "}
                <span className="text-md rounded-full border bg-muted px-2 py-1">
                  ?
                </span>
              </label>
            </TooltipTrigger>
            <TooltipContent>
              Select the first day of your next or last rotation
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Calendar
          mode="single"
          selected={selectedDate}
          onDayClick={handleDayClick}
        />

        <Button
          onClick={handleGenerateSchedule}
          variant="default"
          id="generate"
        >
          Generate Schedule
        </Button>
      </form>
    </main>
  );
};

export default ScheduleForm;
