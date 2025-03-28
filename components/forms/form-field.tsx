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
                  <HelpCircle className="text-muted-foreground h-3.5 w-3.5" />
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
        <div className="text-muted-foreground absolute inset-y-0 left-0 flex items-center pl-3 text-sm">
          days
        </div>
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
          className="w-full pl-12 dark:text-black"
        />
      </div>
    </div>
  );
}
