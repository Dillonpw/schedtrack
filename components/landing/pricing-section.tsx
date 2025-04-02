import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscriptionButton } from "@/components/subscription/subscription-button";
import { auth } from "@/auth";

export default async function Pricing() {
  const session = await auth();
  const isPro = session?.user?.subscription === "pro";

  return (
    <section
      className="py-20 md:py-32 lg:py-40"
      id="pricing"
      data-testid="pricing"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
            Simple & Transparent Pricing
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-lg">
            Choose the plan that best fits your scheduling needs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:mx-auto lg:max-w-5xl">
          {/* Free Tier */}
          <Card className="border-primary/20 relative border shadow-lg">
            <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
            <div className="relative">
              <CardHeader className="text-center">
                <CardTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                  Free
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Perfect for getting started
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm">
                  {[
                    "Create up to 5 schedules",
                    "Schedule up to 2 year into the future",
                    "Access to all schedule patterns",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check
                        className={`h-5 w-5 ${index % 2 === 0 ? "text-primary" : "text-secondary"}`}
                      />
                      <span className="text-card-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-4 border-t pt-6">
                <div className="text-4xl font-bold">
                  FREE <span className="text-primary/80 text-sm">forever</span>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="from-primary to-secondary text-primary-foreground bg-gradient-to-r hover:scale-105"
                >
                  <Link href="/signin" prefetch={false}>
                    Get Started
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </Card>

          {/* Pro Tier */}
          <Card className="border-primary/20 relative border shadow-lg">
            <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
            <div className="relative">
              <CardHeader className="text-center">
                <CardTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                  Pro
                </CardTitle>
                <p className="text-muted-foreground mt-2">For power users</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm">
                  {[
                    "Unlimited schedules",
                    "Schedule up to 5 years into the future",
                    "Today view with current events",
                    "Priority support",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check
                        className={`h-5 w-5 ${index % 2 === 0 ? "text-primary" : "text-secondary"}`}
                      />
                      <span className="text-card-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-4 border-t pt-6">
                <div className="text-4xl font-bold">
                  $5.00 <span className="text-primary/80 text-sm">/month</span>
                </div>
                {session ? (
                  isPro ? (
                    <Button
                      asChild
                      size="lg"
                      className="from-primary to-secondary text-primary-foreground bg-gradient-to-r hover:scale-105"
                    >
                      <Link href="/schedule" prefetch={false}>
                        Manage Subscription
                      </Link>
                    </Button>
                  ) : (
                    <SubscriptionButton />
                  )
                ) : (
                  <Button
                    asChild
                    size="lg"
                    className="from-primary to-secondary text-primary-foreground bg-gradient-to-r hover:scale-105"
                  >
                    <Link href="/signin?plan=pro" prefetch={false}>
                      Get Started
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
