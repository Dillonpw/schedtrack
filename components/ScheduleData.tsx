import React from "react";
import { db } from "@/db/index";
import { scheduleEntries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { ScheduleEntry } from "@/types";
import ClientScheduleView from "./ClientViewSchedule";


export default async function ScheduleData() {
  const session = await auth();
  if (!session || !session.user?.id) {
    // User is not logged in, return null
    return null;
  }

  // Get the user's schedule entries
  const scheduleEntriesData: ScheduleEntry[] = await db
    .select()
    .from(scheduleEntries)
    .where(eq(scheduleEntries.userId, session.user.id));

  // Render the schedule page
  return (
    <section className="m-10">
      <h1 className="text-center text-3xl font-bold">Schedule</h1>
      <div className="mt-4">
        {/* Render the client-side schedule view with the user's schedule entries */}
        <ClientScheduleView scheduleEntriesData={scheduleEntriesData} />
      </div>
    </section>
  );
}
