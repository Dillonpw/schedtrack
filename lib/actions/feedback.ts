"use server";

import { auth } from "@/auth";
import { db } from "@/db/index";
import { feedbacks } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function submitFeedback(text: string, type: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    if (!text) {
      throw new Error("Text is required");
    }

    await db.insert(feedbacks).values({
      userId: session.user.id,
      text: `[${type.toUpperCase()}] ${text}`,
      date: new Date(),
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("[FEEDBACK_SUBMIT]", error);
    throw error;
  }
}
