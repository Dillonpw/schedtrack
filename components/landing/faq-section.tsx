"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const faqItems = [
    {
      question: "What types of schedules can I create with Sched Track?",
      answer:
        "Sched Track is versatile enough to handle any type of schedule you need. Whether you're managing work shifts, home maintenance tasks, property management schedules, or personal routines, our platform adapts to your needs. You can create regular schedules (like 9-5 workdays), rotating schedules (like 24/48 shifts), or irregular patterns (like alternating cleaning days). The app works great for both professional and personal scheduling needs, from managing employee shifts to tracking home maintenance tasks like cleaning rotations or plant care schedules.",
    },
    {
      question: "How does Sched Track work?",
      answer:
        "Sched Track makes scheduling simple and intuitive. You start by creating a schedule pattern that matches your needs - whether it's work shifts, maintenance tasks, or personal routines. The app then generates a long-term schedule based on your pattern. You can view your schedule at any time, make adjustments as needed, and share it with team members or family. The app saves your schedule for quick reference and offers features like notifications for upcoming tasks and the ability to export your schedule to other calendar applications. Whether you're managing a team's work schedule or your home maintenance tasks, everything stays organized in one place.",
    },
    {
      question: "Is this app cluttered with features I won't use?",
      answer:
        "No, Sched Track is designed with simplicity and efficiency in mind. We focus on providing essential scheduling features without unnecessary complexity. Our philosophy is 'do one thing and do it well.' While we offer a range of useful features like custom patterns, sharing capabilities, and mobile access, each feature is carefully considered to ensure it adds value for our users. We continuously refine our app based on user feedback to maintain its simplicity while meeting the diverse needs of our user base.",
    },
    {
      question: "Does it cost an arm and a leg?",
      answer:
        "Not at all! Sched Track is primarily free to use. We believe in providing value to our users, whether they're managing work schedules or home maintenance tasks. While the core features of Sched Track are free, we do accept donations from users who find the app particularly helpful. These donations help us maintain the service, develop new features, and keep the app running smoothly. We also offer some premium features for a small fee, but these are entirely optional and the free version remains fully functional for most users' needs.",
    },
    {
      question: "Can I use Sched Track on any device?",
      answer:
        "Yes, Sched Track is designed to work seamlessly across a wide range of devices. Our responsive web application works great on desktop computers, laptops, tablets, and smartphones. Whether you're using Windows, macOS, iOS, or Android, you can access Sched Track through your web browser. This means you can check your schedule or make updates whether you're at work, at home, or on the go.",
    },
    {
      question: "Is my schedule data secure with Sched Track?",
      answer:
        "Absolutely. We take the security and privacy of your data very seriously. Your schedule information is stored securely in our databases, which are regularly backed up and protected against unauthorized access. We never share your personal information or schedule data with third parties. Additionally, we offer features like two-factor authentication for added account security. Our privacy policy clearly outlines how we handle your data, and we're always transparent about our security practices.",
    },
  ];

  return (
    <section
      data-testid="faq"
      className="flex w-full flex-col gap-6 py-20 md:py-32 lg:py-40"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h4
          className="from-primary to-secondary bg-gradient-to-r bg-clip-text pb-1 text-center text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          Frequently Asked Questions
        </motion.h4>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-3xl"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={`item-${index + 1}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger className="text-left text-lg md:text-xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
