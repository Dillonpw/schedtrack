import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Privacy Policy - Sched Track",
    template: "%s | Sched Track",
  },
  description:
    "Learn about how Sched Track protects your privacy and handles your data.",
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
        <h1 className="mt-10 mb-14 text-center text-3xl font-bold text-red-600/80">
          Privacy Policy
        </h1>
        <div className="mx-auto max-w-[70%] space-y-8">
          <section className="mx-4 lg:mx-10">
            <h2 className="mb-4 text-xl font-semibold">Introduction</h2>
            <p className="text-sm lg:text-base">
              At Sched Track, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, and safeguard your
              information when you use our scheduling application. Please read
              this privacy policy carefully. By using Sched Track, you consent
              to the practices described in this policy.
            </p>
          </section>

          <section className="mx-4 lg:mx-10">
            <h2 className="mb-4 text-xl font-semibold">
              Information We Collect
            </h2>
            <div className="space-y-4 text-sm lg:text-base">
              <p>We collect information that you provide directly to us:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Account information (when you sign up through GitHub or
                  Google)
                </li>
                <li>Schedule preferences and settings</li>
                <li>Generated schedules and schedule data</li>
              </ul>
              <p>We also collect certain information automatically:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Usage data and analytics through Vercel Analytics</li>
                <li>IP address and location data</li>
                <li>Session cookies for authentication and functionality</li>
                <li>
                  Device information including device type and operating system
                </li>
              </ul>
            </div>
          </section>

          <section className="mx-4 lg:mx-10">
            <h2 className="mb-4 text-xl font-semibold">
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-sm lg:text-base">
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>To provide and maintain our scheduling service</li>
                <li>To generate and manage your schedules</li>
                <li>
                  To improve our service through analytics and error tracking
                </li>
                <li>To authenticate your identity and secure your account</li>
              </ul>
            </div>
          </section>

          <section className="mx-4 lg:mx-10">
            <h2 className="mb-4 text-xl font-semibold">Data Security</h2>
            <p className="text-sm lg:text-base">
              We implement appropriate technical and organizational security
              measures to protect your personal information. This includes:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-sm lg:text-base">
              <li>Secure authentication through Auth.js</li>
              <li>Encrypted data transmission using HTTPS</li>
              <li>Regular security assessments and updates</li>
            </ul>
          </section>

          <section className="mx-4 lg:mx-10">
            <h2 className="mb-4 text-xl font-semibold">Third-Party Services</h2>
            <div className="space-y-4 text-sm lg:text-base">
              <p>We use the following third-party services:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>GitHub and Google for authentication</li>
                <li>Stripe for processing donations</li>
                <li>Vercel Analytics for usage tracking</li>
                <li>Google AdSense for advertising</li>
              </ul>
              <p>
                Each of these services has its own privacy policy and data
                handling practices. We recommend reviewing their respective
                privacy policies to understand how they handle your data.
              </p>
            </div>
          </section>

          <section className="mx-4 lg:mx-10">
            <h2 className="mb-4 text-xl font-semibold">Your Rights</h2>
            <div className="space-y-4 text-sm lg:text-base">
              <p>You have the right to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Export your schedule data in CSV format</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of Google AdSense advertising</li>
              </ul>
            </div>
          </section>

          <section className="mx-4 lg:mx-10">
            <h2 className="mb-4 text-xl font-semibold">
              Changes to This Policy
            </h2>
            <p className="text-sm lg:text-base">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date. We recommend
              reviewing this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mx-4 lg:mx-10">
            <h2 className="mb-4 text-xl font-semibold">Contact Us</h2>
            <p className="text-sm lg:text-base">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at support@schedtrack.com.
            </p>
          </section>

          <section className="mx-4 lg:mx-10">
            <p className="text-sm lg:text-base">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
