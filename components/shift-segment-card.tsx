"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2, HelpCircle, Briefcase, Coffee, Clock } from "lucide-react";
import { ShiftSegment } from "@/types";

type SegmentCardProps = {
  segment: ShiftSegment;
  index: number;
  segments: ShiftSegment[];
  updateSegment: (index: number, field: keyof ShiftSegment, value: any) => void;
  removeSegment: (index: number) => void;
};

export function SegmentCard({
  segment,
  index,
  segments,
  updateSegment,
  removeSegment,
}: SegmentCardProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Card
      className={`overflow-hidden border transition-all duration-200 ${focused ? "ring-primary/20 ring-2" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {segment.shiftType === "On" ? (
                <Briefcase className="text-primary h-4 w-4" />
              ) : (
                <Coffee className="text-muted-foreground h-4 w-4" />
              )}
              <span className="font-medium">
                {segment.shiftType === "On"
                  ? "On-Duty Period"
                  : "Off-Duty Period"}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeSegment(index)}
              className="text-muted-foreground hover:text-destructive h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove segment</span>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor={`segment-type-${index}`} className="text-sm">
                  Segment Type
                </Label>
              </div>
              <Select
                value={segment.shiftType}
                onValueChange={(value) =>
                  updateSegment(index, "shiftType", value)
                }
              >
                <SelectTrigger
                  id={`segment-type-${index}`}
                  className="w-full"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="On">On</SelectItem>
                  <SelectItem value="Off">Off</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor={`segment-days-${index}`} className="text-sm">
                  Number of Days
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="text-muted-foreground h-3 w-3" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>Enter how many consecutive days for this segment</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id={`segment-days-${index}`}
                type="number"
                min={1}
                max={30}
                value={segment.days || ""}
                placeholder="0"
                onChange={(e) => {
                  const value = e.target.value
                    ? Number.parseInt(e.target.value)
                    : undefined;
                  updateSegment(index, "days", value);
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full dark:text-black"
              />
            </div>
          </div>

          {segment.shiftType === "On" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor={`segment-title-${index}`} className="text-sm">
                    Shift Note
                  </Label>
                </div>
                <Input
                  id={`segment-note-${index}`}
                  type="text"
                  value={segment.note || ""}
                  onChange={(e) => updateSegment(index, "note", e.target.value)}
                  placeholder="Day Shift, Night Shift, etc."
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="w-full dark:text-black"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label
                htmlFor={`segment-description-${index}`}
                className="text-sm"
              >
                Description
              </Label>
            </div>
            <Input
              id={`segment-description-${index}`}
              type="text"
              value={segment.description || ""}
              onChange={(e) =>
                updateSegment(index, "description", e.target.value)
              }
              placeholder="Add a description for this segment"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full dark:text-black"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
