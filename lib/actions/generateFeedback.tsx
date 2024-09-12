"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { feedbacks } from "@/db/schema";

export async function submitFeedback(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to submit feedback." };
  }

  const text = formData.get("feedback") as string;
  if (!text) {
    return { error: "Feedback text is required." };
  }

  try {
    await db.insert(feedbacks).values({
      userId: session.user.id,
      text,
      date: new Date(),
    });
    return { success: "Feedback submitted successfully!" };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return {
      error:
        "An error occurred while submitting your feedback. Please try again.",
    };
  }
}
