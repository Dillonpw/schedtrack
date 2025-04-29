import { auth } from "@/auth";
import AccountInfo from "@/components/account-info";
import GenerateScheduleForm from "@/components/forms/form-schedule";
import PreviewScheduleForm from "@/components/forms/preview-schedule-form";
import AuthWrapper from "@/components/auth-wrapper";
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
    <main className="">
      <div className="mx-auto">
        {session ? (
          <GenerateScheduleForm />
        ) : (
          <AuthWrapper>
            <PreviewScheduleForm />
          </AuthWrapper>
        )}
      </div>
    </main>
  );
}
