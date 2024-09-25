"use server";

import { db } from "@/db/index";
import { scheduleEntries, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

// Types
interface GenerateScheduleParams {
  workDays: number;
  offDays: number;
  totalDays: number;
  startDate: Date;
}

interface ScheduleEntry {
  date: string;
  dayOfWeek: string;
  shift: "Work" | "Off";
}

// Constants
const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;


export async function generateSchedule({
  workDays,
  offDays,
  totalDays,
  startDate,
}: GenerateScheduleParams): Promise<string> {
  // Get the user ID from the authentication session.
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;

  // Create the schedule.
  const schedule = createRotatingSchedule(
    workDays,
    offDays,
    totalDays,
    startDate,
  );

  // Save the schedule to the database.
  await db.transaction(async (tx) => {
    // Delete the old schedule entries.
    await tx.delete(scheduleEntries).where(eq(scheduleEntries.userId, userId));

    // Insert the new schedule entries.
    await tx.insert(scheduleEntries).values(
      schedule.map((entry) => ({
        userId,
        ...entry,
      })),
    );

    // Update the user's last schedule update time.
    await tx
      .update(users)
      .set({ lastScheduleUpdate: new Date() })
      .where(eq(users.id, userId));
  });

  // Return the user ID.
  return userId;
}


function createRotatingSchedule(
  workDays: number,
  offDays: number,
  totalDays: number,
  startDate: Date,
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];
  const cycleLength = workDays + offDays;
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);

  // Iterate over the total number of days in the schedule and create a ScheduleEntry
  // for each day.
  for (let day = 0; day < totalDays; day++) {
    schedule.push({
      // The date of the ScheduleEntry is the current date, formatted as a string.
      date: formatDate(currentDate),
      // The day of week of the ScheduleEntry is the day of week of the current date.
      dayOfWeek: DAYS_OF_WEEK[currentDate.getDay()],
      // The shift of the ScheduleEntry is determined by the day of the cycle.
      // If the day is before the number of work days, the shift is "Work", otherwise
      // it is "Off".
      shift: day % cycleLength < workDays ? "Work" : "Off",
    });
    // Move on to the next day.
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
}

/**
 * Formats a date as a string in the format 'YYYY-MM-DD'.
 *
 * @param {Date} date - The date to format.
 * @returns {string} The date formatted as a string in the format 'YYYY-MM-DD'.
 */
function formatDate(date: Date): string {
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-"); // Replace the slash with a dash.
}
