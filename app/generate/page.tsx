import Header from "@/components/Header";
import { auth } from "@/auth";
import SignIn from "@/components/Sign-in";
import Link from "next/link";
import AccountInfo from "@/components/AccountInfo";
import ScheduleGen from "@/components/scheduleGen";
import Head from "next/head";
export default async function Dashboard() {
  const session = await auth();

  if (!session?.user)
    return (
      <>
        <Head>
          <title>Create a Schedule</title>
          <meta
            name="description"
            content="Easily create a personalized schedule with our intuitive schedule generator."
          />
        </Head>
        <main className="">
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
      </>
    );

  return (
    <>
      <Head>
        <title>Create a Schedule - Sched Track</title>
        <meta
          name="description"
          content="Easily create a personalized schedule with our intuitive schedule generator."
        />
      </Head>
      <main>
        <Header />
        <AccountInfo />
        <ScheduleGen />
      </main>
    </>
  );
}
