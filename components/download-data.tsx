"use client";
import { Button } from "./ui/button";
import { ScheduleEntry } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { saveAs } from "file-saver";

interface DownloadICSButtonProps {
  scheduleEntriesData: ScheduleEntry[];
}

const DownloadICSButton: React.FC<DownloadICSButtonProps> = ({
  scheduleEntriesData,
}) => {
  const downloadICS = () => {
    const icsContent = generateICS(scheduleEntriesData);
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    saveAs(blob, "schedule.ics");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="default" className="ml-2" onClick={downloadICS}>
            Download
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Download and import to your extrernal calendar
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DownloadICSButton;

function generateICS(scheduleEntriesData: ScheduleEntry[]): string {
  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourApp//Schedule//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

  const workDays = scheduleEntriesData.filter((entry) => entry.shift.toLowerCase() === "work");

  workDays.forEach((entry, index) => {
    const eventDate = new Date(entry.date);
    const startDate = formatDateICS(eventDate);
    const endDate = formatDateICS(
      new Date(eventDate.getTime() + 24 * 60 * 60 * 1000)
    );

    ics += `BEGIN:VEVENT
UID:${entry.date}-${entry.dayOfWeek}-${entry.shift}-${index}@yourapp.com
DTSTAMP:${formatDateICS(new Date())}
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
SUMMARY:${entry.shift}
DESCRIPTION:${entry.title || 'No additional information'}
END:VEVENT
`;
  });

  ics += `END:VCALENDAR`;
  return ics;
}

function formatDateICS(date: Date): string {
  const year = date.getUTCFullYear();
  const month = padZero(date.getUTCMonth() + 1);
  const day = padZero(date.getUTCDate());

  return `${year}${month}${day}`;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

