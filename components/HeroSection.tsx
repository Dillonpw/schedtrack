"use client";

import { Calendar } from "./ui/calendar";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-32 xl:py-32">
      <div className="container px-4 md:px-16">
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="mx-auto text-center text-4xl font-bold tracking-tighter sm:text-4xl md:text-left lg:text-5xl">
                Effortless Schedule Management
              </h1>
              <p className="max-w-[600px] text-center text-muted-foreground md:text-left md:text-xl">
                Our rotating schedule builder helps{" "}
                <span className="font-semibold text-red-600">
                  First Responders
                </span>{" "}
                as well as a multidude of other professionals schedule next
                month, 6 months, or a year from now with ease. <br />
                <span className="font-semibold text-red-600">
                  Say goodbye to manual planning.
                </span>
              </p>
            </div>
            {children}
          </div>
          <motion.div
            drag={true}
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            className="mx-auto w-fit"
          >
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
