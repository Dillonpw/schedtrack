import Header from "../../components/header-section";

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
            Your privacy is important to us. It is Sched Track's policy to
            respect your privacy regarding any information we may collect from
            you across our website, and other sites we own and operate. We only
            ask for personal information when we truly need it to provide a
            service to you. We collect it by fair and lawful means, with your
            knowledge and consent. We also let you know why we're collecting it
            and how it will be used. You can sign up with your Google account so
            your Sched Track account username will be prefilled with your name
            and your public profile picture. We only retain collected
            information for as long as necessary to provide you with your
            requested service. What data we store, we'll protect within
            commercially acceptable means to prevent loss and theft, as well as
            unauthorized access, disclosure, copying, use, or modification. We
            don't share any personally identifying information publicly or with
            third parties, except when required to by law.
            <br />
            <br />
            Third-party vendors, including Google, use cookies to serve ads
            based on a user's prior visits to your website or other websites.
            Google's use of advertising cookies enables it and its partners to
            serve ads to your users based on their visit to your sites and/or
            other sites on the Internet. Users may opt out of personalized
            advertising by visiting Ads Settings, or visiting{" "}
            <a href="https://www.aboutads.info">www.aboutads.info</a>.
            <br />
            <br /> Our website may link to external sites that are not operated
            by us. Please be aware that we have no control over the content and
            practices of these sites, and cannot accept responsibility or
            liability for their respective privacy policies. You are free to
            refuse our request for your personal information, with the
            understanding that we may be unable to provide you with some of your
            desired services. Your continued use of our website will be regarded
            as acceptance of our practices around privacy and personal
            information. If you have any questions about how we handle user data
            and personal information, feel free to contact us.
          </p>
        </div>
      </main>
    </>
  );
}
