import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Stripe from "stripe";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    });

    if (!user?.stripeSubscriptionId) {
      return new NextResponse("No subscription found", { status: 400 });
    }

    await stripe.subscriptions.cancel(user.stripeSubscriptionId);

    await db
      .update(users)
      .set({
        stripeSubscriptionId: null,
        subscription: "free",
      })
      .where(eq(users.id, session.user.id));

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
