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
  title: string | null;
}

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
  // Validate inputs
  if (!segments?.length || !totalDays || !startDate) {
    throw new Error("Missing required parameters");
  }

  // Get the user ID from the authentication session
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;

  try {
    // Create the schedule
    const schedule = createRotatingSchedule(segments, totalDays, startDate);

    // Save the schedule to the database
    await db.transaction(async (tx) => {
      // Delete existing schedule entries
      await tx
        .delete(scheduleEntries)
        .where(eq(scheduleEntries.userId, userId));

      // Insert new schedule entries in batches
      const batchSize = 100;
      for (let i = 0; i < schedule.length; i += batchSize) {
        const batch = schedule.slice(i, i + batchSize).map((entry) => ({
          userId,
          ...entry,
        }));
        await tx.insert(scheduleEntries).values(batch);
      }

      // Update user's last schedule update time
      await tx
        .update(users)
        .set({ lastScheduleUpdate: new Date() })
        .where(eq(users.id, userId));
    });

    return userId;
  } catch (error) {
    console.error("Schedule generation error:", error);
    throw new Error("Failed to generate schedule");
  }
}

function createRotatingSchedule(
  segments: ShiftSegment[],
  totalDays: number,
  startDate: Date,
): ScheduleEntry[] {
  // Validate segments
  if (!segments.every((segment) => segment.days && segment.days > 0)) {
    throw new Error("All segments must have a valid number of days");
  }

  const schedule: ScheduleEntry[] = [];
  const cycleLength = segments.reduce((sum, segment) => sum + segment.days!, 0);

  // Clone the start date to avoid modifying the input
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);

  for (let day = 0; day < totalDays; day++) {
    let dayInCycle = day % cycleLength;
    let currentSegment = findSegmentForDay(segments, dayInCycle);

    if (!currentSegment) {
      throw new Error("Failed to find matching segment");
    }

    schedule.push({
      date: formatDate(currentDate),
      dayOfWeek: DAYS_OF_WEEK[currentDate.getDay()],
      shift: currentSegment.shiftType,
      title: currentSegment.title || null,
    });

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
}

function findSegmentForDay(
  segments: ShiftSegment[],
  dayInCycle: number,
): ShiftSegment | null {
  let accumulatedDays = 0;

  for (const segment of segments) {
    accumulatedDays += segment.days!;
    if (dayInCycle < accumulatedDays) {
      return segment;
    }
  }

  return null;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
