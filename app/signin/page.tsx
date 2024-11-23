import Header from "@/components/Header";
import AccountInfo from "@/components/AccountInfo";
import SignIn from "@/components/Sign-in";
import Head from "next/head";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta
          name="description"
          content="Access your account to manage and track your schedules with Sched Track."
        />
        <meta name="robots" content="noindex, nofollow" />{" "}
        {/* Prevent indexing of login pages */}
      </Head>
      <main className="bg-muted">
        <Header />
        <AccountInfo />
        <div className="mt-[-12rem] flex h-screen flex-col items-center justify-center">
          <SignIn />
        </div>
      </main>
    </>
  );
}
