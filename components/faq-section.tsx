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
      question: "What are the benefits of using Sched Track?",
      answer:
        "Sched Track offers numerous benefits for professionals managing complex schedules. It simplifies the process of creating and maintaining rotating schedules, reduces the time spent on manual scheduling, and minimizes errors. With features like custom rotation patterns, easy sharing, and mobile accessibility, Sched Track helps you stay organized, improves work-life balance, and ensures you never miss a shift. It's particularly beneficial for shift workers, healthcare professionals, emergency responders, and anyone with non-standard work hours.",
    },
    {
      question: "How does Sched Track work?",
      answer:
        "Sched Track allows professionals to create personalized schedules that fit their unique shift patterns. You start by inputting your specific rotation (e.g., 2 days on, 3 days off), and Sched Track generates a long-term schedule based on this pattern. You can then view your schedule at any time, make adjustments as needed, and even share it with colleagues or family members. The app saves your schedule for quick reference, allowing you to plan your work and personal life with ease. It also offers features like notifications for upcoming shifts and the ability to export your schedule to other calendar applications.",
    },
    {
      question: "Is this app cluttered with features I won't use?",
      answer:
        "No, Sched Track is designed with simplicity and efficiency in mind. We focus on providing essential scheduling features without unnecessary complexity. Our philosophy is 'do one thing and do it well.' While we offer a range of useful features like custom rotations, sharing capabilities, and mobile access, each feature is carefully considered to ensure it adds value for our users. We continuously refine our app based on user feedback to maintain its simplicity while meeting the diverse needs of our user base.",
    },
    {
      question: "Does it cost an arm and a leg?",
      answer:
        "Not at all! Sched Track is primarily free to use. We believe in providing value to our users, especially those in critical professions who rely on accurate scheduling. While the core features of Sched Track are free, we do accept donations from users who find the app particularly helpful. These donations help us maintain the service, develop new features, and keep the app running smoothly. We also offer some premium features for a small fee, but these are entirely optional and the free version remains fully functional for most users' needs.",
    },
    {
      question: "Can I use Sched Track on any device?",
      answer:
        "Yes, Sched Track is designed to work seamlessly across a wide range of devices. Our responsive web application works great on desktop computers, laptops, tablets, and smartphones. Whether you're using Windows, macOS, iOS, or Android, you can access Sched Track through your web browser.",
    },
    {
      question: "How often does Sched Track update its features?",
      answer:
        "We regularly update Sched Track to improve performance and add useful features based on user feedback. Our development team works on a continuous improvement model, releasing minor updates and bug fixes every few weeks. Larger feature updates typically occur every few months. We always announce major updates to our users and provide guidance on how to use new features. Our goal is to keep Sched Track current with the latest technology while maintaining its ease of use. We also encourage our users to provide feedback and suggestions for new features, which helps shape our development roadmap.",
    },
    {
      question: "Is my schedule data secure with Sched Track?",
      answer:
        "Absolutely. We take the security and privacy of your data very seriously. All data transmitted to and from our servers is encrypted using industry-standard SSL/TLS protocols. Your schedule information is stored securely in our databases, which are regularly backed up and protected against unauthorized access. We never share your personal information or schedule data with third parties. Additionally, we offer features like two-factor authentication for added account security. Our privacy policy clearly outlines how we handle your data, and we're always transparent about our security practices.",
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
        data-testid="faq"
        className="flex w-full flex-col gap-6 bg-muted py-40 md:pb-60 md:pt-40"
      >
        <div className="container px-4 md:px-6">
          <motion.h2
            className="mb-10 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            Frequently Asked Questions
          </motion.h2>
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
