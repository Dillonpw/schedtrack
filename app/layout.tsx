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
  title: "Rotating Schedule Builder | Efficient Workforce Management Tool",
  description:
    "Rotating Schedule Builder is your ultimate tool for efficient shift scheduling, staff planning, and work-life balance optimization. Perfect for first responders, nurses, and other 24/7 operations.",
  applicationName: "Rotating Schedule Builder",
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
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
    other: {
      rel: "apple-touch-icon",
      url: "/favicon.webp",
    },
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
    url: "https://yourwebsite.com",
    images: [
      {
        url: "/schedule-dt.webp",
        width: 1200,
        height: 630,
        alt: "Rotating Schedule Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle",
    title: "Rotating Schedule Builder",
    description:
      "Efficient shift scheduling and workforce management tool. Ideal for first responders, nurses, and 24/7 operations.",
  },
  metadataBase: new URL("https://schedtrack.com"),
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
