"use server";

import { db, scheduleEntries, schedules } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getScheduleForUser(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const userSchedule = await db
      .select()
      .from(scheduleEntries)
      .where(eq(scheduleEntries.userId, userId));

    return userSchedule;
  } catch (error) {
    console.error("Failed to fetch schedule:", error);
    throw new Error("Failed to fetch schedule");
  }
}

export async function updateScheduleEntry(
  entryId: number,
  updates: {
    shift?: string;
    note?: string;
    description?: string;
  },
): Promise<{ success: boolean; message: string }> {
  if (!entryId) {
    throw new Error("Entry ID is required");
  }

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }

    const userId = session.user.id;

    // Get all schedules for the user
    const userSchedules = await db
      .select()
      .from(schedules)
      .where(eq(schedules.userId, userId));

    console.log("Found schedules:", userSchedules.length);
    console.log("Looking for entry ID:", entryId);

    // Find the schedule containing the entry we want to update
    let updated = false;
    for (const schedule of userSchedules) {
      const entries =
        typeof schedule.schedule === "string"
          ? JSON.parse(schedule.schedule)
          : schedule.schedule;

      console.log("Checking schedule entries:", entries.length);
      console.log(
        "Entry IDs:",
        entries.map((e: any) => e.id),
      );

      const updatedEntries = entries.map((entry: any) => {
        if (entry.id === entryId) {
          updated = true;
          return { ...entry, ...updates };
        }
        return entry;
      });

      if (updated) {
        try {
          await db
            .update(schedules)
            .set({ schedule: updatedEntries })
            .where(eq(schedules.id, schedule.id));
          console.log("Successfully updated schedule");
        } catch (updateError) {
          console.error("Error updating schedule:", updateError);
          throw updateError;
        }
        break;
      }
    }

    if (!updated) {
      console.log("No matching entry found");
      return {
        success: false,
        message: "Schedule entry not found or unauthorized",
      };
    }

    revalidatePath("/schedule");

    return {
      success: true,
      message: "Schedule entry updated successfully",
    };
  } catch (error) {
    console.error("Failed to update schedule entry:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw new Error(
      `Failed to update schedule entry: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
