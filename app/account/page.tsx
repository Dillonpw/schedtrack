import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AccountInfo from "@/components/account-info";
import AccountManagement from "@/components/account-management";
import AccountStatistics from "@/components/account-statistics";

export default async function AccountPage() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
  }

  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <main>
      <div className="container mx-auto p-8">
        <h1 className="mb-8 text-2xl font-bold">Account Management</h1>
        <AccountStatistics />
        <AccountManagement />
      </div>
    </main>
  );
}
