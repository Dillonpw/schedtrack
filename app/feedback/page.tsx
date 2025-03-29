import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FeedbackForm } from "@/components/forms/feedback-form";
import { Card } from "@/components/ui/card";
import AccountInfo from "@/components/account-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provide Feedback | Sched Track",
  description:
    "Share your thoughts about our rotating schedule builder and help us improve. We value your feedback on our scheduling tools and services.",
  keywords: [
    "feedback",
    "schedule feedback",
    "rotating schedule",
    "shift scheduling",
    "user suggestions",
    "schedule builder feedback",
  ],
  openGraph: {
    title: "Share Your Feedback | Sched Track",
    description:
      "Help us improve our rotating schedule builder with your valuable feedback. We're constantly working to make our scheduling tools better.",
    type: "website",
  },
};

export default async function FeedbackPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <AccountInfo />
      <div className="container mx-auto p-8">
        <h1 className="mb-4 text-2xl font-bold">Share Your Feedback</h1>
        <Card className="border-primary/20 relative mb-8 border p-6 shadow-lg">
          <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
          <div className="relative">
            We review every piece of feedback we receive, and if it calls for
            any kind of follow up we will reach out as soon as possible! Thank
            you for taking the time to leave us your feedback!
          </div>
        </Card>
        <FeedbackForm />
      </div>
    </>
  );
}
