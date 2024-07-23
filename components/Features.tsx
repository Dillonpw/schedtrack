import Image from "next/image";
const FeaturesSection = () => {
  return (
    <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
              Leave Manual Scheduling Behind
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a range of powerful features to help professionals with
              rotating schedules manage their time more efficientlyand without
              the headaches.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Custom Rotations</h3>
                  <p className="text-muted-foreground">
                    Create personalized rotating schedules that fit your unique
                    shift patterns.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">
                    Sharing and Collaboration
                  </h3>
                  <p className="text-muted-foreground">
                    Easily shareable schedules so you can collaborate in
                    real-time to ensure everyone is on the same page.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Calendar Integration</h3>
                  <p className="text-muted-foreground">
                    Seamlessly integrate your rotating schedules with popular
                    calendar apps like Google Calendar, Outlook, and more.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <Image
            src="/manual-schedule.webp"
            width="550"
            height="310"
            alt="Features"
            className="mx-auto aspect-video overflow-hidden rounded-xl border-2 object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
