"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import ScheduleData from "@/components/schedule-data";
import AccountInfo from "@/components/account-info";

export default function SchedulePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin");
    }
  }, [status]);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || "Failed to create checkout session");
      }

      if (!data.url) {
        throw new Error("No checkout URL received");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to start subscription process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      toast({
        title: "Success",
        description: "Your subscription has been cancelled.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-primary h-12 w-12 animate-spin" />
          <p className="text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <AccountInfo />
      {session?.user ? (
        <>
          <ScheduleData />
          <div className="container mx-auto p-8">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <p className="text-muted-foreground">
                      {session.user.subscription === "pro" ? "Pro" : "Free"}
                    </p>
                  </div>
                  {session.user.subscription === "pro" && (
                    <div>
                      <h3 className="font-medium">Subscription Status</h3>
                      <p className="text-muted-foreground">Active</p>
                    </div>
                  )}
                  {session.user.subscription === "free" ? (
                    <Button onClick={handleSubscribe} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Upgrade to Pro"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCancelSubscription}
                      disabled={isLoading}
                      variant="destructive"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        "Cancel Subscription"
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="mx-auto">
          <ScheduleData />
        </div>
      )}
    </main>
  );
}
