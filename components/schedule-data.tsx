import { db } from "@/db/index";
import { schedules } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import type { ScheduleEntry } from "@/types";
import ClientScheduleView from "./schedule-view";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import DeleteScheduleButton from "@/components/delete-schedule";
import type { ScheduleEntryWithName, ScheduleInfo } from "@/types";

export default async function ScheduleData() {

  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return null;
    }

    const userSchedules = await db
      .select()
      .from(schedules)
      .where(eq(schedules.userId, session.user.id));

    if (!userSchedules || userSchedules.length === 0) {
      return (
        <section className="mx-auto flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-bold">Schedule</h1>
          <p className="mt-4 text-center text-gray-600">
            You haven't created any schedules yet. Create a new schedule to get
            started.
          </p>
        </section>
      );
    }

    const scheduleInfoList: ScheduleInfo[] = userSchedules.map((schedule) => {
      const entries =
        typeof schedule.schedule === "string"
          ? JSON.parse(schedule.schedule)
          : schedule.schedule;

      const startDate =
        Array.isArray(entries) && entries.length > 0
          ? new Date(
              Math.min(
                ...entries.map((entry: ScheduleEntry) =>
                  new Date(entry.date).getTime(),
                ),
              ),
            )
          : null;

      return {
        id: schedule.id,
        name: schedule.name,
        createdAt: schedule.createdAt || new Date(),
        entryCount: Array.isArray(entries) ? entries.length : 0,
        startDate,
      };
    });

    const scheduleEntriesData: ScheduleEntryWithName[] = userSchedules.flatMap(
      (schedule) => {
        try {
          const entries =
            typeof schedule.schedule === "string"
              ? JSON.parse(schedule.schedule)
              : schedule.schedule;

          return entries.map((entry: ScheduleEntry) => {
            const updatedEntry = {
              ...entry,
              scheduleName: schedule.name,
              scheduleId: schedule.id,
              note: entry.note || (entry as any).title || null,
            };
            return updatedEntry;
          });
        } catch (parseError) {
          console.error("Error processing schedule data:", parseError);
          return [];
        }
      },
    );

    if (scheduleEntriesData.length === 0) {
      return (
        <section className="mx-auto flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-bold">Schedule</h1>
          <p className="mt-4 text-center text-gray-600">
            Your schedules are empty. Create a new schedule to get started.
          </p>
        </section>
      );
    }

    return (
      <section>
        <div className="mt-6">
          <ClientScheduleView scheduleEntriesData={scheduleEntriesData} />
        </div>

        <div className="mt-6 border-t-2 px-4">
          <div className="p-4">
            <h2 className="mb-3 text-lg font-medium">All Schedules</h2>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-5">
              {scheduleInfoList.map((info) => (
                <div
                  key={info.id}
                  className="group relative rounded-md border p-3 transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium transition-colors">
                      {info.name}
                    </div>
                    <DeleteScheduleButton
                      scheduleId={info.id}
                      scheduleName={info.name}
                    />
                  </div>
                  <div className="text-muted-foreground group-hover:text-muted-foreground/80 mt-1 text-sm transition-colors">
                    {info.entryCount} days
                  </div>
                  <div className="text-muted-foreground group-hover:text-muted-foreground/80 mt-1 text-xs transition-colors">
                    {info.startDate && (
                      <div className="mt-0.5">
                        Starting: <br />{" "}
                        {info.startDate.toISOString().split("T")[0]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error in ScheduleData:", error);
    return (
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-destructive text-center text-3xl font-bold">
          Error Loading Schedule
        </h1>
        <Card className="border-destructive/20 mx-auto mt-6 max-w-md border-2">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Calendar className="text-destructive h-12 w-12" />
            <p className="text-center">
              There was an error loading your schedule. Please try again later.
            </p>
            <p className="text-muted-foreground text-center text-sm">
              Error details:{" "}
              {error instanceof Error ? error.message : String(error)}
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }
}
