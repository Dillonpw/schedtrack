"use client";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Component() {
  const features = [
    {
      title: "Handle Any Schedule Complexity",
      description:
        "Build any type of schedule you need. From simple weekly plans to complex rotating patterns, our flexible system handles schedules that other apps simply can't support.",
    },
    {
      title: "Specialized for Rotating Shifts",
      description:
        "Unlike generic calendar tools, we're built for rotation patterns. Create fire department 24/48s, police 4-on/4-off, nursing 3-2-2-3, manufacturing continental shifts, or any pattern your organization requires.",
    },
    {
      title: "Seamless Team Coordination",
      description:
        "Share schedules with your team, family, or anyone who needs access. Everyone stays updated with real-time changes, and you control who sees what.",
    },
    {
      title: "Effortless Calendar Integration",
      description:
        "Access your schedules on any device with our responsive design. Whether you're at your desk or on the go, your schedules are always at your fingertips.",
    },
  ];

  return (
    <section
      id="features"
      data-testid="features"
      className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40"
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
              Scheduling That Works For You
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] text-lg">
              Stop forcing your schedule to fit limited tools. Our platform
              adapts to your exact needs - no matter how complex your patterns
              or unique your requirements.
            </p>
          </motion.div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-10 py-12 md:gap-12 lg:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group"
                >
                  <div className="hover:border-primary/30 hover:bg-secondary/5 dark:hover:border-secondary/30 border-primary/10 grid gap-1 rounded-lg border p-4 transition-all hover:shadow-md">
                    <h3 className="flex items-center text-lg font-bold">
                      <CheckCircle
                        className={`mr-2 h-5 w-5 ${index % 2 === 0 ? "text-primary" : "text-secondary"}`}
                      />
                      <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                        {feature.title}
                      </span>
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
