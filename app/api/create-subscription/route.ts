import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStripeSession } from "@/lib/stripe";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.email || !session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stripeSession = await getStripeSession({
      priceId: process.env.STRIPE_PRICE_ID!,
      userId: session.user.id,
      email: session.user.email,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
