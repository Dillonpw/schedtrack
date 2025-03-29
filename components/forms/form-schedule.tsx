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
import { PlusCircle, Calendar, Loader2 } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { SegmentCard } from "@/components/forms/shift-segment-card";
import { useScheduleForm } from "@/hooks/useScheduleForm";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WeeklyScheduleCard } from "@/components/forms/repeat-event-card";
import { v4 as uuidv4 } from "uuid";
import { RepeatEvent } from "@/types";

export default function GenerateScheduleForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("rotating");
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    addSegment,
    updateSegment,
    removeSegment,
    updateField,
    segments,
    totalDays,
    startDate,
    scheduleName,
  } = useScheduleForm({
    segments: [{ shiftType: "On", days: undefined, note: "", description: "" }],
    totalDays: undefined,
    startDate: new Date(),
    scheduleName: "",
  });

  const addRepeatEvent = () => {
    const newEvent: RepeatEvent = {
      id: uuidv4(),
      description: null,
      daysOfWeek: [],
      repeatInterval: 1, // Default to every week
    };

    const updatedEvents = [...(segments[0].repeatEvents || []), newEvent];
    updateSegment(0, "repeatEvents", updatedEvents);
  };

  const updateRepeatEvent = (
    eventId: string,
    field: keyof RepeatEvent,
    value: any,
  ) => {
    const updatedEvents = (segments[0].repeatEvents || []).map((event) =>
      event.id === eventId ? { ...event, [field]: value } : event,
    );
    updateSegment(0, "repeatEvents", updatedEvents);
  };

  const removeRepeatEvent = (eventId: string) => {
    const updatedEvents = (segments[0].repeatEvents || []).filter(
      (event) => event.id !== eventId,
    );
    updateSegment(0, "repeatEvents", updatedEvents);
  };

  const handleGenerateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !session || !scheduleName) {
      toast({
        title: "Error",
        description:
          "Please fill in all required fields and ensure you're logged in.",
        variant: "destructive",
      });
      return;
    }

    const daysToGenerate = totalDays || 30;

    if (segments.length === 0) {
      addSegment("On");
    }

    setIsGenerating(true);
    try {
      await generateSchedule({
        segments:
          segments.length === 0
            ? [
                {
                  shiftType: "On",
                  days: 1,
                  note: "",
                  description: "",
                },
              ]
            : segments,
        totalDays: daysToGenerate,
        startDate,
        name: scheduleName,
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
        description: `Failed to generate schedule: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddSegment = (type: "On" | "Off") => {
    addSegment(type);
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

  if (status === "unauthenticated") {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <Card className="border-destructive/20 w-full max-w-md border-2 p-6 text-center shadow-lg">
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
      <Card className="mx-auto w-full max-w-3xl overflow-hidden border border-white/20 bg-white/10 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/10">
        <CardHeader className="bg-primary/5 pb-6">
          <CardTitle className="text-center text-2xl font-bold">
            Create Your Schedule
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Define your On and off-duty segments to generate a personalized
            schedule
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form
            onSubmit={handleGenerateSchedule}
            className="space-y-8"
            autoComplete="off"
          >
            <div className="space-y-6">
              <Card className="overflow-hidden border border-white/20 bg-white/5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/5">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3">
                    <Label
                      htmlFor="scheduleName"
                      className="text-muted-foreground text-sm font-medium"
                    >
                      Schedule Name
                    </Label>
                    <Input
                      id="scheduleName"
                      className="dark:text-black"
                      placeholder="Enter a name for your schedule"
                      value={scheduleName}
                      onChange={(e) =>
                        updateField("scheduleName", e.target.value)
                      }
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-card/50 overflow-hidden border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <Label
                        htmlFor="totalDays"
                        className="text-muted-foreground text-sm font-medium"
                      >
                        Schedule Length
                      </Label>
                      <FormField
                        label=""
                        id="totalDays"
                        value={totalDays}
                        onChange={(value) => updateField("totalDays", value)}
                        min={1}
                        max={1095}
                        tooltip="Enter the number of days to display in your schedule (maximum 2 years)"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 overflow-hidden border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <Label className="text-muted-foreground text-sm font-medium">
                        Start Date
                      </Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="text-muted-foreground h-4 w-4" />
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

              <div>
                <Tabs
                  defaultValue="rotating"
                  className="w-full"
                  onValueChange={(value) => {
                    setActiveTab(value);
                    if (
                      value === "repeating" &&
                      (!segments[0].repeatEvents ||
                        segments[0].repeatEvents.length === 0)
                    ) {
                      addRepeatEvent();
                    }
                  }}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="rotating">
                      Rotating Schedule
                    </TabsTrigger>
                    <TabsTrigger value="repeating">Weekly Schedule</TabsTrigger>
                  </TabsList>

                  <TabsContent value="rotating" className="mt-4">
                    <div className="space-y-3">
                      {segments.map((segment, index) => (
                        <SegmentCard
                          key={index}
                          segment={segment}
                          index={index}
                          segments={segments}
                          updateSegment={updateSegment}
                          removeSegment={removeSegment}
                        />
                      ))}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button
                        type="button"
                        onClick={() => handleAddSegment("On")}
                        variant="outline"
                        className="flex-1 border-dashed"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Segment
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="repeating" className="mt-4">
                    <div className="space-y-3">
                      {(segments[0].repeatEvents || []).map((event) => (
                        <WeeklyScheduleCard
                          key={event.id}
                          event={event}
                          onUpdate={updateRepeatEvent}
                          onRemove={removeRepeatEvent}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={isGenerating}
                className="from-primary to-secondary text-primary-foreground group bg-gradient-to-r transition-all hover:scale-105"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Schedule...
                  </>
                ) : (
                  "Generate My Schedule"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
