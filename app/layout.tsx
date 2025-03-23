import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/header-section";
import Nav from "@/components/nav-section";
import Footer from "@/components/footer-section";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { Metadata, Viewport } from "next";
import Donation from "@/components/donation-link";

export const metadata: Metadata = {
  title: "Rotating Schedule Builder for everything and everyone",
  description:
    "Create schedules for any activity that doesn't happen on the same day every week. Perfect for shift work, irregular meetings, alternating custody arrangements, recreational leagues, and more. Sched Track offers efficient schedule management for all your variable scheduling needs.",
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
    "Hospitality",
    "Manufacturing",
    "Retail",
    "Security",
    "Transportation",
    "Logistics",
    "Irregular Schedules",
    "Variable Patterns",
    "Rotating Activities",
    "Alternating Schedules",
    "Non-fixed Days",
    "Custody Arrangements",
    "Club Meetings",
    "Sports Leagues",
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
    title: "Sched Track | Schedule Builder for Variable Weekly Patterns",
    description:
      "Create schedules for any activity that doesn't happen on the same day every week. Perfect for shift work, rotating meetings, alternating custody, recreational activities, and more. Manage all your variable scheduling needs efficiently.",
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
    title:
      "Sched Track | Scheduling your variable activities just became a breeze",
    description:
      "Create schedules for any activity that doesn't follow a consistent weekly pattern. From shift work to alternating custody arrangements, club meetings to sports leagues - Sched Track handles all your variable scheduling needs.",
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
  alternates: {
    canonical: "https://www.schedtrack.com",
    languages: {
      "en-US": "https://www.schedtrack.com",
      "es-ES": "https://www.schedtrack.com/es",
    },
  },
};

// Structured Data as a separate function
export function generateJsonLd() {
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
      "Schedule builder for any activity that doesn't happen on the same day every week. Perfect for shift work, irregular meetings, alternating custody arrangements, recreational leagues, and more.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "100",
    },
    datePublished: "2023-01-01",
    softwareVersion: "1.0",
  };

  return [
    {
      "@type": "application/ld+json",
      innerHTML: JSON.stringify(structuredData),
    },
  ];
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// Google Ads script generation
export function generateScripts() {
  return [
    {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4500026491096816",
      async: true,
      crossOrigin: "anonymous",
    },
  ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <Providers>
          <SessionProvider>
            <Header>
              <Nav />
            </Header>
            {children}
          </SessionProvider>
        </Providers>
        <Donation />
        <Footer />
        <Analytics />
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                "Schedule builder for any activity that doesn't happen on the same day every week. Perfect for shift work, irregular meetings, alternating custody arrangements, recreational leagues, and more.",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "100",
              },
              datePublished: "2023-01-01",
              softwareVersion: "1.0",
            }),
          }}
        />
      </body>
    </html>
  );
}
