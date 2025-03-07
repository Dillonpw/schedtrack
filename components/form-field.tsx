"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FormFieldProps = {
  label: string;
  id: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  tooltip?: string;
};

export function FormField({
  label,
  id,
  value,
  onChange,
  min,
  max,
  tooltip,
}: FormFieldProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex items-center gap-1">
          <Label htmlFor={id} className="text-sm font-medium">
            {label}
          </Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
      <div className="relative">
        <Input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value || ""}
          onChange={(e) => {
            const value = e.target.value
              ? Number.parseInt(e.target.value)
              : undefined;
            onChange(value);
          }}
          className="w-full dark:text-black"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
          days
        </div>
      </div>
    </div>
  );
}
