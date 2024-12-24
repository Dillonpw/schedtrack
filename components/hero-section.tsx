"use client";

import { Calendar } from "./ui/calendar";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="w-full bg-muted py-40 md:pb-60 md:pt-40">
      <div className="container px-4 md:px-16">
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                className="mx-auto text-center text-4xl font-bold tracking-tighter sm:text-4xl md:text-left lg:text-5xl"
              >
                Effortless Schedule Management
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-[600px] text-center text-foreground md:text-left md:text-xl"
              >
                Our rotating schedule builder helps{" "}
                <span className="font-semibold text-blue-700 dark:text-red-500">
                  First Responders
                </span>{" "}
                as well as a multidude of other professionals schedule next
                month, 6 months, or a year from now with ease. <br />
                <span className="font-semibold text-blue-700 dark:text-red-500">
                  Say goodbye to manual planning.
                </span>
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {children}
            </motion.div>{" "}
          </div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
