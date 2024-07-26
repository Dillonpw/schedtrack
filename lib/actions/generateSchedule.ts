import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

interface GenerateScheduleParams {
  workDays: number;
  offDays: number;
  totalDays: number;
  startDate: Date;
}

interface ScheduleEntry {
  date: string;
  dayOfWeek: string;
  shift: string;
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
  
  await db.update(users)
    .set({ 
      schedule: schedule as any, // Cast to any to avoid type issues
      lastScheduleUpdate: new Date()
    })
    .where(eq(users.id, userId));
  
  return userId;
}

function generateRotatingSchedule(
  workDays: number,
  offDays: number,
  totalDays: number,
  startDate: Date,
): ScheduleEntry[] {
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