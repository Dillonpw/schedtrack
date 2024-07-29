import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function Pricing() {
  return (
    <div
      id="pricing"
      className="mx-auto max-w-6xl gap-6 px-4 py-20 md:py-24 lg:py-32 xl:py-48"
    >
      <div className="flex items-center justify-center">
        <Badge className="mb-4 animate-bounce px-6 py-3 text-2xl font-bold md:text-4xl lg:text-5xl">
          Limited Time
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-lg border-2 bg-background p-10 shadow-lg dark:border dark:border-gray-600">
          <div className="p-6 md:p-8">
            <h3 className="mb-4 text-center text-xl font-bold md:text-4xl lg:text-5xl">
              Free Account
            </h3>
            <p className="mb-8 text-center text-muted-foreground">
              Sample the product
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>
                  Limited access to our schedule generating technology
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>Access to List-view model</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>Unlimited schedule adjustments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>Schedule 2 months into the future</span>
              </li>
            </ul>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold md:text-4xl lg:text-5xl">
                $0/mo
              </div>
              <Button asChild variant="default">
                <Link href="#" prefetch={false}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border-2 bg-background p-10 shadow-lg dark:border dark:border-gray-600">
          <div className="p-6 md:p-8">
            <h3 className="mb-4 text-center text-xl font-bold md:text-4xl lg:text-5xl">
              Subscribe
            </h3>
            <p className="mb-8 text-center text-muted-foreground">
              Perfect for individuals
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>Full access to our schedule generating technology</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>
                  Access to List-view model and upcoming calendar model
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>Unlimited schedule adjustments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-primary" />
                <span>Schedule 12 months into the future</span>
              </li>
            </ul>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold md:text-4xl lg:text-5xl">
                $3/mo
              </div>
              <Button asChild variant="default">
                <Link href="#" prefetch={false}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
