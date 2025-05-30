import { auth } from "@/auth";
import { db } from "@/db/index";
import { schedules, users } from "@/db/schema";
import { eq, asc, count } from "drizzle-orm";
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

  const scheduleCountResult = await db
    .select({ value: count() })
    .from(schedules)
    .where(eq(schedules.userId, userId));

  const totalSchedules = scheduleCountResult[0]?.value || 0;

  const userSchedulesForStats = await db
    .select({ schedule: schedules.schedule, createdAt: schedules.createdAt })
    .from(schedules)
    .where(eq(schedules.userId, userId))
    .orderBy(asc(schedules.createdAt))
    .limit(totalSchedules > 0 ? 1 : 0);

  const totalEntries = userSchedulesForStats.reduce((total, schedule) => {
    const entries =
      typeof schedule.schedule === "string"
        ? JSON.parse(schedule.schedule)
        : schedule.schedule;
    return total + (Array.isArray(entries) ? entries.length : 0);
  }, 0);

  const earliestScheduleDate = userSchedulesForStats[0]?.createdAt;

  const accountCreatedDate = new Date(
    Math.min(
      user?.emailVerified?.getTime() || Infinity,
      earliestScheduleDate?.getTime() || Infinity,
      user?.lastScheduleUpdate?.getTime() || Infinity,
      Date.now(),
    ),
  );

  const lastScheduleUpdate = user?.lastScheduleUpdate || null;
  const email = session.user.email;
  const username = email?.split("@")[0];

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-primary/20 relative border shadow-lg md:col-span-2 lg:col-span-4">
        <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
        <div className="relative">
          <CardHeader className="flex flex-row items-center justify-center">
            <CardTitle className="text-xl font-medium">{username}</CardTitle>
          </CardHeader>
        </div>
      </Card>

      <Card className="border-primary/20 relative border shadow-lg">
        <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
        <div className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Created
            </CardTitle>
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
        </div>
      </Card>

      <Card className="border-primary/20 relative border shadow-lg">
        <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
        <div className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Schedules
            </CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSchedules}</div>
            <p className="text-muted-foreground text-xs">
              {totalSchedules === 1 ? "schedule" : "schedules"} created
            </p>
          </CardContent>
        </div>
      </Card>

      <Card className="border-primary/20 relative border shadow-lg">
        <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
        <div className="relative">
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
        </div>
      </Card>

      <Card className="border-primary/20 relative border shadow-lg">
        <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
        <div className="relative">
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
        </div>
      </Card>
    </div>
  );
}
