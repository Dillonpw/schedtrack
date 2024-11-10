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
  days: number;
}

export interface FormData {
  segments: ShiftSegment[];
  totalDays: number;
  startDate: Date | undefined;
}

export type feedbackData = {
  text: string;
  date: Date;
};
