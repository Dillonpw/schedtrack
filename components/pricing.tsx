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
      className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4 py-20 md:py-24 lg:py-32 xl:py-48"
    >
      <div className="flex w-full justify-center">
        <div className="rounded-lg border-2 bg-background p-4 text-sm shadow-lg dark:border dark:border-gray-600 md:p-10">
          <h3 className="mb-4 text-center text-xl font-bold md:text-4xl lg:text-5xl">
            Free Account
          </h3>
          <p className="mb-8 text-center text-muted-foreground">
            Start Scheduling
          </p>
          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-2">
              <span>Full access to our custom schedule generating technology</span>
            </li>
            <li className="flex items-center gap-2">
              <span>Access to List-view model and Calendar-view coming soon</span>
            </li>
            <li className="flex items-center gap-2">
              <span>Unlimited schedule adjustments and redos available </span>
            </li>
            <li className="flex items-center gap-2">
              <span>Schedule any length up to one year in the future</span>
            </li>
            <li className="flex items-center gap-2">
              <span>
                Your most recent schedule will always be a few clicks away
              </span>
            </li>
          </ul>
          <div className="flex items-center justify-between gap-2">
            <div className="font-bold md:text-2xl lg:text-5xl">FREE</div>
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
