"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSessionSchedule } from "@/lib/sessionSchedule";
import ClientScheduleView from "./schedule-view";
import { ScheduleEntry } from "@/types";

export default function ScheduleData() {
  const { data: session } = useSession();
  const { SessionSchedule } = useSessionSchedule();
  const [scheduleData, setScheduleData] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        if (session) {
          // Fetch authenticated user's schedule from your API
          const response = await fetch("/api/schedule");
          if (!response.ok) {
            throw new Error("Failed to fetch schedule");
          }
          const data = await response.json();
          setScheduleData(data);
        } else {
          // Use session schedule for guest users
          setScheduleData(SessionSchedule || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load schedule");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [session, SessionSchedule]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg">Loading schedule...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (scheduleData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg">
          No schedule found. Please generate a schedule first.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ClientScheduleView scheduleEntriesData={scheduleData} />
    </div>
  );
}