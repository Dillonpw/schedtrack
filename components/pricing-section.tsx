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
import { auth } from "@/auth";

export default async function Pricing() {
  const session = await auth();
  if (!session) {
    <section
      id="pricing"
      data-testid="pricing"
      className="flex max-w-6xl flex-col items-center justify-center gap-6 bg-muted py-20 md:py-24 lg:py-32 xl:py-48 w-full"    >
      <Card className="max-w-md overflow-hidden hover:shadow-lg dark:bg-gray-600">
        <CardHeader className="p-6 text-center dark:bg-background dark:text-gray-100">
          <CardTitle className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Free Account
          </CardTitle>
          <p className="mt-2 text-sm dark:text-gray-100">Start Scheduling</p>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="mb-6 space-y-4 text-sm">
            {[
              "Full access to our custom schedule generating technology",
              "Unlimited schedule adjustments and redos",
              "Schedule up to 2 years into the future",
              "Your most recent schedule will always be a few clicks away",
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-4 border-t p-6">
          <div className="text-2xl font-bold md:text-3xl lg:text-4xl">FREE</div>
          <Button
            asChild
            size="lg"
            className="transition-transform hover:scale-105"
          >
            <Link href="/signin" prefetch={false}>
              Get Started
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>;
  }
  return (
    <section
      id="pricing"
      data-testid="pricing"
      className="flex flex-col items-center justify-center gap-6 bg-border dark:bg-muted py-20 md:py-24 lg:py-32 xl:py-48 w-full"    >
      <Card className="w-full max-w-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg dark:bg-gray-600">
        <CardHeader className="p-6 text-center dark:bg-background dark:text-gray-100">
          <CardTitle className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Free Account
          </CardTitle>
          <p className="mt-2 text-sm dark:text-gray-100">Start Scheduling</p>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="mb-6 space-y-4 text-sm">
            {[
              "Full access to our custom schedule generating technology",
              "Unlimited schedule adjustments and redos",
              "Schedule up to 2 years into the future",
              "Your most recent schedule will always be a few clicks away",
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
