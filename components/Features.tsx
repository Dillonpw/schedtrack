import Image from "next/image";
import { CheckCircle } from "lucide-react";

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
        className="w-full bg-muted py-12 md:py-16 lg:py-20"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                Manage Your Time More Efficiently and Without the Headache
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our rotating schedule builder comes packed with features
                designed to simplify your life and streamline your workflow.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-10 py-12 md:gap-12 lg:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                {features.slice(0, 3).map((feature, index) => (
                  <li key={index}>
                    <div className="grid gap-1">
                      <h3 className="flex items-center text-lg font-bold">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                {features.slice(3).map((feature, index) => (
                  <li key={index}>
                    <div className="grid gap-1">
                      <h3 className="flex items-center text-lg font-bold">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mx-auto max-w-3xl">
            <Image
              src="/manual-schedule.webp"
              width={1100}
              height={620}
              alt="Features showcase"
              className="mx-auto aspect-video overflow-hidden rounded-xl border-2 object-cover object-center shadow-lg"
            />
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
