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
        <main className=" bg-gray-100">
          <Header />
            <div className="flex h-screen flex-col items-center justify-center">
              <SignIn />
            </div>
        </main>
      </>
    );

  return (
    <>
      <Head>
        <title>Create a Schedule</title>
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
