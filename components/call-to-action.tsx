import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="from-primary to-secondary bg-gradient-to-r pb-1 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl">
              Ready to simplify your scheduling?
            </h2>
            <p className="text-muted-foreground max-w-[600px] md:text-xl">
              Say goodbye to scheduling headaches. Our intuitive platform makes
              creating and managing rotating schedules effortless.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/generate">
                <Button className="from-primary to-secondary text-primary-foreground group bg-gradient-to-r">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  variant="outline"
                  className="border-secondary/50 hover:bg-secondary/5 hover:text-secondary"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>

          <div className="border-primary/20 relative rounded-lg border p-6 shadow-lg">
            <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
            <div className="relative">
              <h3 className="from-primary to-secondary mb-3 bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent">
                Why our users love Sched Track
              </h3>
              <ul className="space-y-3">
                {[
                  "Easy schedule creation in just minutes",
                  "Clear visual calendar for your entire team",
                  "Mobile-friendly for on-the-go access",
                  "Free tier available for small teams",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`mr-2 h-5 w-5 ${i % 2 === 0 ? "text-primary" : "text-secondary"}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
