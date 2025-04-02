"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export function SubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-subscription", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create subscription");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isLoading}
      className="from-primary to-secondary text-primary-foreground bg-gradient-to-r hover:scale-105"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Upgrade to Pro"
      )}
    </Button>
  );
}
