import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
}

export interface ScheduleEntry {
  date: string;
  dayOfWeek: string;
  shift: string;
  title: string | null;
}

export interface ShiftSegment {
  shiftType: "Work" | "Off";
  days: number | undefined;
  title: string | null;
}

export interface FormData {
  segments: ShiftSegment[];
  totalDays: number | undefined;
  startDate: Date | undefined;
}
