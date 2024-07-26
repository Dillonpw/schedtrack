import { db } from "@/db/index";
import { scheduleEntries } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface ScheduleEntry {
  date: string;
  dayOfWeek: string;
  shift: string;
}

export default async function SchedulePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session || !session.user?.id) {
    notFound();
  }

  const scheduleData = await db
    .select()
    .from(scheduleEntries)
    .where(
      and(
        eq(scheduleEntries.id, parseInt(params.id)),
        eq(scheduleEntries.userId, session.user.id),
      ),
    );

  if (!scheduleData.length) {
    notFound();
  }

  return (
    <main>
      <h1 className="pb-5 text-center text-3xl font-bold">
        Generated Schedule
      </h1>
      <div className="mt-4">{renderTableView(scheduleData)}</div>
    </main>
  );
}

const renderTableView = (schedule: ScheduleEntry[]): JSX.Element => (
  <Table className="text-lg">
    <TableCaption className="mb-5">End of List</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHeader className="w-[300px] text-left text-xl font-semibold">
          Day of Week
        </TableHeader>
        <TableHeader className="w-[300px] text-center text-xl font-semibold">
          Date
        </TableHeader>
        <TableHeader className="w-[300px] text-right text-xl font-semibold">
          Shift
        </TableHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      {schedule.map((entry, index) => (
        <TableRow key={index}>
          <TableCell className="w-[300px] text-left">
            {entry.dayOfWeek}
          </TableCell>
          <TableCell className="w-[300px] text-center">{entry.date}</TableCell>
          <TableCell className="w-[300px] text-right">{entry.shift}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
