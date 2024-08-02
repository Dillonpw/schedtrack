import Link from "next/link";
import { Button } from "./ui/button";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center mx-auto max-w-6xl gap-6 px-4 py-20 md:py-24 lg:py-32 xl:py-48"
    >
      <div className="flex justify-center w-full">
        <div className="rounded-lg border-2 bg-background p-10 shadow-lg dark:border dark:border-gray-600 max-w-[50%]">
            <h3 className="mb-4 text-center text-xl font-bold md:text-4xl lg:text-5xl">
              Free Account
            </h3>
            <p className="mb-8 text-center text-muted-foreground">
              Start Scheduling
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>
                 Full to our schedule generating technology
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>Access to List-view model and upcoming calendar view</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>Unlimited schedule adjustments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>Schedule up to 12 months into the future</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>
                 Your most recent schedule will alwasy be saved in our database and reviewable
                </span>
              </li>
            </ul>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold md:text-4xl lg:text-5xl">
                FREE
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

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
