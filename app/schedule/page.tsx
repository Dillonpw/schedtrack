import { db } from "@/db/index";
import { users, scheduleEntries } from "@/db/schema";
import { eq } from "drizzle-orm";
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

export default async function SchedulePage() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return null;
  }

  // Fetch the user's schedule entry
  const scheduleEntriesData = await db
    .select()
    .from(scheduleEntries)
    .where(eq(scheduleEntries.userId, session.user.id));

  const scheduleEntry = scheduleEntriesData.length > 0 ? scheduleEntriesData[0] : null;

  if (!scheduleEntry) {
    return (
      <main>
        <h1 className="pb-5 text-center text-3xl font-bold">
          Generated Schedule
        </h1>
        <div className="mt-4">
          <p className="text-center text-lg">No schedule available</p>
        </div>
      </main>
    );
  }

  const scheduleData: ScheduleEntry[] = [scheduleEntry];

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
            <TableCell className="w-[300px] text-center">
              {entry.date}
            </TableCell>
            <TableCell className="w-[300px] text-right">
              {entry.shift}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <main>
      <h1 className="pb-5 text-center text-3xl font-bold">
        Generated Schedule
      </h1>
      <div className="mt-4">
        {scheduleData.length > 0 ? (
          renderTableView(scheduleData)
        ) : (
          <p className="text-center text-lg">No schedule available</p>
        )}
      </div>
    </main>
  );
}
