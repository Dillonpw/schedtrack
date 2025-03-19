import { useState, useEffect } from "react";
import { FormData, ShiftSegment } from "@/types";

export const useScheduleForm = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const { segments, startDate, scheduleName } = formData;

  useEffect(() => {
    const total = segments.reduce(
      (sum, segment) => sum + (segment.days || 0),
      0,
    );
    setFormData((prev) => ({ ...prev, totalDays: total }));
  }, [segments]);

  const addSegment = (type: "On" | "Off") => {
    setFormData((prev) => ({
      ...prev,
      segments: [
        ...prev.segments,
        {
          shiftType: type,
          days: undefined,
          note: type === "On" ? "" : null,
          description: null,
        },
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
    value: number | Date | ShiftSegment[] | string | undefined,
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
    scheduleName,
  };
};
