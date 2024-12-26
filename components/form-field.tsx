import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  id: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  min: number;
  max?: number;
  tooltip: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  value,
  onChange,
  min,
  max,
  tooltip,
}) => (
  <div className="space-y-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label htmlFor={id} className="flex items-center gap-1">
            {label} <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </Label>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Input
      type="number"
      id={id}
      value={value !== undefined && value !== 0 ? value : ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange(val ? parseInt(val, 10) : undefined);
      }}
      min={min}
      max={max}
      placeholder="Enter days"
      className="bg-gray-200 text-black"
      required
    />
  </div>
);

