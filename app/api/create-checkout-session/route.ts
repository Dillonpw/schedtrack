import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.STRIPE_PRICE_ID) {
      console.error("STRIPE_PRICE_ID is not defined");
      return new NextResponse("Stripe price ID is not configured", {
        status: 500,
      });
    }

    if (!process.env.STRIPE_COUPON_ID) {
      console.error("STRIPE_COUPON_ID is not defined");
      return new NextResponse("Stripe coupon ID is not configured", {
        status: 500,
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      discounts: [
        {
          coupon: process.env.STRIPE_COUPON_ID,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/schedule?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/schedule?canceled=true`,
      customer_email: session.user.email!,
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
