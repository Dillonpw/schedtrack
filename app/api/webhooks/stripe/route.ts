import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (!userId) {
          return new NextResponse("No user ID in session", { status: 400 });
        }

        await db
          .update(users)
          .set({
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            subscription: "pro",
          })
          .where(eq(users.id, userId));

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await db
          .update(users)
          .set({
            stripeSubscriptionId: null,
            subscription: "free",
          })
          .where(eq(users.stripeCustomerId, customerId));

        break;
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}
