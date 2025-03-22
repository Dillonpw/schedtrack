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

export default async function Pricing() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div
          data-testid="pricing"
          id="pricing"
          className="flex w-full flex-col items-stretch justify-center gap-8 lg:flex-row"
        >
          <div className="mx-auto w-full max-w-md lg:w-1/2">
            <Card className="group bg-card h-full overflow-hidden border transition-all duration-300 hover:shadow-lg dark:bg-gray-600">
              <CardHeader className="bg-card p-6 text-center dark:bg-gray-600">
                <CardTitle className="text-card-foreground text-2xl font-bold md:text-3xl">
                  Free Account
                </CardTitle>
                <p className="dark:text-primary/78 mt-2 text-base text-blue-700">
                  Perfect for Personal and Professional Use
                </p>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <ul className="space-y-4 text-sm">
                  {[
                    "Create and manage all types of schedules",
                    "Basic schedule patterns or complex custom schedules",
                    "Schedule for your entire team",
                    "Schedule up to 2 year into the future",
                    "Export to your preferred calendar app",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-1lh text-primary w-4 flex-shrink-0" />
                      <span className="text-card-foreground/90 group-hover:text-card-foreground transition-all duration-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto flex items-center justify-between gap-4 border-t p-6">
                <div className="text-card-foreground text-2xl font-bold md:text-3xl">
                  FREE <span className="text-primary/80 text-sm">for now</span>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  <Link href="/signin" prefetch={false}>
                    Get Started
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
