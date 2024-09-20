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
import { FormData } from "@/types";

/**
 * React hook to manage the state of the schedule generation form.
 *
 * @param {FormData} initialData The initial form data.
 * @returns An object with the following properties:
 * - formData: The current form data.
 * - updateField: A function to update a single field in the form data.
 * - workDays: The current number of work days.
 * - offDays: The current number of off days.
 * - totalDays: The current total number of days.
 * - startDate: The current start date.
 */
const useScheduleForm = (
  initialData: FormData,
): {
  formData: FormData;
  updateField: (
    field: keyof FormData,
    value: number | Date | undefined,
  ) => void;
  workDays: number;
  offDays: number;
  totalDays: number;
  startDate: Date | undefined;
} => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const { workDays, offDays, totalDays, startDate } = formData;

  /**
   * A function to update a single field in the form data.
   *
   * @param {keyof FormData} field The field to update.
   * @param {number | Date | undefined} value The new value of the field.
   */
  const updateField = (
    field: keyof FormData,
    value: number | Date | undefined,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return { formData, updateField, workDays, offDays, totalDays, startDate };
};

/**
 * A reusable form field component.
 *
 * @param {string} label The label for the field.
 * @param {string} id The ID of the field.
 * @param {number} value The current value of the field.
 * @param {(value: number) => void} onChange The function to call when the field is changed.
 * @param {number} min The minimum allowed value for the field.
 * @param {number | undefined} max The maximum allowed value for the field.
 * @param {string} tooltip The tooltip text to display when the user hovers over the label.
 */
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
  <div className="w-full">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <label htmlFor={id} className="mb-2 block text-sm font-medium">
            {label}{" "}
            <span className="rounded-full border bg-muted px-1 text-xs">?</span>
          </label>
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
      className="w-full"
    />
  </div>
);

/**
 * Component to generate a rotating schedule.
 */
export default function GenerateSchedule() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const { formData, updateField, workDays, offDays, totalDays, startDate } =
    useScheduleForm({
      /**
       * Defaults for the form fields.
       */
      workDays: 4,
      offDays: 2,
      totalDays: 90,
      startDate: new Date(),
    });

  /**
   * Handles form submission by generating a schedule with the provided form data.
   */
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
        workDays,
        offDays,
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
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Generate Schedule
        </h1>
        <form onSubmit={handleGenerateSchedule} className="space-y-6">
          <FormField
            label="Work Days"
            id="workDays"
            value={workDays}
            onChange={(value) => updateField("workDays", value)}
            min={1}
            tooltip="Enter the number of consecutive work days in your rotation"
          />
          <FormField
            label="Off Days"
            id="offDays"
            value={offDays}
            onChange={(value) => updateField("offDays", value)}
            min={1}
            tooltip="Enter the number of consecutive days off in your rotation"
          />
          <FormField
            label="Total Days"
            id="totalDays"
            value={totalDays}
            onChange={(value) => updateField("totalDays", value)}
            min={1}
            max={183}
            tooltip="Enter the number of days ahead you would like to display"
          />
          <div className="w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label className="mb-2 block text-sm font-medium">
                    Start Date{" "}
                    <span className="rounded-full border bg-muted px-1 text-xs">
                      ?
                    </span>
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  Select the first day of your next or last rotation
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Calendar
              /**
               * Mode for the calendar (single, multiple, or range).
               */
              mode="single"
              /**
               * Currently selected date.
               */
              selected={startDate}
              /**
               * Function to call when a date is selected.
               */
              onSelect={(date) => updateField("startDate", date as Date)}
              /**
               * Additional CSS classes for the calendar.
               */
              className="rounded-md items-center justify-center"
            />
          </div>
          <Button type="submit" className="w-full">
            Generate Schedule
          </Button>
        </form>
      </div>
    </main>
  );
}
