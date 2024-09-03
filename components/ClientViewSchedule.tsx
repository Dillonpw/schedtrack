// ClientScheduleView.tsx
"use client"

import React, { useState } from "react"
import { ScheduleEntry } from "@/types"
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import DownloadButton from "@/components/DownloadBtn"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer for React Big Calendar
const localizer = momentLocalizer(moment)

export default function ClientScheduleView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[]
}) {
  const [isCalendarView, setIsCalendarView] = useState(false)

  if (scheduleEntriesData.length === 0) {
    return <p className="text-center text-lg">No schedule available</p>
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <DownloadButton scheduleEntriesData={scheduleEntriesData} />
        <div className="flex items-center space-x-2">
          <Label htmlFor="view-toggle">Calendar View</Label>
          <Switch
            id="view-toggle"
            checked={isCalendarView}
            onCheckedChange={setIsCalendarView}
          />
        </div>
      </div>
      {isCalendarView ? (
        <CalendarView scheduleEntriesData={scheduleEntriesData} />
      ) : (
        <ListView scheduleEntriesData={scheduleEntriesData} />
      )}
    </>
  )
}

function ListView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[]
}) {
  return (
    <Table>
      <TableCaption className="mb-5">End of List</TableCaption>
      <TableHeader>
        <TableRow className="flex w-full justify-between px-4">
          <TableCell className="w-[33%] text-left text-xl font-semibold">
            Day of Week
          </TableCell>
          <TableCell className="w-[33%] text-center text-xl font-semibold">
            Date
          </TableCell>
          <TableCell className="w-[33%] text-right text-xl font-semibold">
            Shift
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scheduleEntriesData.map((entry, index) => (
          <TableRow key={index} className="flex w-full justify-between">
            <TableCell className="text-md w-[33%] text-left font-bold">
              {entry.dayOfWeek}
            </TableCell>
            <TableCell className="text-md w-[33%] text-center font-bold">
              {entry.date}
            </TableCell>
            <TableCell className="text-md w-[33%] text-right font-bold">
              {entry.shift}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function CalendarView({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[]
}) {
  // Convert schedule entries to events for React Big Calendar
  const events = scheduleEntriesData.map(entry => {
    const date = new Date(entry.date);
    // Ensure the date is not adjusted for timezone
    date.setUTCHours(0, 0, 0, 0);
    return {
      title: entry.shift,
      start: date,
      end: date,
      allDay: true,
    };
  });

  return (
    <div style={{ height: '800px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month']}
        defaultView='month'
      />
    </div>
  )
}