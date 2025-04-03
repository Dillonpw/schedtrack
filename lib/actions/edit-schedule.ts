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
  repeatEvents?:
    | {
        id: string;
        description: string | null;
        daysOfWeek: number[];
      }[]
    | null;
}

export async function updateScheduleEntry(
  scheduleId: number,
  entryId: number,
  update: ScheduleEntryUpdate,
) {
  try {
    const [schedule] = await db
      .select({ schedule: schedules.schedule })
      .from(schedules)
      .where(eq(schedules.id, scheduleId));

    if (!schedule) {
      return { success: false, error: "Schedule not found" };
    }

    const entries =
      typeof schedule.schedule === "string"
        ? JSON.parse(schedule.schedule)
        : schedule.schedule;

    const updatedEntries = entries
      .filter((entry: any) => {
        if (entry.id === entryId) {
          if (update.shift === "Off" && !entry.repeatEvents) {
            return false;
          }
          return true;
        }
        return true;
      })
      .map((entry: any) => {
        if (entry.id === entryId) {
          return {
            ...entry,
            overrides: {
              ...(entry.overrides || {}),
              shift: update.shift,
              note: update.note,
              description: update.description,
            },
          };
        }
        return entry;
      });

    await db
      .update(schedules)
      .set({
        schedule: updatedEntries,
        updatedAt: new Date(),
      })
      .where(eq(schedules.id, scheduleId));

    revalidatePath("/schedule");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update schedule entry" };
  }
}
