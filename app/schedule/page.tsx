import Header from "@/components/Header";
import { auth } from "@/auth";
import SignIn from "@/components/Sign-in";
import Link from "next/link";
import AccountInfo from "@/components/AccountInfo";
import ScheduleData from "@/components/ScheduleData";
export default async function Dashboard() {
  const session = await auth();

  if (!session?.user)
    return (
      <main>
        <Header />
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
      </main>
    );

  return (
    <main>
      <Header />
      <AccountInfo />
      <ScheduleData />
    </main>
  );
}
