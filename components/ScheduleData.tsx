import React from "react";
import { db } from "@/db/index";
import { scheduleEntries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { ScheduleEntry } from "@/types";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import DownloadButton from "@/components/DownloadBtn";

export default async function ScheduleData() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return null;
  }

  const scheduleEntriesData: ScheduleEntry[] = await db
    .select()
    .from(scheduleEntries)
    .where(eq(scheduleEntries.userId, session.user.id));

  return (
    <section className="m-10">
      <h1 className="text-center text-3xl font-bold">Schedule</h1>
      <div className="mt-4">
        <ScheduleTable scheduleEntriesData={scheduleEntriesData} />
      </div>
    </section>
  );
}

function ScheduleTable({
  scheduleEntriesData,
}: {
  scheduleEntriesData: ScheduleEntry[];
}) {
  if (scheduleEntriesData.length === 0) {
    return <p className="text-center text-lg">No schedule available</p>;
  }

  return (
    <>
      <div className="text-center">
        <DownloadButton scheduleEntriesData={scheduleEntriesData} />
      </div>
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
    </>
  );
}
