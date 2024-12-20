import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
}

export interface ScheduleEntry {
  date: string;
  dayOfWeek: string;
  shift: string;
}

export interface ShiftSegment {
  shiftType: "Work" | "Off";
  days: number | undefined;
}

export interface FormData {
  segments: ShiftSegment[];
  totalDays: number | undefined;
  startDate: Date | undefined;
}
