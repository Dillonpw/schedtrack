import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FeedbackForm } from "@/components/feedback-form";

export default async function FeedbackPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Feedback & Bug Reports</h1>
      <FeedbackForm />
    </div>
  );
}
