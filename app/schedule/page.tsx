import { Metadata, Viewport } from "next";
import { auth } from "@/auth";
import ScheduleData from "@/components/schedule-data";
import AccountInfo from "@/components/account-info";
import { SignIn } from "@/components/sign-in";

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
  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-center">Please login to view schedules.</p>
          <SignIn />
        </div>
      </main>
    );
  }
  return (
    <main className="">
      <AccountInfo />
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
