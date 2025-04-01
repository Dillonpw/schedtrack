"use server";

import { db } from "@/db/schema";
import { schedules } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface ScheduleEntryUpdate {
  id: number;
  shift: "On" | "Off";
  note: string | null;
  description: string | null;
  repeatEvents?: {
    days: string[];
    startDate: string;
    endDate: string;
  } | null;
}

export async function updateScheduleEntry(
  scheduleId: number,
  entryId: number,
  update: ScheduleEntryUpdate,
) {
  console.log("Starting updateScheduleEntry with:", {
    scheduleId,
    entryId,
    update,
  });
  try {
    // First, get the current schedule
    const [schedule] = await db
      .select({ schedule: schedules.schedule })
      .from(schedules)
      .where(eq(schedules.id, scheduleId));

    console.log("Retrieved schedule:", JSON.stringify(schedule, null, 2));

    if (!schedule) {
      console.error("Schedule not found for ID:", scheduleId);
      return { success: false, error: "Schedule not found" };
    }

    // Parse the JSON schedule if it's a string
    const entries =
      typeof schedule.schedule === "string"
        ? JSON.parse(schedule.schedule)
        : schedule.schedule;

    console.log("Current entries:", JSON.stringify(entries, null, 2));

    // Find and update the specific entry
    const updatedEntries = entries.map((entry: any) => {
      if (entry.id === entryId) {
        console.log("Found entry to update:", {
          old: entry,
          new: {
            ...entry,
            shift: update.shift,
            note: update.note,
            description: update.description,
            repeatEvents: entry.repeatEvents, // Preserve existing repeatEvents
          },
        });

        // Create updated entry
        const updatedEntry = {
          ...entry,
          shift: update.shift,
          note: update.note,
          description: update.description,
          repeatEvents: entry.repeatEvents, // Preserve existing repeatEvents
        };

        return updatedEntry;
      }
      return entry;
    });

    console.log("Updated entries:", JSON.stringify(updatedEntries, null, 2));

    // Update the schedule in the database
    const result = await db
      .update(schedules)
      .set({
        schedule: updatedEntries,
        updatedAt: new Date(),
      })
      .where(eq(schedules.id, scheduleId))
      .returning({ updatedSchedule: schedules.schedule });

    console.log("Database update result:", JSON.stringify(result, null, 2));

    revalidatePath("/schedule");
    return { success: true };
  } catch (error) {
    console.error("Error updating schedule entry:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update schedule entry" };
  }
}
