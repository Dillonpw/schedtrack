import Header from "@/components/Header";
import { auth } from "@/auth";
import SignIn from "@/components/Sign-in";
import Link from "next/link";
import AccountInfo from "@/components/AccountInfo";
import ScheduleGen from "@/components/scheduleGen";
export default async function Dashboard() {
  const session = await auth();

  if (!session?.user)
    return (
      <main className="" >
        <Header />
        <div className="mt-[-12rem]">
        <Link
          href="/"
          className="absolute left-10 top-20 text-2xl hover:underline"
        >
          {" "}
          Back
        </Link>
        <div className="flex h-screen flex-col items-center justify-center">
          <SignIn />
        </div>
        </div>
      </main>
    );

  return (
    <main>
      <Header />
      <AccountInfo />
      <ScheduleGen />
    </main>
  );
}
