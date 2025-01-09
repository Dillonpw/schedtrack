"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { generateSchedule } from "@/lib/actions/generateSchedule";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { FormField } from "./form-field";
import { SegmentCard } from "./shift-segment-card";
import { useScheduleForm } from "@/hooks/useScheduleForm";
import { generateSessionSchedule, useSessionSchedule } from "@/lib/sessionSchedule";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export default function GenerateSchedule() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const { saveSessionSchedule } = useSessionSchedule();

  const {
    addSegment,
    updateSegment,
    removeSegment,
    updateField,
    segments,
    totalDays,
    startDate,
  } = useScheduleForm({
    segments: [
      { shiftType: "Work", days: undefined, title: "" },
      { shiftType: "Off", days: undefined, title: null },
    ],
    totalDays: undefined,
    startDate: new Date(),
  });
  const MAX_DAYS_LOGGED_IN = 630;
  const MAX_DAYS_GUEST = 60;

  const handleGenerateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedTotalDays = totalDays ?? 60; // Use 0 if totalDays is undefined

    if (!startDate) {
      toast({
        title: "Error",
        description: "Please select a start date.",
        variant: "destructive",
      });
      return;
    }

    // Additional validation for guest users
    if (!session && resolvedTotalDays > MAX_DAYS_GUEST) {
      toast({
        title: "Error",
        description: `As a guest, you can only schedule up to ${MAX_DAYS_GUEST} days into the future.`,
        variant: "destructive",
      });
      return;
    }

    try {
      if (session) {
        // Handle authenticated user
        await generateSchedule({
          segments,
          totalDays: totalDays || 0,
          startDate,
        });
        router.push("/schedule");
      } else {
        // Handle guest user
        const sessionSchedule = generateSessionSchedule({
          segments,
          totalDays: totalDays || 0,
          startDate,
        });
        saveSessionSchedule(sessionSchedule);
        router.push("/schedule");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate schedule. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 dark:bg-muted sm:px-6 md:mx-40 lg:px-8">
      <Card className="mx-auto w-full max-w-4xl border-none bg-border dark:bg-muted">
        <CardContent>
          {!session && (
            <div className="mb-6 rounded-lg bg-blue-100 p-4 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
              <p>
                You are using the app as a guest. Your schedule will be lost
                after you leave the page. Sign in to save your data, and gain
                access to additional options.
              </p>
            </div>
          )}
          <form onSubmit={handleGenerateSchedule} className="space-y-6">
            <div className="flex flex-col gap-6">
              <div className="flex-1 space-y-4">
                {segments.map((segment, index) => (
                  <SegmentCard
                    key={index}
                    segment={segment}
                    index={index}
                    updateSegment={updateSegment}
                    removeSegment={removeSegment}
                  />
                ))}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    onClick={addSegment}
                    className="w-full border-2 border-gray-300 bg-accent text-foreground hover:bg-accent/80 hover:text-accent-foreground dark:bg-background md:w-auto"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Segment
                  </Button>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <Card>
                  <CardContent className="rounded-lg pt-6 dark:bg-background">
                    <div className="flex flex-col items-center gap-2">
                      <FormField
                        label="Total Days"
                        id="totalDays"
                        value={totalDays}
                        onChange={(value) => updateField("totalDays", value)}
                        min={1}
                        max={session ? MAX_DAYS_LOGGED_IN : MAX_DAYS_GUEST} // Set limit conditionally
                        tooltip={
                          session
                            ? "Enter the number of days ahead you would like to display (up to 630 days)"
                            : `As a guest, you can only schedule up to ${MAX_DAYS_GUEST} days into the future`
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="rounded-lg pt-6 dark:bg-background">
                    <div className="flex flex-col items-center space-y-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Label className="flex items-center gap-1">
                              Start Date{" "}
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            Select the first day of a recent work rotation
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DatePicker
                        date={startDate}
                        onDateChange={(date) => updateField("startDate", date)}
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-full bg-blue-700 text-primary-foreground hover:bg-blue-700/80 dark:bg-red-500 dark:hover:bg-red-500/80 md:w-auto"
                  >
                    Generate Schedule
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
