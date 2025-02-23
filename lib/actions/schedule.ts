"use server"

import { db, scheduleEntries } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getScheduleForUser(userId: string) {
  if (!userId) {
    throw new Error("User ID is required")
  }

  try {
    const userSchedule = await db.select().from(scheduleEntries).where(eq(scheduleEntries.userId, userId))

    return userSchedule
  } catch (error) {
    console.error("Failed to fetch schedule:", error)
    throw new Error("Failed to fetch schedule")
  }
}

