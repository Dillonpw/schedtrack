import { Metadata, Viewport } from "next";
import Header from "@/components/header-section";
import { auth } from "@/auth";
import ScheduleData from "@/components/schedule-data";
import LoggedIn from "@/components/account-info";

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

export default async function SchedulePage() {
  const session = await auth();

  return (
    <main className="dark:bg-muted">
      <LoggedIn />
      {session?.user ? (
        <>
          <ScheduleData />
        </>
      ) : (
        <div className="mx-auto">

          <ScheduleData />
        </div>
      )}
    </main>
  );
}
