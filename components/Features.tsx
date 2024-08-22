import Image from "next/image";

export default function Component() {
  return (
    <section
      id="features"
      data-testid="features"
      className="w-full bg-muted py-8 md:py-12 lg:py-16"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Leave Manual Scheduling Behind
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              We offer a custom schedule generator to help you manage your
              time more efficiently and without the headaches.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl items-center gap-6 py-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-4">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Custom Rotations</h3>
                  <p className="text-muted-foreground">
                    Create personalized rotating schedules that fit your unique
                    shift patterns.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">
                    Sharing and Collaboration
                  </h3>
                  <p className="text-muted-foreground">
                    Easy to screenshot and share your schedule with others, more
                    sharing options coming soon.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <Image
            src="/manual-schedule.webp"
            width={550}
            height={310}
            alt="Features"
            className="mx-auto aspect-video overflow-hidden rounded-xl border-2 object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  )
}