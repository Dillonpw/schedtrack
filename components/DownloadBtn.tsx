"use client";
import { Button } from "./ui/button";
import { ScheduleEntry } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
interface DownloadVCSButtonProps {
  scheduleEntriesData: ScheduleEntry[];
}


const DownloadVCSButton: React.FC<DownloadVCSButtonProps> = ({
  scheduleEntriesData,
}) => {
  /**
   * Function to create a blob from the VCS data and download it
   */
  const downloadVCS = () => {
    /**
     * Generate the VCS content from the scheduleEntriesData
     */
    const vcsContent = generateVCS(scheduleEntriesData);
    /**
     * Create a blob from the VCS content and download it
     */
    const blob = new Blob([vcsContent], { type: "text/x-vcalendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schedule.vcs";
    a.click();
    /**
     * Revoke the blob URL after download
     */
    URL.revokeObjectURL(url);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="default" onClick={downloadVCS}>
            Download
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download data to import to calendar</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DownloadVCSButton;

function generateVCS(scheduleEntriesData: ScheduleEntry[]): string {
  let vcs = `BEGIN:VCALENDAR\nVERSION:1.0\nPRODID:-//YourApp//Schedule//EN\n`;

  scheduleEntriesData.forEach((entry) => {
    const eventDate = new Date(entry.date);
    const formattedDate = eventDate
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");

    vcs += `BEGIN:VEVENT\n`;
    vcs += `UID:${entry.date}-${entry.dayOfWeek}-${entry.shift}@yourapp.com\n`;
    vcs += `DTSTART:${formattedDate}\n`;
    vcs += `SUMMARY:${entry.shift}\n`;
    vcs += `END:VEVENT\n`;
  });

  vcs += `END:VCALENDAR`;
  return vcs;
}
