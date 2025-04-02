import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    subscription?: "free" | "pro";
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
    stripePriceId?: string | null;
    stripeCurrentPeriodEnd?: Date | null;
  }

  interface Session {
    user: User & {
      id: string;
    };
  }
}
