import Header from "@/components/Header";
import { auth } from "@/auth";
import SignIn from "@/components/Sign-in";
import Link from "next/link";
import AccountInfo from "@/components/AccountInfo";
import ScheduleData from "@/components/ScheduleData";
import Head from "next/head";
export default async function Dashboard() {
  const session = await auth();

  if (!session?.user)
    return (
      <>
        <Head>
          <title>Your Schedule - Sched Track</title>
          <meta
            name="description"
            content="View your generated schedule and keep track of your tasks efficiently."
          />
          <meta name="robots" content="index, follow" />
        </Head>
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
      </>
    );

  return (
    <>
      <Head>
        <title>Your Schedule - Sched Track</title>
        <meta
          name="description"
          content="View your generated schedule and keep track of your tasks efficiently."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <main>
        <Header />
        <AccountInfo />
        <ScheduleData />
      </main>
    </>
  );
}
