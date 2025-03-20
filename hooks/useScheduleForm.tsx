"use client";

import { useState } from "react";
import type { ShiftSegment } from "@/types";

interface ScheduleFormState {
  segments: ShiftSegment[];
  totalDays: number | undefined;
  startDate: Date;
  scheduleName: string;
}

export function useScheduleForm(initialState: ScheduleFormState) {
  const [segments, setSegments] = useState<ShiftSegment[]>(
    initialState.segments,
  );
  const [totalDays, setTotalDays] = useState<number | undefined>(
    initialState.totalDays,
  );
  const [startDate, setStartDate] = useState<Date>(initialState.startDate);
  const [scheduleName, setScheduleName] = useState<string>(
    initialState.scheduleName,
  );

  const addSegment = (shiftType: "On" | "Off") => {
    setSegments([
      ...segments,
      { shiftType, days: undefined, note: "", description: "" },
    ]);
  };

  const updateSegment = (
    index: number,
    field: keyof ShiftSegment,
    value: any,
  ) => {
    const updatedSegments = [...segments];
    updatedSegments[index] = {
      ...updatedSegments[index],
      [field]: value,
    };
    setSegments(updatedSegments);
  };

  const removeSegment = (index: number) => {
    setSegments(segments.filter((_, i) => i !== index));
  };

  const updateField = (field: keyof ScheduleFormState, value: any) => {
    switch (field) {
      case "segments":
        setSegments(value);
        break;
      case "totalDays":
        setTotalDays(value);
        break;
      case "startDate":
        // Create a new date object and set to noon to avoid timezone issues
        const newDate = new Date(value);
        newDate.setHours(12, 0, 0, 0);
        setStartDate(newDate);
        break;
      case "scheduleName":
        setScheduleName(value);
        break;
    }
  };

  return {
    segments,
    totalDays,
    startDate,
    scheduleName,
    addSegment,
    updateSegment,
    removeSegment,
    updateField,
  };
}
