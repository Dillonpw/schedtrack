"use client";

import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, StickyNote } from "lucide-react";
import type { ScheduleEntryWithName } from "@/types";
import { AutoRefresh } from "./auto-refresh";
import { EditScheduleEntryDialog } from "@/components/edit-schedule-entry-dialog";

export default function TodayView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntryWithName[];
}) {
  const today = format(new Date(), "yyyy-MM-dd");

  const todayEntries = scheduleEntriesData.filter(
    (entry) => entry.date === today && entry.shift === "On",
  );

  const entriesBySchedule: Record<string, ScheduleEntryWithName[]> = {};
  todayEntries.forEach((entry) => {
    if (!entriesBySchedule[entry.scheduleName]) {
      entriesBySchedule[entry.scheduleName] = [];
    }
    entriesBySchedule[entry.scheduleName].push(entry);
  });

  if (todayEntries.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AutoRefresh />

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Today's Schedule</h1>
        <div className="text-muted-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span>{format(new Date(), "EEEE, MMMM d, yyyy")}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(entriesBySchedule).map(([scheduleName, entries]) => (
          <Card key={scheduleName} className="overflow-hidden">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calendar className="h-5 w-5" />
                {scheduleName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {entries.map((entry) => {
                  const description =
                    entry.overrides?.description ?? entry.description;
                  const note = entry.overrides?.note ?? entry.note;

                  return (
                    <div key={entry.id} className="relative p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{entry.dayOfWeek}</span>
                        </div>
                        <div>
                          <EditScheduleEntryDialog
                            scheduleId={entry.scheduleId}
                            entry={{
                              id: entry.id,
                              shift: (entry.overrides?.shift || entry.shift) as
                                | "On"
                                | "Off",
                              note: entry.overrides?.note ?? entry.note,
                              description:
                                entry.overrides?.description ??
                                entry.description,
                              repeatEvents: entry.repeatEvents,
                            }}
                          />
                        </div>
                      </div>

                      {description && (
                        <div className="mb-2 flex items-start gap-2">
                          <FileText className="text-muted-foreground mt-1 h-4 w-4 shrink-0" />
                          <p className="text-sm">{description}</p>
                        </div>
                      )}

                      {note && (
                        <div className="flex items-start gap-2">
                          <StickyNote className="text-muted-foreground mt-1 h-4 w-4 shrink-0" />
                          <p className="text-muted-foreground text-sm">
                            {note}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
