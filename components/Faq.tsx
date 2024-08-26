import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="flex w-full flex-col gap-6 bg-muted py-12 md:py-24 lg:py-20 xl:py-48">
      <h2 className="mb-10 text-center text-2xl font-bold md:text-4xl">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex w-full justify-center text-xl">
            What are the benefits of using Sched Track?
          </AccordionTrigger>
          <AccordionContent className="px-5 text-lg md:px-40 md:text-center">
            Sched Track helps professionals manage their schedules more
            efficiently and conveniently.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex w-full justify-center text-xl">
            How does Sched Track work?
          </AccordionTrigger>
          <AccordionContent className="px-5 text-lg md:px-20 md:text-center">
            Sched Track allows professionals to create personalized schedules
            that fit their unique shift patterns and have those schedules saved
            for reference at a momnets notice.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="flex w-full justify-center text-xl">
            Is this app cluttered with features I won't use?
          </AccordionTrigger>
          <AccordionContent className="px-5 text-lg md:px-20 md:text-center">
            Sched Track has one job, and it does it perfectly.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="flex w-full justify-center text-xl">
            Does it cost an arm and a leg?
          </AccordionTrigger>
          <AccordionContent className="px-5 text-lg md:px-20 md:text-center">
            Sched Track is free, although we do accept donations, the app is
            kept running out of appreciation for the people who need it.
          </AccordionContent>
        </AccordionItem>
        {/* New FAQ Items */}
        <AccordionItem value="item-5">
          <AccordionTrigger className="flex w-full justify-center text-xl">
            Can I use Sched Track on any device?
          </AccordionTrigger>
          <AccordionContent className="px-5 text-lg md:px-20 md:text-center">
            Yes, Sched Track is designed to work seamlessly on desktop, mobile
            devices and everything in between.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="flex w-full justify-center text-xl">
            How often does Sched Track update its features?
          </AccordionTrigger>
          <AccordionContent className="px-5 text-lg md:px-20 md:text-center">
            We regularly update Sched Track to improve performance and add
            useful features based on user feedback.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
