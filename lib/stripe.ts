import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil",
  typescript: true,
});

export const getStripeSession = async ({
  priceId,
  userId,
  email,
}: {
  priceId: string;
  userId: string;
  email: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/schedule?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/schedule?canceled=true`,
    customer_email: email,
    client_reference_id: userId,
    metadata: {
      userId,
    },
  });

  return session;
};
