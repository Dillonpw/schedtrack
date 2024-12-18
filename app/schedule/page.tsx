import { Metadata, Viewport } from "next";
import Header from "@/components/header-section";
import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import AccountInfo from "@/components/account-info";
import ScheduleData from "@/components/schedule-data";

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
  maximumScale: 1,
  userScalable: false,
};

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="dark:bg-muted">
        <Header />
        <div className="flex h-screen flex-col items-center justify-center">
          <SignIn />
        </div>
      </main>
    );
  }

  return (
    <main className="dark:bg-muted">
      <Header />
      <AccountInfo />
      <ScheduleData />
    </main>
  );
}
