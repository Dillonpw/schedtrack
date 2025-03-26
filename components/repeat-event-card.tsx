"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Calendar } from "lucide-react";
import { RepeatEvent } from "@/types";
import { DaySelector } from "@/components/day-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type WeeklyScheduleCardProps = {
  event: RepeatEvent;
  onUpdate: (eventId: string, field: keyof RepeatEvent, value: any) => void;
  onRemove: (eventId: string) => void;
};

export function WeeklyScheduleCard({
  event,
  onUpdate,
  onRemove,
}: WeeklyScheduleCardProps) {
  return (
    <Card className="overflow-hidden border">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-4 w-4" />
              <span className="font-medium">Weekly Schedule</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(event.id)}
              className="text-muted-foreground hover:text-destructive h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove schedule</span>
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label className="text-muted-foreground text-sm font-medium">
                Repeat Every
              </Label>
            </div>
            <Select
              value={event.repeatInterval.toString()}
              onValueChange={(value) =>
                onUpdate(event.id, "repeatInterval", parseInt(value))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Every week</SelectItem>
                <SelectItem value="2">Every other week</SelectItem>
                <SelectItem value="3">Every third week</SelectItem>
                <SelectItem value="4">Every fourth week</SelectItem>
                <SelectItem value="5">Every fifth week</SelectItem>
                <SelectItem value="6">Every sixth week</SelectItem>
                <SelectItem value="7">Every seventh week</SelectItem>
                <SelectItem value="8">Every eighth week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label className="text-muted-foreground text-sm font-medium">
                Days of Week
              </Label>
            </div>
            <DaySelector
              selectedDays={event.daysOfWeek}
              onChange={(days: number[]) =>
                onUpdate(event.id, "daysOfWeek", days)
              }
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label className="text-muted-foreground text-sm font-medium">
                Description
              </Label>
            </div>
            <Textarea
              value={event.description || ""}
              onChange={(e) =>
                onUpdate(event.id, "description", e.target.value)
              }
              placeholder="Add a description for this schedule"
              className="w-full dark:text-black"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
