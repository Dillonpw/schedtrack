import Link from "next/link";
import { Badge } from "./ui/badge";

export default function Pricing() {
  return (
    <div id="pricing" className="mx-auto max-w-xl gap-6 md:py-24 lg:py-32 xl:py-48">
        <div className="flex items-center justify-center">
      <Badge className="animate-bounce py-2 px-4 text-4xl font-bold">
        Limited time offer
      </Badge>
      </div>
      <div className="overflow-hidden rounded-lg border-2 bg-background p-10 shadow-lg dark:border dark:border-gray-600">
        <div className="p-6 md:p-8">
          <h3 className="mb-2 text-center text-4xl font-bold">Subscribe</h3>
          <p className="mb-6 text-center text-muted-foreground">
            Perfect for individuals
          </p>
          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-primary" />
              <span>Full access to our schedule generating technology</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-primary" />
              <span>Access to Calendar-view and List-view models</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-primary" />
              <span>Unlimited schedule adjustments</span>
            </li>
          </ul>
          <div className="flex items-end justify-between">
            <div className="text-4xl font-bold">$0/mo</div>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Get Started
            </Link>
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
