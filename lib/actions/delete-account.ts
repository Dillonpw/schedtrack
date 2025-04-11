import { auth } from "@/auth";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const userId = session.user.id;

  await db.delete(users).where(eq(users.id, userId));

  return { success: true };
}
