"use client";

import { Calendar } from "./ui/calendar";
import React from "react";

const HeroSection = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-center mx-auto text-3xl font-bold tracking-tighter sm:text-4xl md:text-left lg:text-6xl">
                Effortless Rotating Schedule Management
              </h1>
              <p className="max-w-[600px] text-center text-muted-foreground md:text-left md:text-xl">
                Our rotating schedule builder helps{" "}
                <span className="font-semibold text-red-600">
                  First Responders
                </span>{" "}
                as well as a multidude of other professionals schedule next
                month, 6 months, or a year from now with ease.
                <br /> Say goodbye to manual planning.
              </p>
            </div>
            {children}
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
