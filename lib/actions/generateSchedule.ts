"use server";

import { db } from "@/db/index";
import { scheduleEntries, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { ShiftSegment } from "@/types";

// Types
interface GenerateScheduleParams {
  segments: ShiftSegment[];
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
  segments,
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
  const schedule = createRotatingSchedule(segments, totalDays, startDate);

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

  return userId;
}

function createRotatingSchedule(
  segments: ShiftSegment[],
  totalDays: number,
  startDate: Date,
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];
  const cycleLength = segments.reduce(
    (sum, segment) => sum + (segment.days ?? 0),
    0,
  );

  if (cycleLength === 0) {
    throw new Error(
      "Invalid segments: Each segment must have a valid number of days.",
    );
  }

  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);

  let cycleDay = 0;

  for (let day = 0; day < totalDays; day++) {
    let dayInCycle = cycleDay % cycleLength;
    let accumulatedDays = 0;
    let currentSegment: ShiftSegment | null = null;

    for (const segment of segments) {
      const segmentDays = segment.days ?? 0;
      accumulatedDays += segmentDays;
      if (dayInCycle < accumulatedDays) {
        currentSegment = segment;
        break;
      }
    }

    if (!currentSegment) {
      // Fallback in case no segment is found
      currentSegment = segments[segments.length - 1];
    }

    schedule.push({
      date: formatDate(currentDate),
      dayOfWeek: DAYS_OF_WEEK[currentDate.getDay()],
      shift: currentSegment.shiftType,
    });

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
    cycleDay++;
  }

  return schedule;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const dayOfMonth = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${dayOfMonth}`;
}
