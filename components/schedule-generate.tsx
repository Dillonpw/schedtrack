"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import { generateSchedule } from "@/lib/actions/generateSchedule";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FormData, ShiftSegment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, MinusCircle, HelpCircle } from "lucide-react";

const useScheduleForm = (
  initialData: FormData,
): {
  formData: FormData;
  addSegment: () => void;
  updateSegment: (index: number, field: keyof ShiftSegment, value: any) => void;
  removeSegment: (index: number) => void;
  updateField: (
    field: keyof FormData,
    value: number | Date | ShiftSegment[] | undefined,
  ) => void;
  segments: ShiftSegment[];
  totalDays: number | undefined;
  startDate: Date | undefined;
} => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const { segments, startDate } = formData;

  useEffect(() => {
    const total = segments.reduce(
      (sum, segment) => sum + (segment.days || 0),
      0,
    );
    setFormData((prev) => ({ ...prev, totalDays: total }));
  }, [segments]);

  const addSegment = () => {
    setFormData((prev) => ({
      ...prev,
      segments: [
        ...prev.segments,
        { shiftType: "Work", days: undefined, title: "" },
      ],
    }));
  };

  const updateSegment = (
    index: number,
    field: keyof ShiftSegment,
    value: any,
  ) => {
    setFormData((prev) => {
      const newSegments = [...prev.segments];
      newSegments[index] = { ...newSegments[index], [field]: value };
      return { ...prev, segments: newSegments };
    });
  };

  const removeSegment = (index: number) => {
    setFormData((prev) => {
      const newSegments = [...prev.segments];
      newSegments.splice(index, 1);
      return { ...prev, segments: newSegments };
    });
  };

  const updateField = (
    field: keyof FormData,
    value: number | Date | ShiftSegment[] | undefined,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    addSegment,
    updateSegment,
    removeSegment,
    updateField,
    segments,
    totalDays: formData.totalDays,
    startDate,
  };
};

const FormField = ({
  label,
  id,
  value,
  onChange,
  min,
  max,
  tooltip,
}: {
  label: string;
  id: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  min: number;
  max?: number;
  tooltip: string;
}) => (
  <div className="space-y-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label htmlFor={id} className="flex items-center gap-1">
            {label} <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </Label>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Input
      type="number"
      id={id}
      value={value !== undefined && value !== 0 ? value : ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange(val ? parseInt(val, 10) : undefined);
      }}
      min={min}
      max={max}
      placeholder="Enter days"
      className="bg-gray-200 text-black"
      required
    />
  </div>
);

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
        totalDays: totalDays || 0, // Handle undefined totalDays
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
                  <Card key={index}>
                    <CardContent className="rounded-lg pt-6 dark:bg-background">
                      <div className="flex flex-col items-center gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`segment-type-${index}`}>
                            Shift Type
                          </Label>
                          <Select
                            value={segment.shiftType}
                            onValueChange={(value) =>
                              updateSegment(
                                index,
                                "shiftType",
                                value as "Work" | "Off",
                              )
                            }
                          >
                            <SelectTrigger id={`segment-type-${index}`}>
                              <SelectValue placeholder="Select shift type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Work">Work</SelectItem>
                              <SelectItem value="Off">Off</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <FormField
                          label="Days"
                          id={`segment-days-${index}`}
                          value={segment.days}
                          onChange={(value) =>
                            updateSegment(index, "days", value)
                          }
                          min={1}
                          tooltip="Enter the number of days for this segment"
                        />
                        {segment.shiftType === "Work" && (
                          <div className="space-y-2">
                            <Label htmlFor={`segment-title-${index}`}>
                              Shift Title
                            </Label>
                            <Input
                              type="text"
                              id={`segment-title-${index}`}
                              value={segment.title || ""}
                              onChange={(e) =>
                                updateSegment(index, "title", e.target.value)
                              }
                              placeholder="Enter shift title"
                              className="bg-gray-200 text-black"
                            />
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSegment(index)}
                          className="h-10 w-10 shrink-0 text-destructive"
                        >
                          <MinusCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
