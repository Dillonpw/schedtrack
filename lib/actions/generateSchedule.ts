"use server";

import { db } from "@/db/index";
import { schedules, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
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

    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setHours(12, 0, 0, 0);

    const schedule = createRotatingSchedule(
      segments,
      totalDays,
      adjustedStartDate,
    );

    try {
      await db.insert(schedules).values({
        userId,
        name: name.trim(),
        schedule: JSON.stringify(schedule),
      });

      await db
        .update(users)
        .set({ lastScheduleUpdate: new Date() })
        .where(eq(users.id, userId));

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

  const hasRotatingSchedule = segments.some(
    (segment) => segment.days && segment.days > 0,
  );

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

    let currentSegment;
    if (hasRotatingSchedule && dayToSegmentMap) {
      const cyclePosition = i % cycleLength;
      currentSegment = dayToSegmentMap[cyclePosition];
    } else {
      currentSegment = segments.find(
        (segment) => segment.repeatEvents && segment.repeatEvents.length > 0,
      );
    }

    const dayRepeatEvents = currentSegment?.repeatEvents?.filter(
      (event: { daysOfWeek: number[]; repeatInterval: number }) => {
        const isCorrectDay = event.daysOfWeek.includes(entryDate.getUTCDay());
        if (!isCorrectDay) return false;

        if (event.repeatInterval === 52) {
          const isAnniversaryDate =
            entryDate.getUTCMonth() === startDate.getUTCMonth() &&
            entryDate.getUTCDate() === startDate.getUTCDate();

          if (!isAnniversaryDate) return false;

          const yearDifference =
            entryDate.getUTCFullYear() - startDate.getUTCFullYear();
          return yearDifference >= 0;
        }

        const weekNumber = Math.floor(i / 7);
        return weekNumber % event.repeatInterval === 0;
      },
    );

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
      description:
        dayRepeatEvents && dayRepeatEvents.length > 0
          ? dayRepeatEvents[0].description
          : currentSegment?.description || null,
      repeatEvents: dayRepeatEvents || null,
    });

    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return schedule;
}
