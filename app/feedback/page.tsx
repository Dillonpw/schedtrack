import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FeedbackForm } from "@/components/forms/feedback-form";
import { Card } from "@/components/ui/card";
import AccountInfo from "@/components/account-info";

export default async function FeedbackPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <AccountInfo />
      <div className="container mx-auto p-8">
        <Card className="mb-8 p-4">
          We revew every piece of feedback we receive, and if it calls for any
          kind of follow up we will reach out as soon as possible! Thank you for
          taking the time to leave us your feedback!
        </Card>
        <FeedbackForm />
      </div>
    </>
  );
}
