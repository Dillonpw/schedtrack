import Header from "@/components/header-section";
import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import AccountInfo from "@/components/account-info";
import ScheduleGen from "@/components/schedule-generate";
import { Metadata, Viewport } from "next";

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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user)
    return (
      <>
        <main>
          <Header />
          <div className="flex h-screen flex-col items-center justify-center">
            <SignIn />
          </div>
        </main>
      </>
    );

  return (
    <>
      <main>
        <Header />
        <AccountInfo />
        <ScheduleGen />
      </main>
    </>
  );
}

