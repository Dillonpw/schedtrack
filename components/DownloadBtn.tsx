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
  /**
   * Function to create a blob from the ICS data and download it
   */
  const downloadICS = () => {
    /**
     * Generate the ICS content from the scheduleEntriesData
     */
    const icsContent = generateICS(scheduleEntriesData);
    /**
     * Create a blob from the ICS content and download it
     */
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    saveAs(blob, "schedule.ics");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="default" onClick={downloadICS}>
            Download
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download data to import to calendar</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DownloadICSButton;

/**
 * Function to generate ICS content from schedule entries
 */
function generateICS(scheduleEntriesData: ScheduleEntry[]): string {
  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourApp//Schedule//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

  scheduleEntriesData.forEach((entry, index) => {
    const eventDate = new Date(entry.date);
    const startDate = formatDateICS(eventDate);
    const endDate = formatDateICS(
      new Date(eventDate.getTime() + 24 * 60 * 60 * 1000)
    ); // Add one day for full-day events

    ics += `BEGIN:VEVENT
UID:${entry.date}-${entry.dayOfWeek}-${entry.shift}-${index}@yourapp.com
DTSTAMP:${formatDateICS(new Date())}
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
SUMMARY:${entry.shift}
END:VEVENT
`;
  });

  ics += `END:VCALENDAR`;
  return ics;
}

/**
 * Function to format dates in ICS format (YYYYMMDD)
 */
function formatDateICS(date: Date): string {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are zero-based
  const day = padZero(date.getDate());

  return `${year}${month}${day}`;
}

/**
 * Helper function to pad single digit numbers with leading zero
 */
function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
