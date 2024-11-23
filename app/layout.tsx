import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import Script from "next/script";

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

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sched Track",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Efficient shift scheduling and workforce management tool for first responders, nurses, and 24/7 operations.",
    // NEW: Added more structured data
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "100",
    },
    datePublished: "2023-01-01",
    softwareVersion: "1.0",
  };
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const metadata: Metadata = {
  title: "Rotating Schedule Builder for First Responders",
  description:
    "Streamline shift scheduling for first responders, nurses, and 24/7 operations. Sched Track offers efficient workforce management, optimized rotations, and improved work-life balance.",
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
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    other: [
      {
        rel: "apple-touch-icon",
        url: "/favicon.png",
      },
      {
        rel: "icon",
        sizes: "192x192",
        url: "/favicon.png",
      },
      {
        rel: "icon",
        sizes: "512x512",
        url: "/favicon.png",
      },
    ],
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    title:
      "Sched Track | Rotating Schedule Builder for First Responders & Healthcare",
    description:
      "Streamline shift scheduling for first responders, nurses, and 24/7 operations. Efficient workforce management, optimized rotations, and improved work-life balance.",
    url: "https://www.schedtrack.com",
    siteName: "Sched Track",
    images: [
      {
        url: "/schedule-dt.webp",
        width: 1200,
        height: 630,
        alt: "Sched Track | Rotating Schedule Builder",
      },
      {
        url: "/schedule-dt-small.webp",
        width: 600,
        height: 315,
        alt: "Sched Track | Rotating Schedule Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dillonpw_",
    creator: "@dillonpw_",
    title: "Sched Track | Scheduling your rotation just became a breeze",
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
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://www.schedtrack.com",
    languages: {
      "en-US": "https://www.schedtrack.com",
      "es-ES": "https://www.schedtrack.com/es",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth " suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="canonical" href="https://www.schedtrack.com" />
      </head>
      <body
        className={cn(
          "font-semibold antialiased bg-gray-100 dark:bg-muted",
          fontHeading.variable,
          fontBody.variable,
        )}
      >
        <main>
          <Providers>
            <SessionProvider>{children}</SessionProvider>
          </Providers>
        </main>
        <Link
          className="flex justify-center bg-muted p-4 pt-10 text-lg hover:underline"
          href="https://buy.stripe.com/7sIaFa7EQeJzbW8aEG"
        >
          Help Us Keep The Lights On 💡
        </Link>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
