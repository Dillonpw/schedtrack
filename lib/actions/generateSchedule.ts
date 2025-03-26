"use server";

import { db } from "@/db/index";
import { schedules, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import type { ShiftSegment } from "@/types";
import { revalidatePath } from "next/cache";
import { GenerateScheduleParams, ScheduleEntry } from "@/types";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function generateSchedule({
  segments,
  totalDays,
  startDate,
  name,
}: GenerateScheduleParams): Promise<string> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }

    const userId = session.user.id;

    if (!name || name.trim().length === 0) {
      throw new Error("Schedule name is required");
    }

    if (!segments || segments.length === 0) {
      throw new Error("At least one segment is required");
    }

    if (totalDays <= 0) {
      throw new Error("Total days must be greater than 0");
    }

    if (totalDays > 730) {
      throw new Error("Schedule cannot exceed 2 years (730 days)");
    }

    if (!startDate || isNaN(startDate.getTime())) {
      throw new Error("Invalid start date");
    }

    // Create a new date object to avoid timezone issues
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setHours(12, 0, 0, 0);

    const schedule = createRotatingSchedule(
      segments,
      totalDays,
      adjustedStartDate,
    );

    try {
      await db.transaction(async (tx) => {
        await tx.insert(schedules).values({
          userId,
          name: name.trim(),
          schedule: JSON.stringify(schedule),
        });

        await tx
          .update(users)
          .set({ lastScheduleUpdate: new Date() })
          .where(eq(users.id, userId));
      });

      revalidatePath("/schedule");
    } catch (dbError) {
      console.error("Database error:", dbError);
      throw new Error(
        `Database operation failed: ${dbError instanceof Error ? dbError.message : String(dbError)}`,
      );
    }

    return userId;
  } catch (error) {
    console.error("Error generating schedule:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to generate schedule");
  }
}

function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createRotatingSchedule(
  segments: {
    shiftType: "On" | "Off";
    days: number | undefined;
    note: string | null;
    description: string | null;
    repeatEvents?: {
      id: string;
      description: string | null;
      daysOfWeek: number[];
      repeatInterval: number;
    }[];
  }[],
  totalDays: number,
  startDate: Date,
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];

  if (!segments || segments.length === 0) {
    throw new Error("At least one segment is required");
  }

  // Check if we have any segments with days defined (rotating schedule)
  const hasRotatingSchedule = segments.some(
    (segment) => segment.days && segment.days > 0,
  );

  // If no rotating schedule, we need at least one repeat event
  if (!hasRotatingSchedule) {
    const hasRepeatEvents = segments.some(
      (segment) => segment.repeatEvents && segment.repeatEvents.length > 0,
    );
    if (!hasRepeatEvents) {
      throw new Error(
        "Either rotating schedule days or repeat events must be defined",
      );
    }
  }

  const cycleLength = segments.reduce(
    (sum, segment) => sum + (segment.days || 0),
    0,
  );

  // Only create dayToSegmentMap if we have a rotating schedule
  const dayToSegmentMap = hasRotatingSchedule
    ? segments.flatMap((segment) => {
        const days = segment.days || 0;
        return Array(days).fill(segment);
      })
    : null;

  const currentDate = new Date(
    Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      12,
      0,
      0,
      0,
    ),
  );

  for (let i = 0; i < totalDays; i++) {
    const entryDate = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        12,
        0,
        0,
        0,
      ),
    );

    // Get the current day's segment based on schedule type
    let currentSegment;
    if (hasRotatingSchedule && dayToSegmentMap) {
      const cyclePosition = i % cycleLength;
      currentSegment = dayToSegmentMap[cyclePosition];
    } else {
      // For repeating schedule, use the first segment that has repeat events
      currentSegment = segments.find(
        (segment) => segment.repeatEvents && segment.repeatEvents.length > 0,
      );
    }

    // Check for repeat events on this day
    const dayRepeatEvents = currentSegment?.repeatEvents?.filter(
      (event: { daysOfWeek: number[]; repeatInterval: number }) => {
        // First check if this is a day we want to show the event
        const isCorrectDay = event.daysOfWeek.includes(entryDate.getUTCDay());
        if (!isCorrectDay) return false;

        // Calculate the week number since the start date
        const weekNumber = Math.floor(i / 7);
        // Check if this week should be included based on the repeat interval
        return weekNumber % event.repeatInterval === 0;
      },
    );

    // For weekly schedule, only show the event on selected days
    const shift = hasRotatingSchedule
      ? currentSegment?.shiftType || "Off"
      : dayRepeatEvents && dayRepeatEvents.length > 0
        ? currentSegment?.shiftType || "Off"
        : "Off";

    schedule.push({
      id: i + 1,
      date: formatDate(entryDate),
      dayOfWeek: DAYS_OF_WEEK[entryDate.getUTCDay()],
      shift,
      note: currentSegment?.note || null,
      description: currentSegment?.description || null,
      repeatEvents: dayRepeatEvents || null,
    });

    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return schedule;
}
