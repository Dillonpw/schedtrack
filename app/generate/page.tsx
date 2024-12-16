import Header from "@/components/Header";
import { auth } from "@/auth";
import SignIn from "@/components/Sign-in";
import AccountInfo from "@/components/AccountInfo";
import ScheduleGen from "@/components/scheduleGen";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Generate - Sched Track',
    template: '%s | Sched Track'
  },
  description: "Generate your schedule and keep track of your life efficiently.",
  robots: "index, follow"
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
