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
    {
      title: "Flexible Scheduling Patterns",
      description:
        "Create any type of schedule that fits your needs - from standard 9-5 shifts to complex rotating patterns. Our system handles regular, irregular, and rotating schedules with ease.",
    },
    {
      title: "Smart Calendar Integration",
      description:
        "Seamlessly sync your schedule with your preferred calendar app. Export to Google Calendar, Apple Calendar, or Outlook with just a few clicks, keeping your schedule accessible everywhere.",
    },
    {
      title: "Cross-Platform Access",
      description:
        "Access and manage your schedule from any device. Our responsive design works perfectly on desktop, tablet, or mobile, ensuring you can check or update your schedule anytime, anywhere.",
    },
  ];

  return (
    <>
      <svg
        viewBox="0 0 1440 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        className="bg-muted"
      >
        <path
          d="M-100 58C-100 58 218.416 36.3297 693.5 36.3297C1168.58 36.3297 1487 58 1487 58V-3.8147e-06H-100V58Z"
          className="fill-background"
        ></path>
      </svg>
      <section
        id="features"
        data-testid="features"
        className="bg-muted w-full py-20 md:py-32 lg:py-40"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                Flexible Scheduling for Any Pattern
              </h2>
              <p className="mx-auto max-w-[700px] text-lg ">
                Our schedule builder adapts to your unique needs, whether you're
                managing regular shifts, rotating schedules, or any other
                pattern.
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
                      <h3 className="flex items-center text-lg font-bold ">
                        <CheckCircle className="text-primary mr-2 h-5 w-5" />
                        {feature.title}
                      </h3>
                      <p>{feature.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <svg
        viewBox="0 0 1440 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        className="bg-muted"
      >
        <path
          transform="rotate(180) translate(-1440, -60)"
          d="M-100 58C-100 58 218.416 36.3297 693.5 36.3297C1168.58 36.3297 1487 58 1487 58V-3.8147e-06H-100V58Z"
          className="fill-background"
        ></path>
      </svg>
    </>
  );
}
