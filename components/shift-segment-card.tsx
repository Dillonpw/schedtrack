import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MinusCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./form-field";
import { ShiftSegment } from "@/types";

interface SegmentCardProps {
  segment: ShiftSegment;
  index: number;
  updateSegment: (index: number, field: keyof ShiftSegment, value: any) => void;
  removeSegment: (index: number) => void;
}

export const SegmentCard: React.FC<SegmentCardProps> = ({
  segment,
  index,
  updateSegment,
  removeSegment,
}) => (
  <Card>
    <CardContent className="rounded-lg pt-6 dark:bg-background">
      <div className="flex flex-col items-center gap-2">
        <div className="space-y-2">
          <Label htmlFor={`segment-type-${index}`}>Shift Type</Label>
          <Select
            value={segment.shiftType}
            onValueChange={(value) =>
              updateSegment(index, "shiftType", value as "Work" | "Off")
            }
          >
            <SelectTrigger id={`segment-type-${index}`}>
              <SelectValue placeholder="Select shift type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Off">Off</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <FormField
          label="Days"
          id={`segment-days-${index}`}
          value={segment.days}
          onChange={(value) => updateSegment(index, "days", value)}
          min={1}
          tooltip="Enter the number of days for this segment"
        />
        {segment.shiftType === "Work" && (
          <div className="space-y-2">
            <Label htmlFor={`segment-title-${index}`}>Time</Label>
            <Input
              type="text"
              id={`segment-title-${index}`}
              value={segment.title || ""}
              onChange={(e) => updateSegment(index, "title", e.target.value)}
              placeholder="Enter work hours"
              className="bg-gray-200 text-black"
            />
          </div>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => removeSegment(index)}
          className="h-10 w-10 shrink-0 text-destructive dark:text-red-500"
        >
          <MinusCircle className="h-5 w-5" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

