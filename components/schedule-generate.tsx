"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { generateSchedule } from "@/lib/actions/generateSchedule";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle } from 'lucide-react';
import { FormField } from './form-field';
import { SegmentCard } from './shift-segment-card';
import { useScheduleForm } from '@/hooks/useScheduleForm';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';

export default function GenerateSchedule() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
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

  const handleGenerateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !session) {
      toast({
        title: "Error",
        description: "Please select a start date and ensure you're logged in.",
        variant: "destructive",
      });
      return;
    }

    try {
      await generateSchedule({
        segments,
        totalDays: totalDays || 0,
        startDate,
      });
      router.push("/schedule");
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

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        Please sign in to generate a schedule.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 dark:bg-muted sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-4xl border-none bg-border dark:bg-muted">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Generate Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateSchedule} className="space-y-6">
            <div className="flex flex-col gap-6 md:flex-row">
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
                <div className="flex justify-center md:justify-start">
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
                        max={630}
                        tooltip="Enter the number of days ahead you would like to display"
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
                            Select the first day of your next or last rotation
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) =>
                          updateField("startDate", date as Date)
                        }
                        className="rounded-md"
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

