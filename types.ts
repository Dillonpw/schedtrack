import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
}

export interface ScheduleEntry {
  date: string;
  dayOfWeek: string;
  shift: string;
}

// types.ts
export type FormData = {
    workDays: number;
    offDays: number;
    totalDays: number;
    startDate: Date | undefined;
  };
  
