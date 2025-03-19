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
    <section className="px-4 py-16 lg:py-24">
      <div
        data-testid="pricing"
        id="pricing"
        className="flex w-full flex-col items-stretch justify-center gap-8 lg:flex-row"
      >
        <div className="mx-auto w-full max-w-md lg:w-1/2">
          <Card className="group h-full overflow-hidden border bg-card transition-all duration-300 hover:shadow-lg dark:bg-gray-600">
            <CardHeader className="bg-card p-6 text-center dark:bg-gray-600">
              <CardTitle className="text-2xl font-bold text-card-foreground md:text-3xl">
                Free Account
              </CardTitle>
              <p className="mt-2 text-base text-blue-700 dark:text-gray-200">
                Perfect for Personal Use
              </p>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <ul className="space-y-4 text-sm">
                {[
                  "Create and manage all types of schedules",
                  "Basic schedule patterns and templates",
                  "Schedule up to 2 year into the future",
                  "Export to your preferred calendar app",
                  "Mobile-friendly access",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-1lh w-4 flex-shrink-0 text-primary" />
                    <span className="text-card-foreground/90 transition-all duration-300 group-hover:text-card-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto flex items-center justify-between gap-4 border-t p-6">
              <div className="text-2xl font-bold text-card-foreground md:text-3xl">
                FREE
              </div>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground transition-all hover:bg-primary/90"
              >
                <Link href="/signin" prefetch={false}>
                  Get Started
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
