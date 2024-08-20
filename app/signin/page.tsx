import Header from "@/components/Header";
import AccountInfo from "@/components/AccountInfo";
import SignIn from "@/components/Sign-in";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="">
      <Header />
      <AccountInfo />
      <div className="flex mt-[-12rem] h-screen flex-col items-center justify-center">
        <Link
          href="/"
          className="absolute left-10 top-40 text-2xl hover:underline"
        >
          {" "}
          Back
        </Link>
        <SignIn />
      </div>
    </main>
  );
}
