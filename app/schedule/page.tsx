import { Metadata } from "next";
import Header from "@/components/Header";
import { auth } from "@/auth";
import SignIn from "@/components/Sign-in";
import AccountInfo from "@/components/AccountInfo";
import ScheduleData from "@/components/ScheduleData";

export const metadata: Metadata = {
  title: {
    default: "Your Schedule - Sched Track",
    template: "%s | Sched Track",
  },
  description:
    "View your generated schedule and keep track of your life efficiently.",
  robots: "index, follow",
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
