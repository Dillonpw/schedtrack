"use client";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Component() {
  const features = [
    {
      title: "Custom Rotations",
      description:
        "Create personalized rotating schedules that fit your unique shift patterns. Whether you're working 12-hour shifts, 24/48 rotations, or any other pattern, our system adapts to your needs.",
    },
    {
      title: "Sharing and Collaboration",
      description:
        "Easily share your schedule with team members or family. Download and import to your calendar of choice like Google Calendar, Apple Calendar, or Outlook with just a few clicks.",
    },
    {
      title: "Mobile Accessibility",
      description:
        "Access your schedule anytime, anywhere with desktop and mobile friendly application. Perfect for checking your shifts on the go or making quick adjustments from your smartphone or tablet.",
    },
  ];

  return (
    <>
      <svg
        viewBox="0 0 1440 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        className="bg-background"
      >
        <path
          d="M-100 58C-100 58 218.416 36.3297 693.5 36.3297C1168.58 36.3297 1487 58 1487 58V-3.8147e-06H-100V58Z"
          className="fill-muted"
        ></path>
      </svg>
      <section
        id="features"
        data-testid="features"
        className="w-full bg-background py-12 md:py-16 lg:py-20"
      >
        <div className="container px-4 py-40 md:px-6 md:pb-60 md:pt-40">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                Manage Your Time More Efficiently and Without the Headache
              </h2>
              <p className="mx-auto max-w-[700px] font-light text-lg">
                Our rotating schedule builder comes packed with features
                designed to simplify your life and streamline your workflow.
              </p>
            </motion.div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-10 py-12 md:gap-12 lg:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="grid gap-1">
                      <h3 className="flex items-center text-lg font-bold dark:text-red-500">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        {feature.title}
                      </h3>
                      <p>{feature.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="pt-40"
            >
              <figure className="mx-auto max-w-[95%] sm:max-w-lg md:max-w-2xl">
                <video
                  src="https://utfs.io/f/2x9MeROBnW8izghZmAdbdqj6eSUgmlVLipk0w4HItRXDYyGJ"
                  className="aspect-video w-full rounded-xl object-cover object-center shadow-lg"
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="metadata"
                />
                <figcaption className="mt-2 text-center text-md text-blue-800 dark:text-gray-100">
                  A demonstration of how to use the schedule builder.
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>
      </section>
      <svg
        viewBox="0 0 1440 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        className="bg-background"
      >
        <path
          transform="rotate(180) translate(-1440, -60)"
          d="M-100 58C-100 58 218.416 36.3297 693.5 36.3297C1168.58 36.3297 1487 58 1487 58V-3.8147e-06H-100V58Z"
          className="fill-muted"
        ></path>
      </svg>
    </>
  );
}
