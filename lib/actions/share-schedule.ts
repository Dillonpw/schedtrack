"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { schedules, sharedSchedules, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function shareSchedule(
  scheduleId: number,
  sharedWithEmail: string,
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    // Check if user is pro
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    });

    if (user?.subscription !== "pro") {
      throw new Error("Pro subscription required");
    }

    // Get the schedule
    const schedule = await db.query.schedules.findFirst({
      where: eq(schedules.id, scheduleId),
    });

    if (!schedule) {
      throw new Error("Schedule not found");
    }

    // Check if user owns the schedule
    if (schedule.userId !== session.user.id) {
      throw new Error("Unauthorized");
    }

    // Get the user to share with
    const sharedWithUser = await db.query.users.findFirst({
      where: eq(users.email, sharedWithEmail),
    });

    if (!sharedWithUser) {
      throw new Error("User not found");
    }

    // Check if schedule is already shared
    const existingShare = await db.query.sharedSchedules.findFirst({
      where: and(
        eq(sharedSchedules.scheduleId, scheduleId),
        eq(sharedSchedules.sharedWithUserId, sharedWithUser.id),
      ),
    });

    if (existingShare) {
      throw new Error("Schedule already shared with this user");
    }

    // Create the share
    await db.insert(sharedSchedules).values({
      scheduleId,
      sharedByUserId: session.user.id,
      sharedWithUserId: sharedWithUser.id,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sharing schedule:", error);
    throw error;
  }
}
