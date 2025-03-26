import { db } from "@/db";
import { users, schedules, feedbacks } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
    .limit(5);

  return {
    totalUsers: totalUsers[0].count,
    totalSchedules: totalSchedules[0].count,
    totalFeedbacks: totalFeedbacks[0].count,
    activeUsers: activeUsers[0].count,
    avgSchedulesPerUser: avgSchedulesPerUser[0].avg || 0,
    recentUsers,
    recentFeedbacks,
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
                    <p className="text-sm text-gray-500">
                      Last update:{" "}
                      {user.lastScheduleUpdate?.toLocaleDateString() || "Never"}
                    </p>
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
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="rounded-lg border p-4">
                    <p className="mb-2 text-sm text-gray-500">
                      {feedback.date.toLocaleDateString()}
                    </p>
                    <p>{feedback.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
