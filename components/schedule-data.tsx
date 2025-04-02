"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ShareSchedule } from "./share-schedule";
import { db } from "@/db/index";
import { schedules } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import type { ScheduleEntry } from "@/types";
import ClientScheduleView from "./schedule-view";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import DeleteScheduleButton from "@/components/delete-schedule";
import { unstable_noStore as noStore } from "next/cache";
import type { ScheduleEntryWithName, ScheduleInfo } from "@/types";

interface Schedule {
  id: number;
  name: string;
  schedule: any[];
}

export default function ScheduleData() {
  const { data: session } = useSession();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch("/api/schedules");
        if (!response.ok) throw new Error("Failed to fetch schedules");
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchSchedules();
    }
  }, [session]);

  if (!session?.user) {
    return null;
  }

  if (isLoading) {
    return <div>Loading schedules...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="mb-4 text-2xl font-bold">Your Schedules</h2>
      <div className="grid gap-4">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-medium">{schedule.name}</h3>
              <p className="text-sm text-gray-500">
                {schedule.schedule.length} events
              </p>
            </div>
            <ShareSchedule
              scheduleId={schedule.id}
              isPro={session.user.subscription === "pro"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
