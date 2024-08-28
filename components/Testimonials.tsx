import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const TestimonialsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our satisfied users about how our rotating schedule
              builder has simplified their day to day.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <Card className="h-[95%] bg-muted p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="/john-doe.webp" alt="John Doe Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg font-bold">Anonymous</h4>
                <p className="text-muted-foreground">911 Dispatcher</p>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-muted-foreground">
              "Sched Track has been a game-changer for me. It's so easy to
              create and view my work schedule, before finding Sched Track I
              would have to sit down and count the days to try to figure out my
              days off now it's just there anytime I need it. Highly recommend!"
            </p>
          </Card>
          <Card className="h-[95%] bg-muted p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="/jane-doe.webp " alt="Jane Doe Avatar" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg font-bold">Jane Smith</h4>
                <p className="text-muted-foreground">Nursing Supervisor</p>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-muted-foreground">
              "I've been using this rotating schedule app for months and it's
              been a lifesaver. I've gotten my whole team involved. The ability
              to create and manage rotating schedules has made planning our
              lives so much easier."
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
