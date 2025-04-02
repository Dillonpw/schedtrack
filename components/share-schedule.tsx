"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { shareSchedule } from "@/lib/actions/share-schedule";

interface ShareScheduleProps {
  scheduleId: number;
  isPro: boolean;
}

export function ShareSchedule({ scheduleId, isPro }: ShareScheduleProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPro) {
      toast({
        title: "Pro Feature",
        description: "Schedule sharing is available for Pro users only.",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await shareSchedule(scheduleId, email);

      if (result.success) {
        toast({
          title: "Success",
          description: "Schedule shared successfully",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Share error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to share schedule",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleShare} className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter email to share with"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={!isPro}
        required
      />
      <Button type="submit" disabled={isLoading || !isPro}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sharing...
          </>
        ) : (
          "Share"
        )}
      </Button>
    </form>
  );
}
