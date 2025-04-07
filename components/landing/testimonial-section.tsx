"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const testimonials = [
  {
    name: "Anonymous",
    role: "911 Dispatcher",
    fallback: "JD",
    content:
      "Sched Track has been a game-changer for me. It's so easy to create and view my work schedule, before finding Sched Track I would have to sit down and count the days to try to figure out my days off now it's just there anytime I need it. Highly recommend!",
  },
  {
    name: "Lisa Martinez",
    role: "Home Manager",
    fallback: "LM",
    content:
      "I use Sched Track to manage our household maintenance schedule. From cleaning rotations to plant watering schedules, it keeps everything organized. The calendar sync feature means I never miss a task, and my family can easily check what needs to be done.",
  },
  {
    name: "Mike Johnson",
    role: "Fire Captain",
    fallback: "MJ",
    content:
      "As a fire captain, managing shifts for my team used to be a nightmare. This app has streamlined the entire process. It's intuitive, reliable, and has significantly reduced scheduling conflicts.",
  },
  {
    name: "Rachel Chen",
    role: "Property Manager",
    fallback: "RC",
    content:
      "Managing multiple properties means juggling various maintenance schedules. Sched Track helps me keep track of everything from regular cleaning to seasonal maintenance. The ability to create different schedules for different properties is invaluable.",
  },
  {
    name: "David Thompson",
    role: "Small Business Owner",
    fallback: "DT",
    content:
      "I run a small café and use Sched Track for both staff scheduling and maintenance tasks. From employee shifts to cleaning schedules and equipment maintenance, everything is in one place. It's made running my business so much easier.",
  },
  {
    name: "Sarah Anderson",
    role: "Homeowner",
    fallback: "SA",
    content:
      "As someone who travels frequently, Sched Track is perfect for managing my home maintenance tasks. I can set up schedules for house cleaning, plant care, and even pet sitting. The notifications ensure nothing gets missed while I'm away.",
  },
];

export default function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = () => ({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  });

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="from-primary to-secondary bg-gradient-to-r bg-clip-text pb-1 text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
              What People Are Building
            </h3>
            <p className="text-muted-foreground mx-auto max-w-[700px] text-lg">
              See how our users are creating schedules for every need imaginable
              - from simple to the most complex patterns.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants()}>
              <Card className="group bg-card border-primary/10 hover:border-primary/30 h-full overflow-hidden border transition-all duration-300 hover:shadow-lg dark:bg-gray-600">
                <div className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="border-primary h-10 w-10 border-2">
                      <AvatarImage alt={`${testimonial.name} Avatar`} />
                      <AvatarFallback className="text-primary-foreground bg-primary text-xs">
                        {testimonial.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-card-foreground text-base font-bold">
                        {testimonial.name}
                      </h3>
                      <p className="text-primary/80 text-xs font-semibold">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <Separator className="from-primary/20 to-secondary/20 my-3 bg-gradient-to-r" />
                  <p className="text-card-foreground/90 group-hover:text-card-foreground text-xs transition-all duration-300 sm:text-sm">
                    "{testimonial.content}"
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
