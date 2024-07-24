import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Providers } from "./providers";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import GoogleAdsense from "@/components/GoogleAdsense";

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

export const metadata: Metadata = {
  title: "Rotating Schedule Builder",
  description: "Generated by create next app",
  applicationName: "Rotating Schedule Builder",
  keywords: [
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
    "first responders",
    "dispatcher",
    "nurses",
    "rotating schedule",
    "work schedule",
    "emergency services",
    "healthcare workers",
    "shift planner",
    "duty roster",
    "staff scheduling",
    "employee scheduler",
    "24/7 operations",
    "on-call management",
    "shift swapping",
    "work-life balance",
    "scheduling software",
    "schedule automation",
    "workforce management",
    "shift management",
    "night shifts",
    "day shifts",
    "schedule optimization",
    "shift patterns",
    "staff planning",
    "time management",
    "schedule coordination",
    "shift coverage",
    "staff availability",
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
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
    other: {
      rel: "apple-touch-icon",
      url: "/favicon.svg",
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    images: "/schedule-dt.webp",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAdsense />
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
