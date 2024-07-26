'use server'

import { db } from '@/db/index';
import { scheduleEntries } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';


interface GenerateScheduleParams {
  workDays: number;
  offDays: number;
  totalDays: number;
  startDate: Date;
}

export async function generateSchedule({
  workDays,
  offDays,
  totalDays,
  startDate,
}: GenerateScheduleParams) {
  const session = await auth()
  if (!session || !session.user?.id) {
    throw new Error("Not authenticated")
  }

  const userId = session.user.id
  const schedule = generateRotatingSchedule(workDays, offDays, totalDays, startDate);
  
  // Delete existing schedule for the user
  await db.delete(scheduleEntries).where(eq(scheduleEntries.userId, userId));
  
  // Insert new schedule
  const newSchedule = schedule.map(entry => ({ ...entry, userId }));
  const [result] = await db.insert(scheduleEntries).values(newSchedule).returning({ id: scheduleEntries.id });
  
  return result.id;
}

function generateRotatingSchedule(
  workDays: number,
  offDays: number,
  totalDays: number,
  startDate: Date,
) {
  const schedule = [];
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);
  let daysScheduled = 0;

  while (daysScheduled < totalDays) {
    const formattedDate = formatDate(currentDate);
    const dayOfWeek = getDayOfWeek(currentDate.getDay());
    const shift =
      daysScheduled % (workDays + offDays) < workDays ? "Work" : "Off";

    schedule.push({ date: formattedDate, dayOfWeek, shift });
    daysScheduled++;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return schedule;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}-${year}`;
}

function getDayOfWeek(dayIndex: number): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayIndex];
}
