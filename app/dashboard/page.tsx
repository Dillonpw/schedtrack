import Header from "@/components/Header";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Dashboard() {
  const session = await auth();

  if (!session?.user)
    return (
    <main>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center">
        <Link
          href="/"
          className="absolute left-10 top-20 text-2xl hover:underline"
        >
          {" "}
          Back
        </Link>

      </div>
    </main>
    );

  return (
    <main>
      <Header />
      <h1>Dashboard</h1>
    </main>
  );
}
