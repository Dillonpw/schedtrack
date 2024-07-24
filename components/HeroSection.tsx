"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import React from "react";

const HeroSection = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-left lg:text-6xl">
                Effortless Rotating Schedule Management
              </h1>
              <p className="max-w-[600px] text-center text-muted-foreground md:text-left md:text-xl">
                Our rotating schedule builder helps professionals track, share,
                and schedule with ease. Say goodbye to manual planning.
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 md:justify-start">
              <Button variant="default" asChild>
                <Link href="/signin" prefetch={false}>
                  Get Started
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/signin" prefetch={false}>
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-fit">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
