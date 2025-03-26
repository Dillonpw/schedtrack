import { ReactNode } from "react";

export interface HeaderProps {
  children: ReactNode;
}

export interface ScheduleEntry {
  id: number;
  date: string;
  dayOfWeek: string;
  shift: string;
  note: string | null;
  description: string | null;
  repeatEvents:
    | {
        id: string;
        description: string | null;
        daysOfWeek: number[];
      }[]
    | null;
}

export interface RepeatEvent {
  id: string;
  description: string | null;
  daysOfWeek: number[];
}

export interface ShiftSegment {
  shiftType: "On" | "Off";
  days: number | undefined;
  note: string | null;
  description: string | null;
  repeatEvents?: RepeatEvent[];
}

export interface FormData {
  segments: ShiftSegment[];
  totalDays: number | undefined;
  startDate: Date | undefined;
  scheduleName: string;
}

export interface GenerateScheduleParams {
  segments: ShiftSegment[];
  totalDays: number;
  startDate: Date;
  name: string;
}
