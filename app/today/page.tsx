"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  scheduleName: string;
}

export default function TodayPage() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin");
    }

    if (status === "authenticated") {
      // TODO: Fetch today's events from the API
      // This is a placeholder for now
      setEvents([
        {
          id: "1",
          title: "Morning Shift",
          startTime: "09:00",
          endTime: "17:00",
          scheduleName: "Work Schedule",
        },
        {
          id: "2",
          title: "Team Meeting",
          startTime: "14:00",
          endTime: "15:00",
          scheduleName: "Meetings",
        },
      ]);
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground mb-4">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </div>
          {events.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              No events scheduled for today
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {event.scheduleName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
