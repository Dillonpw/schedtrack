'use server';

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
  shift: 'Work' | 'Off';
}

// Constants
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

// Main function
export async function generateSchedule({
  workDays,
  offDays,
  totalDays,
  startDate,
}: GenerateScheduleParams): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;
  const schedule = createRotatingSchedule(workDays, offDays, totalDays, startDate);

  await db.transaction(async (tx) => {
    await tx.delete(scheduleEntries).where(eq(scheduleEntries.userId, userId));

    await tx.insert(scheduleEntries).values(
      schedule.map(entry => ({
        userId,
        ...entry
      }))
    );

    await tx.update(users)
      .set({ lastScheduleUpdate: new Date() })
      .where(eq(users.id, userId));
  });

  return userId;
}

// Helper functions
function createRotatingSchedule(
  workDays: number,
  offDays: number,
  totalDays: number,
  startDate: Date
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];
  const cycleLength = workDays + offDays;
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);

  for (let day = 0; day < totalDays; day++) {
    schedule.push({
      date: formatDate(currentDate),
      dayOfWeek: DAYS_OF_WEEK[currentDate.getDay()],
      shift: day % cycleLength < workDays ? 'Work' : 'Off'
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-');
}