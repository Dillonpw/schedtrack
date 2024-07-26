import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
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

interface User {
  id: string;
  schedule?: ScheduleEntry[];
}

export default async function SchedulePage() {
  // Authenticate the user
  const session = await auth();
  if (!session || !session.user?.id) {
    return notFound();
  }

  // Retrieve the user and their schedule from the database
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user || !user.schedule) {
    return notFound();
  }

  // Ensure the schedule data matches the expected type
  const scheduleData: ScheduleEntry[] = user.schedule as ScheduleEntry[];

  // Function to render the schedule table
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
