import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
}

export interface ScheduleEntry {
  date: string;
  dayOfWeek: string;
  shift: string;
}

export type FormData = {
    workDays: number;
    offDays: number;
    totalDays: number;
    startDate: Date | undefined;
  };
  
export type feedbackData = {
    text: string;
    date: Date;
}