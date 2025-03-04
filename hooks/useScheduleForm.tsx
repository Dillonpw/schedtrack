import { useState, useEffect } from 'react';
import { FormData, ShiftSegment } from "@/types";

export const useScheduleForm = (initialData: FormData) => {
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
