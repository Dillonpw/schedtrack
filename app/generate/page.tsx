import { auth } from "@/auth";
import LoggedIn from "@/components/account-info";
import GenerateScheduleForm from "@/components/schedule-generate";
import { SignIn } from "@/components/sign-in";
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

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center dark:bg-muted">
        <div className="flex flex-col items-center">
          <p className="text-center">Please login to generate your schedule.</p>
          <SignIn />
        </div>
      </main>
    );
  }

  return (
    <main className="dark:bg-muted">
      <LoggedIn />
      <div className="mx-auto">
        <GenerateScheduleForm />
      </div>
    </main>
  );
}
