"use server"

import { db } from "@/db/index"
import { schedules } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function deleteSchedule(scheduleId: number): Promise<{ success: boolean; message: string }> {
  try {
    // Get the user ID from the authentication session
    const session = await auth()
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Not authenticated",
      }
    }

    const userId = session.user.id

    // Delete the schedule, ensuring it belongs to the current user
    const result = await db.delete(schedules).where(and(eq(schedules.id, scheduleId), eq(schedules.userId, userId)))

    // Revalidate the schedule page to refresh the data
    revalidatePath("/schedule")

    return {
      success: true,
      message: "Schedule deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting schedule:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete schedule",
    }
  }
}

