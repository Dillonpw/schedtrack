import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col gap-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex w-full justify-center text-2xl">
            What are the benefits of using Rotating Schedule Builder?
          </AccordionTrigger>
          <AccordionContent className="px-20 text-center text-lg">
            Rotating Schedule Builder helps professionals manage their schedules
            more efficiently.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex w-full justify-center text-2xl">
            How does Rotating Schedule Builder work?
          </AccordionTrigger>
          <AccordionContent className="px-20 text-center text-lg">
            Rotating Schedule Builder allows professionals to create
            personalized schedules that fit their unique shift patterns and
            preferences.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="flex w-full justify-center text-2xl">
            What are the benefits of using Rotating Schedule Builder?
          </AccordionTrigger>
          <AccordionContent className="px-20 text-center text-lg">
            Rotating Schedule Builder helps professionals manage their schedules
            more efficiently.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="flex w-full justify-center text-2xl">
            How does Rotating Schedule Builder work?
          </AccordionTrigger>
          <AccordionContent className="px-20 text-center text-lg">
            Rotating Schedule Builder allows professionals to create
            personalized schedules that fit their unique shift patterns and
            preferences.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
