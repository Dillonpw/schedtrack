import { ReactNode } from "react";

export interface HeaderProps {
  children: ReactNode;
}

export interface ScheduleFormState {
  segments: ShiftSegment[];
  totalDays: number | undefined;
  startDate: Date;
  scheduleName: string;
}

export interface DeleteScheduleButtonProps {
  scheduleId: number;
  scheduleName: string;
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
  overrides?: {
    shift?: string;
    note?: string | null;
    description?: string | null;
  };
}

export interface DaySelectorProps {
  selectedDays: number[];
  onChange: (days: number[]) => void;
}

export interface RepeatEvent {
  id: string;
  description: string | null;
  note: string | null;
  daysOfWeek: number[];
  repeatInterval: number;
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

export interface ScheduleEntryWithName extends ScheduleEntry {
  scheduleName: string;
}

export interface ScheduleInfo {
  id: number;
  name: string;
  createdAt: Date;
  entryCount: number;
  startDate: Date | null;
}

export interface ScheduleEntryUpdate {
  id: number;
  shift: "On" | "Off";
  note: string | null;
  description: string | null;
}

export interface ScheduleEntryWithName extends ScheduleEntry {
  scheduleName: string;
  scheduleId: number;
}

export interface CalendarViewProps {
  scheduleEntriesData: ScheduleEntryWithName[];
  visibleSchedules: string[];
  scheduleColors: Record<string, string>;
}
