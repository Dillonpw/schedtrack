import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/auth";

export default async function Pricing() {
  const session = await auth();
  if (session) {
    return null;
  }
  return (
    <section
      id="pricing"
      data-testid="pricing"
      className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 bg-background px-4 py-20 md:py-24 lg:py-32 xl:py-48"
    >
      <div className="flex flex-col justify-center gap-4 md:max-w-full md:flex-row">
        <div className="max-w-[50%] rounded-lg border-2 p-4 text-sm shadow-lg dark:border dark:border-gray-600 md:p-10">
          <h3 className="mb-4 text-center text-xl font-bold md:text-4xl lg:text-4xl">
            Free Account
          </h3>
          <p className="mb-8 text-center text-muted-foreground">
            Start Scheduling
          </p>
          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-2">
              <span>
                Full access to our custom schedule generating technology
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span>Unlimited schedule adjustments and redos</span>
            </li>
            <li className="flex items-center gap-2">
              <span>Schedule up to 6 months into the future</span>
            </li>
            <li className="flex items-center gap-2">
              <span>
                Your most recent schedule will always be a few clicks away
              </span>
            </li>
          </ul>
          <div className="flex items-center justify-between gap-2">
            <div className="font-bold md:text-2xl lg:text-3xl">FREE</div>
            <Button asChild variant="default">
              <Link href="/signin" prefetch={false}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
        <div className="max-w-[50%] rounded-lg border-2 border-red-600 bg-muted p-4 text-sm shadow-lg md:p-10">
          <h3 className="mb-4 text-center text-xl font-bold md:text-4xl lg:text-4xl">
            Premium Account
          </h3>
          <p className="mb-8 text-center text-muted-foreground">
            Level Up Your Shift Management
          </p>
          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-2">
              <span>Every feature of the free plan included</span>
            </li>
            <li className="flex items-center gap-2">
              <span>Scheduling up to 18 months into the future</span>
            </li>
          </ul>
          <div className="flex items-center justify-between gap-2">
            <div className="font-bold md:text-2xl lg:text-3xl">
              $3/month USD
            </div>
            <Button asChild variant="default">
              <Link href="/signin" prefetch={false}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
