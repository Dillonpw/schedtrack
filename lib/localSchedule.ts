import { useState, useEffect } from 'react';
import { ScheduleEntry, ShiftSegment } from '@/types';

const LOCAL_STORAGE_KEY = 'guest_schedule';

export const useLocalSchedule = () => {
  const [localSchedule, setLocalSchedule] = useState<ScheduleEntry[]>([]);

  useEffect(() => {
    // Load schedule from localStorage on component mount
    const savedSchedule = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedSchedule) {
      setLocalSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  const saveLocalSchedule = (scheduleData: ScheduleEntry[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scheduleData));
    setLocalSchedule(scheduleData);
  };

  const clearLocalSchedule = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setLocalSchedule([]);
  };

  return {
    localSchedule,
    saveLocalSchedule,
    clearLocalSchedule,
  };
};

// Modify the generateSchedule function to work with localStorage
export const generateLocalSchedule = ({
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