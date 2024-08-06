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

export default async function ScheduleData() {
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
        <TableRow className="flex w-full justify-between px-4">
          <TableHeader className="w-[33%] text-left text-xl font-semibold">
            Day of Week
          </TableHeader>
          <TableHeader className="w-[33%] text-center text-xl font-semibold">
            Date
          </TableHeader>
          <TableHeader className="w-[33%] text-right text-xl font-semibold">
            Shift
          </TableHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedule.map((entry, index) => (
          <TableRow key={index} className="flex w-full justify-between">
            <TableCell className="w-[33%] text-left text-md font-bold">
              {entry.dayOfWeek}
            </TableCell>
            <TableCell className="w-[33%] text-center text-md font-bold">{entry.date}</TableCell>
            <TableCell className="w-[33%] text-right text-md font-bold">{entry.shift}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <section className="mx-10">
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
    </section>
  );
}
