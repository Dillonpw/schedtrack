import { db } from "@/db";
import { users, schedules, feedbacks } from "@/db/schema";
import { desc, eq, sql, like } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
} from "@/components/ui/charts";
import { Badge } from "@/components/ui/badge";

async function getStats() {
  const totalUsers = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);
  const totalSchedules = await db
    .select({ count: sql<number>`count(*)` })
    .from(schedules);
  const totalFeedbacks = await db
    .select({ count: sql<number>`count(*)` })
    .from(feedbacks);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const activeUsers = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(sql`${users.lastScheduleUpdate} > ${thirtyDaysAgo}`);

  const avgSchedulesPerUser = await db
    .select({
      avg: sql<number>`ROUND(CAST(COUNT(*) AS numeric) / NULLIF((SELECT COUNT(*) FROM ${users}), 0), 2)`,
    })
    .from(schedules);

  const recentUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.lastScheduleUpdate))
    .limit(5);

  const recentFeedbacks = await db
    .select()
    .from(feedbacks)
    .orderBy(desc(feedbacks.date))
    .limit(10);

  const feedbackCounts = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(feedbacks)
      .where(like(feedbacks.text, "[FEEDBACK]%")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(feedbacks)
      .where(like(feedbacks.text, "[BUG]%")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(feedbacks)
      .where(like(feedbacks.text, "[FEATURE]%")),
  ]);

  const deviceUsage = await db
    .select({
      deviceType: users.deviceType,
      count: sql<number>`count(*)`,
    })
    .from(users)
    .groupBy(users.deviceType);

  const processedDeviceUsage = deviceUsage.map((d) => ({
    name: d.deviceType || "Unknown",
    value: Number(d.count),
  }));

  // Add check for empty data
  if (processedDeviceUsage.length === 0) {
    processedDeviceUsage.push({ name: "No Data", value: 1 });
  }

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

  const schedulesByDay = await Promise.all(
    last7Days.map(async (date) => {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(schedules)
        .where(
          sql`${schedules.createdAt} >= ${startOfDay} AND ${schedules.createdAt} <= ${endOfDay}`,
        );

      return {
        date: date.toLocaleDateString(),
        count: result[0].count,
      };
    }),
  );

  const feedbackByDay = await Promise.all(
    last7Days.map(async (date) => {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(feedbacks)
        .where(
          sql`${feedbacks.date} >= ${startOfDay} AND ${feedbacks.date} <= ${endOfDay}`,
        );

      return {
        date: date.toLocaleDateString(),
        count: result[0].count,
      };
    }),
  );

  return {
    totalUsers: totalUsers[0].count,
    totalSchedules: totalSchedules[0].count,
    totalFeedbacks: totalFeedbacks[0].count,
    activeUsers: activeUsers[0].count,
    avgSchedulesPerUser: avgSchedulesPerUser[0].avg || 0,
    recentUsers,
    recentFeedbacks,
    schedulesByDay,
    feedbackByDay,
    deviceUsage: processedDeviceUsage,
    feedbackCounts: {
      general: feedbackCounts[0][0].count,
      bugs: feedbackCounts[1][0].count,
      features: feedbackCounts[2][0].count,
    },
  };
}

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }
  const stats = await getStats();

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeUsers}</p>
            <p className="text-sm text-gray-500">
              {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of
              total users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg Schedules/User</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.avgSchedulesPerUser}</p>
            <p className="text-sm text-gray-500">
              Across {stats.totalSchedules} total schedules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalFeedbacks}</p>
            <p className="text-sm text-gray-500">
              {((stats.totalFeedbacks / stats.totalUsers) * 100).toFixed(1)}%
              feedback rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Schedules Created (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={stats.schedulesByDay}
              xKey="date"
              yKey="count"
              title=""
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Received (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent
              data={stats.feedbackByDay}
              xKey="date"
              yKey="count"
              title=""
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent data={stats.deviceUsage} title="" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Recent Users</TabsTrigger>
          <TabsTrigger value="feedback">Recent Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Last update:{" "}
                        {user.lastScheduleUpdate?.toLocaleDateString() ||
                          "Never"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Device: {user.deviceType || "Unknown"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  General: {stats.feedbackCounts.general}
                </Badge>
                <Badge variant="destructive">
                  Bugs: {stats.feedbackCounts.bugs}
                </Badge>
                <Badge variant="default">
                  Features: {stats.feedbackCounts.features}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentFeedbacks.map((feedback) => {
                  const type =
                    feedback.text.match(/\[(.*?)\]/)?.[1] || "FEEDBACK";
                  const text = feedback.text.replace(/\[(.*?)\]/, "").trim();
                  return (
                    <div key={feedback.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge
                          variant={
                            type === "BUG"
                              ? "destructive"
                              : type === "FEATURE"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {type}
                        </Badge>
                        <p className="text-sm text-gray-500">
                          {feedback.date.toLocaleDateString()}
                        </p>
                      </div>
                      <p>{text}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
