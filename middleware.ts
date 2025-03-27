import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function middleware(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") || "";
  let deviceType = "Desktop";

  if (/mobile/i.test(userAgent)) {
    deviceType = "Mobile";
  } else if (/tablet/i.test(userAgent)) {
    deviceType = "Tablet";
  }

  try {
    await db
      .update(users)
      .set({ deviceType })
      .where(eq(users.id, session.user.id));
  } catch (error) {
    console.error("Error updating device type:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
