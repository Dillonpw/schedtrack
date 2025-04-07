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
    <section
      className="py-20 md:py-32 lg:py-40"
      id="pricing"
      data-testid="pricing"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h4 className="from-primary to-secondary bg-gradient-to-r bg-clip-text pb-1 text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
            Simple & Transparent Pricing
          </h4>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-lg">
            Everything you need to create and manage your schedules, with no
            hidden fees.
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <Card className="border-primary/20 relative border shadow-lg">
            <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
            <div className="relative">
              <CardHeader className="text-center">
                <CardTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                  Free Account
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Perfect for Personal and Professional Use
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm">
                  {[
                    "Create and manage all types of schedules",
                    "Basic schedule patterns or complex custom schedules",
                    "Schedule for your entire team",
                    "Schedule up to 2 year into the future",
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
                  FREE <span className="text-primary/80 text-sm">for now</span>
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
        </div>
      </div>
    </section>
  );
}
