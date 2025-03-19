"use server";

import { db } from "@/db/index";
import { schedules, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { ShiftSegment } from "@/types";

interface GenerateScheduleParams {
  segments: ShiftSegment[];
  totalDays: number;
  startDate: Date;
  name: string;
}

interface ScheduleEntry {
  date: string;
  dayOfWeek: string;
  shift: "Work" | "Off";
  title: string | null;
  description: string | null;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function generateSchedule({
  segments,
  totalDays,
  startDate,
  name,
}: GenerateScheduleParams): Promise<string> {
  try {
    console.log("Starting schedule generation with params:", {
      name,
      totalDays,
      startDate,
    });
    console.log("Segments:", segments);

    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }

    console.log("User authenticated:", session.user.id);
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

    console.log("All validations passed");

    console.log("Creating rotating schedule...");
    const schedule = createRotatingSchedule(segments, totalDays, startDate);
    console.log("Schedule created with", schedule.length, "entries");

    console.log("Starting database transaction...");
    try {
      await db.transaction(async (tx) => {
        console.log("Inserting schedule record...");
        const result = await tx.insert(schedules).values({
          userId,
          name: name.trim(),
          schedule: JSON.stringify(schedule),
        });
        console.log("Schedule inserted successfully");

        console.log("Updating user's last schedule update time...");
        await tx
          .update(users)
          .set({ lastScheduleUpdate: new Date() })
          .where(eq(users.id, userId));
        console.log("User updated successfully");
      });
      console.log("Transaction completed successfully");
    } catch (dbError) {
      console.error("Database error details:", dbError);
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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createRotatingSchedule(
  segments: ShiftSegment[],
  totalDays: number,
  startDate: Date,
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];

  if (!segments || segments.length === 0) {
    throw new Error("At least one segment is required");
  }

  const cycleLength = segments.reduce(
    (sum, segment) => sum + (segment.days || 0),
    0,
  );
  if (cycleLength <= 0) {
    throw new Error("Total cycle length must be greater than 0");
  }

  const dayToSegmentMap: ShiftSegment[] = [];
  segments.forEach((segment) => {
    const days = segment.days || 0;
    for (let i = 0; i < days; i++) {
      dayToSegmentMap.push(segment);
    }
  });

  // Generate the schedule
  const currentDate = new Date(startDate);
  for (let i = 0; i < totalDays; i++) {
    const cyclePosition = i % cycleLength;
    const segment = dayToSegmentMap[cyclePosition];

    schedule.push({
      date: formatDate(new Date(currentDate)),
      dayOfWeek: DAYS_OF_WEEK[currentDate.getDay()],
      shift: segment.shiftType as "Work" | "Off",
      title: segment.note || null,
      description: segment.description || null,
    });

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
}
