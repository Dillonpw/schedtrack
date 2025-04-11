import { auth } from "@/auth";
import { db } from "@/db/index";
import { schedules, users } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, User } from "lucide-react";

export default async function AccountStatistics() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  const userData = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const user = userData[0];

  const userSchedules = await db
    .select()
    .from(schedules)
    .where(eq(schedules.userId, userId))
    .orderBy(asc(schedules.createdAt));

  const totalSchedules = userSchedules.length;
  const totalEntries = userSchedules.reduce((total, schedule) => {
    const entries =
      typeof schedule.schedule === "string"
        ? JSON.parse(schedule.schedule)
        : schedule.schedule;
    return total + (Array.isArray(entries) ? entries.length : 0);
  }, 0);

  const accountCreatedDate = new Date(
    Math.min(
      user?.emailVerified?.getTime() || Infinity,
      userSchedules[0]?.createdAt?.getTime() || Infinity,
      user?.lastScheduleUpdate?.getTime() || Infinity,
      Date.now(),
    ),
  );

  const lastScheduleUpdate = user?.lastScheduleUpdate || null;
  const email = session.user.email;
  const username = email?.split("@")[0];

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-center">
          <CardTitle className="text-xl font-medium">{username}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Created</CardTitle>
          <User className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {format(accountCreatedDate, "MMM d, yyyy")}
          </div>
          <p className="text-muted-foreground text-xs">
            {format(accountCreatedDate, "h:mm a")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Schedules</CardTitle>
          <Calendar className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSchedules}</div>
          <p className="text-muted-foreground text-xs">
            {totalSchedules === 1 ? "schedule" : "schedules"} created
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
          <FileText className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEntries}</div>
          <p className="text-muted-foreground text-xs">
            {totalEntries === 1 ? "entry" : "entries"} across all schedules
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Update</CardTitle>
          <Clock className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {lastScheduleUpdate
              ? format(lastScheduleUpdate, "MMM d, yyyy")
              : "Never"}
          </div>
          <p className="text-muted-foreground text-xs">
            {lastScheduleUpdate
              ? format(lastScheduleUpdate, "h:mm a")
              : "No schedules updated yet"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
