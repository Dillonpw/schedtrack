import { useState, useEffect } from 'react';
import { ScheduleEntry, ShiftSegment } from '@/types';

const SESSION_STORAGE_KEY = 'guest_schedule';

export const useSessionSchedule = () => {
  const [SessionSchedule, setSessionSchedule] = useState<ScheduleEntry[]>([]);

  useEffect(() => {
    // Load schedule from sessionStorage on component mount
    const savedSchedule = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedSchedule) {
      setSessionSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  const saveSessionSchedule = (scheduleData: ScheduleEntry[]) => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(scheduleData));
    setSessionSchedule(scheduleData);
  };

  const clearSessionSchedule = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setSessionSchedule([]);
  };

  return {
    SessionSchedule,
    saveSessionSchedule,
    clearSessionSchedule,
  };
};

export const generateSessionSchedule = ({
  segments,
  totalDays,
  startDate,
}: {
  segments: ShiftSegment[];
  totalDays: number;
  startDate: Date;
}): ScheduleEntry[] => {
  const schedule: ScheduleEntry[] = [];
  let currentDate = new Date(startDate);
  let segmentIndex = 0;
  let daysInCurrentSegment = 0;

  for (let day = 0; day < totalDays; day++) {
    const segment = segments[segmentIndex];
    const entry: ScheduleEntry = {
      date: currentDate.toISOString().split('T')[0],
      dayOfWeek: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
      shift: segment.shiftType,
      title: segment.title,
    };

    schedule.push(entry);
    daysInCurrentSegment++;

    if (daysInCurrentSegment >= (segment.days || 0)) {
      segmentIndex = (segmentIndex + 1) % segments.length;
      daysInCurrentSegment = 0;
    }

    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  return schedule;
};