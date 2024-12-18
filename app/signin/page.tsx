import Header from "@/components/header-section";
import AccountInfo from "@/components/account-info";
import SignIn from "@/components/temporary-name";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Your Schedule - Sched Track",
    template: "%s | Sched Track",
  },
  description: "Sign in.",
  robots: "noindex, nofollow",
};

export default function SignInPage() {
  return (
    <>
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
