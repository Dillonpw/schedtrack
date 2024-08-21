import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import GoogleAdsense from "@/components/GoogleAdsense";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sched Track",
  description:
    "Sched Track - the ultimate tool for rotating schedule building, efficient shift scheduling, and workforce management, optimized for first responders, nurses, and 24/7 operations.",

  applicationName: "Sched Track",
  keywords: [
    "Sched Track",
    "Rotating Schedule Builder",
    "Scheduling Software",
    "Shift Scheduling",
    "Shift Planner",
    "Workforce Management",
    "First Responders",
    "Dispatcher",
    "Nurses",
    "Emergency Services",
    "Healthcare Workers",
    "Duty Roster",
    "Staff Scheduling",
    "Employee Scheduler",
    "24/7 Operations",
    "On-call Management",
    "Shift Swapping",
    "Work-Life Balance",
    "Schedule Automation",
    "Shift Management",
    "Night Shifts",
    "Day Shifts",
    "Schedule Optimization",
    "Shift Patterns",
    "Staff Planning",
    "Time Management",
    "Schedule Coordination",
    "Shift Coverage",
    "Staff Availability",
    "nextjs",
    "react",
    "typescript",
    "ui",
    "components",
    "tailwindcss",
    "drizzle",
    "schedule",
    "schedule builder",
    "schedule management",
    "work schedule",
    "shift scheduling",
    "rotating schedule",
    "shift planner",
    "shift rotation",
    "schedule notifications",
    "overtime management",
    "flexible scheduling",
    "shift allocation",
    "scheduling tools",
    "schedule tracking",
    "work hours management",
    "staffing solutions",
    "shift distribution",
    "workforce scheduling",
  ],
  authors: [{ name: "Dillon Walsh", url: "https://dillonwalsh.com" }],
  creator: "Dillon Walsh",
  publisher: "Dillon Walsh",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon-32x32.webp",
    shortcut: "/favicon-32x32.webp",
    apple: "/favicon-192x192.webp",
    other: [
      {
        rel: "apple-touch-icon",
        url: "/favicon-192x192.webp",
      },
      {
        rel: "icon",
        sizes: "192x192",
        url: "/favicon-192x192.webp",
      },
      {
        rel: "icon",
        sizes: "512x512",
        url: "/favicon-512x512.webp",
      },
    ],
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    title: "Sched Track | Rotating Schedule Builder",
    description:
      "Efficient shift scheduling and workforce management tool. Ideal for first responders, nurses, and 24/7 operations.",
    url: "https://www.schedtrack.com",
    images: [
      {
        url: "/schedule-dt.webp",
        width: 1200,
        height: 630,
        alt: "Sched Track | Rotating Schedule Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dillonpw_",
    title:
      "Sched Track | Efficient Shift Scheduling and Workforce Management Tool",
    description:
      "Streamline your shift scheduling, staff planning, and work-life balance with Sched Track - the ultimate workforce management tool for first responders, nurses, and 24/7 operations.",
    images: [
      {
        url: "https://www.schedtrack.com/schedule-dt.webp",
        width: 1200,
        height: 630,
        alt: "Sched Track | Rotating Schedule Builder",
      },
    ],
  },
  metadataBase: new URL("https://www.schedtrack.com"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAdsense />
      </head>
      <body
        className={cn(
          "font-semibold antialiased",
          fontHeading.variable,
          fontBody.variable,
        )}
      >
        <Providers>
          <SessionProvider>{children}</SessionProvider>
        </Providers>
        <Link
          className="m-4 flex justify-center text-lg hover:underline"
          href="https://buy.stripe.com/7sIaFa7EQeJzbW8aEG"
        >
          Help Us Keep the Lights On 💡
        </Link>
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
