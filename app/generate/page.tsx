import { auth } from "@/auth";
import LoggedIn from "@/components/account-info";
import GenerateScheduleForm from "@/components/schedule-generate";
import type { Metadata, Viewport } from "next";

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
};

export default async function GeneratePage() {
  const session = await auth();

  return (
    <main className="dark:bg-muted">
      <LoggedIn />
      <div className="mx-auto">
        <GenerateScheduleForm />
      </div>
    </main>
  );
}
