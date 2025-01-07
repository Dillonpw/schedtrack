import Header from "@/components/header-section";
import { auth } from "@/auth";
import AccountInfo from "@/components/account-info";
import ScheduleGen from "@/components/schedule-generate";
import { Metadata, Viewport } from "next";
import LoggedIn from "@/components/account-info";

export const metadata: Metadata = {
  title: {
    default: "Generate - Sched Track",
    template: "%s | Sched Track",
  },
  description:
    "Generate your schedule and keep track of your life efficiently.",
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function GeneratePage() {
  const session = await auth();

  return (
    <main className="dark:bg-muted">
      <Header />
      {session?.user ? (
        <>
          <AccountInfo />
          <ScheduleGen />
        </>
      ) : (
        <div className=" mx-auto">
            <LoggedIn />
          <ScheduleGen />
          <div className="mt-8 rounded-lg bg-blue-100 p-4 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
            <p>
              Sign in to save your schedule across devices and access additional
              features.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
