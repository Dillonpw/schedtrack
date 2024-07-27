import { db } from "@/db/index";
import Header from "@/components/Header";
import { scheduleEntries } from "@/db/schema";
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

  const scheduleEntriesData: ScheduleEntry[] = await db
    .select()
    .from(scheduleEntries)
    .where(eq(scheduleEntries.userId, session.user.id));

  if (!scheduleEntriesData || scheduleEntriesData.length === 0) {
    return (
      <main>
        <Header />
        <h1 className="pb-5 text-center text-3xl font-bold">
          Generated Schedule
        </h1>
        <div className="mt-4">
          <p className="text-center text-lg">No schedule available</p>
        </div>
      </main>
    );
  }

  const renderTableView = (schedule: ScheduleEntry[]): JSX.Element => (
    <Table>
      <TableCaption className="mb-5">End of List</TableCaption>
      <TableHeader>
        <TableRow className="flex w-full justify-between">
          <TableHeader className="text-left text-xl font-semibold">
            Day of Week
          </TableHeader>
          <TableHeader className="text-center text-xl font-semibold">
            Date
          </TableHeader>
          <TableHeader className="text-right text-xl font-semibold">
            Shift
          </TableHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedule.map((entry, index) => (
          <TableRow key={index} className="flex w-full justify-between">
            <TableCell className="text-left">{entry.dayOfWeek}</TableCell>
            <TableCell className="text-center">{entry.date}</TableCell>
            <TableCell className="text-right">{entry.shift}</TableCell>
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
        {scheduleEntriesData.length > 0 ? (
          renderTableView(scheduleEntriesData)
        ) : (
          <p className="text-center text-lg">No schedule available</p>
        )}
      </div>
    </main>
  );
}
