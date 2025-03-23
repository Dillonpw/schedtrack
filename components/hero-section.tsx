"use client";

import { Calendar } from "./ui/calendar";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-[600px] text-center text-2xl font-bold sm:text-left sm:text-4xl lg:text-5xl"
              >
                Smart Schedule Management
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-foreground max-w-[600px] text-center sm:text-left md:text-left md:text-xl"
              >
                Our intelligent schedule builder helps you manage any type of
                schedule - from regular 9-5 shifts to complex rotating patterns.
                Perfect for{" "}
                <span className="font-semibold text-blue-700 dark:text-red-500">
                  Everyone
                </span>{" "}
                who need to plan ahead, whether it's for next month, 6 months,
                or years.
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
