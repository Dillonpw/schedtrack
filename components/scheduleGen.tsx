"use client";

import React, { useState } from "react";
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
  totalDays: number;
  startDate: Date | undefined;
} => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const { segments, totalDays, startDate } = formData;

  const addSegment = () => {
    setFormData((prev) => ({
      ...prev,
      segments: [...prev.segments, { shiftType: "Work", days: 1 }],
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
    totalDays,
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
  value: number;
  onChange: (value: number) => void;
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
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      min={min}
      max={max}
      required
    />
  </div>
);

export default function GenerateSchedule() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const {
    formData,
    addSegment,
    updateSegment,
    removeSegment,
    updateField,
    segments,
    totalDays,
    startDate,
  } = useScheduleForm({
    segments: [
      { shiftType: "Work", days: 4 },
      { shiftType: "Off", days: 2 },
    ],
    totalDays: 90,
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
        totalDays,
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
    <main className="container mx-auto py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Generate Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateSchedule} className="space-y-6">
            <div className="space-y-4">
              {segments.map((segment, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 space-y-2">
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
                      <div className="flex-1">
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
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSegment(index)}
                        className="text-destructive"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addSegment}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Segment
            </Button>
            <div className="flex flex-col items-center gap-4">
              <FormField
                label="Total Days"
                id="totalDays"
                value={totalDays}
                onChange={(value) => updateField("totalDays", value)}
                min={1}
                max={365}
                tooltip="Enter the number of days ahead you would like to display"
              />
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
                  onSelect={(date) => updateField("startDate", date as Date)}
                  className="rounded-md"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Generate Schedule
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
