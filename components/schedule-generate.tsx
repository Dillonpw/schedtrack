"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { generateSchedule } from "@/lib/actions/generateSchedule";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle, HelpCircle, Calendar, Loader2 } from "lucide-react";
import { FormField } from "./form-field";
import { SegmentCard } from "./shift-segment-card";
import { useScheduleForm } from "@/hooks/useScheduleForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export default function GenerateScheduleForm() {
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
      toast({
        title: "Success!",
        description: "Your schedule has been generated.",
        variant: "default",
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
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <Card className="w-full max-w-md border-2 border-destructive/20 p-6 text-center shadow-lg">
          <CardTitle className="mb-2 text-xl">
            Authentication Required
          </CardTitle>
          <CardDescription className="text-base">
            Please sign in to create and manage your work schedules.
          </CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <Card className="mx-auto w-full max-w-3xl overflow-hidden bg-card shadow-lg">
        <CardHeader className="bg-primary/5 pb-6">
          <CardTitle className="text-center text-2xl font-bold">
            Create Your Work Schedule
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Define your work and off-duty segments to generate a personalized
            schedule
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleGenerateSchedule} className="space-y-8">
            <div className="space-y-6">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Shift Segments</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4" />
                          <span className="sr-only">Help</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                        <p>
                          Define your work rotation pattern. Add segments for
                          work days and off days.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-3">
                  {segments.map((segment, index) => (
                    <SegmentCard
                      key={index}
                      segment={segment}
                      index={index}
                      updateSegment={updateSegment}
                      removeSegment={removeSegment}
                    />
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={addSegment}
                  variant="outline"
                  className="mt-3 w-full border-dashed bg-background text-gray-100 hover:bg-background/50"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Segment
                </Button>
              </div>

              <Separator />

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="overflow-hidden border bg-card/50 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <Label
                        htmlFor="totalDays"
                        className="text-sm font-medium"
                      >
                        Schedule Length
                      </Label>
                      <FormField
                        label=""
                        id="totalDays"
                        value={totalDays}
                        onChange={(value) => updateField("totalDays", value)}
                        min={1}
                        max={630}
                        tooltip="Enter the number of days to display in your schedule"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border bg-card/50 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <Label className="text-sm font-medium">Start Date</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <DatePicker
                          date={startDate}
                          onDateChange={(date) =>
                            updateField("startDate", date)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                size="lg"
                className="relative overflow-hidden bg-primary px-8 text-primary-foreground transition-all hover:bg-primary/90"
              >
                <span className="relative z-10">Generate My Schedule</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
