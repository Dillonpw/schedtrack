"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClientScheduleView from "@/components/schedule-view";
import TodayView from "@/components/today-view";
import type { ScheduleEntryWithName } from "@/types";

export default function ScheduleTabs({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntryWithName[];
}) {
  const [activeTab, setActiveTab] = useState("schedule");

  useEffect(() => {
    const savedTab = localStorage.getItem("scheduleActiveTab");
    if (savedTab === "schedule" || savedTab === "today") {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("scheduleActiveTab", value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <div className="mb-4 flex justify-center">
        <TabsList>
          <TabsTrigger value="schedule">Calendar</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="schedule" className="mt-0">
        <ClientScheduleView scheduleEntriesData={scheduleEntriesData} />
      </TabsContent>

      <TabsContent value="today" className="mt-0">
        <TodayView scheduleEntriesData={scheduleEntriesData} />
      </TabsContent>
    </Tabs>
  );
}
