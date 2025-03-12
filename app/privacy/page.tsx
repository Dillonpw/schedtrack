import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Your Schedule - Sched Track",
    template: "%s | Sched Track",
  },
  description:
    "View your generated schedule and keep track of your life efficiently.",
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function Privacy() {
  return (
    <>
      <main className="dark:bg-muted">
        <h1 className="mt-10 text-center text-3xl font-bold text-red-600/80">
          Privacy Policy
        </h1>
        <div className="mx-auto max-w-[70%]">
          <p className="mx-4 mt-10 text-sm lg:mx-10 lg:text-xl">
            Your privacy is important to us. Sched Track is committed to
            ensuring your privacy is protected. We do not collect any personal
            data or use cookies on our platform. Our application is designed to
            function without storing or processing any personal information.
            <br />
            <br />
            For authentication purposes, we utilize third-party services such as
            GitHub, Google, and Resend. These services may collect information
            as per their respective privacy policies. We recommend reviewing
            their privacy policies to understand how they handle your data.
            <br />
            <br />
            Our website includes a redirect to Stripe for donations. Please be
            aware that Stripe may collect information as part of their payment
            processing services. We advise you to review Stripe's privacy policy
            for more details.
            <br />
            <br />
            Our website may link to external sites that are not operated by us.
            We have no control over the content and practices of these sites and
            cannot accept responsibility or liability for their respective
            privacy policies. Your continued use of our website will be regarded
            as acceptance of our practices around privacy. If you have any
            questions about our privacy practices, feel free to contact us.
          </p>
        </div>
      </main>
    </>
  );
}
