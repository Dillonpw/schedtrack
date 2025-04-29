import { Metadata, Viewport } from "next";
import { auth } from "@/auth";
import ScheduleData from "@/components/schedule-data";
import PreviewSchedule from "@/components/preview-schedule";
import AuthWrapper from "@/components/auth-wrapper";

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
};

export default async function SchedulePage() {
  const session = await auth();

  return (
    <main>
      {session ? (
        <ScheduleData />
      ) : (
        <AuthWrapper>
          <PreviewSchedule />
        </AuthWrapper>
      )}
    </main>
  );
}
