"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BlurBackground from "@/components/ui/blur-background";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="bg-background relative w-full overflow-hidden py-20 md:py-32 lg:py-40">
      <BlurBackground
        primaryColor="bg-primary/20"
        secondaryColor="bg-secondary/20"
        accentColor="bg-accent/10"
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col items-center xl:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-secondary/10 text-secondary mb-6 inline-flex justify-center rounded-full px-3 py-1 text-xs font-medium md:text-sm"
            >
              The complete schedule builder
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-left"
            >
              <span className="block">Build Any Schedule</span>
              <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text pr-2 text-transparent">
                Simple to Complex
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground mt-4 max-w-[600px] text-center md:text-xl xl:text-left"
            >
              Create any type of schedule with our powerful builder. From basic
              weekly plans to complex rotating patterns that other apps can't
              handle - we've got you covered.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 flex flex-col items-center gap-2 min-[400px]:flex-row xl:items-start"
            >
              <Link href="/generate" className="w-full min-[400px]:w-auto">
                <Button className="from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground group w-full bg-gradient-to-r min-[400px]:w-auto">
                  Start Building Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 flex flex-col items-center gap-4 md:flex-row xl:items-start"
            >
              {[
                {
                  icon: <Calendar className="text-primary h-4 w-4" />,
                  text: "Unlimited schedules",
                },
                {
                  icon: <Clock className="text-secondary h-4 w-4" />,
                  text: "Optimized for shift work",
                },
                {
                  icon: <Zap className="text-accent h-4 w-4" />,
                  text: "Fast & intuitive interface",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border-primary/10 bg-background/50 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm backdrop-blur-sm"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-card shadow-primary/5 relative mt-24 overflow-hidden rounded-xl border p-1 shadow-xl"
          >
            <div className="from-primary/30 to-secondary/30 absolute -inset-1 rounded-xl bg-gradient-to-r opacity-20 blur-md"></div>
            <div className="relative overflow-hidden rounded-lg">
              <video
                autoPlay
                muted
                loop
                className="aspect-video w-full rounded-lg object-cover"
                src="/schedtrack-demo.mp4"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
