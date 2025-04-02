"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { updateScheduleEntry } from "@/lib/actions/edit-schedule";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  shift: z.enum(["On", "Off"]),
  note: z.string().nullable(),
  description: z.string().nullable(),
  repeatEvents: z
    .object({
      days: z.array(z.string()),
      startDate: z.string(),
      endDate: z.string(),
    })
    .nullable(),
});

interface EditScheduleEntryDialogProps {
  scheduleId: number;
  entry: {
    id: number;
    shift: "On" | "Off";
    note: string | null;
    description: string | null;
    repeatEvents?: {
      days: string[];
      startDate: string;
      endDate: string;
    } | null;
  };
}

export function EditScheduleEntryDialog({
  scheduleId,
  entry,
}: EditScheduleEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shift: entry.shift,
      note: entry.note || "",
      description: entry.description || "",
      repeatEvents: entry.repeatEvents || null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    try {
      console.log("Calling updateScheduleEntry with:", {
        scheduleId,
        entryId: entry.id,
        values,
      });
      const result = await updateScheduleEntry(scheduleId, entry.id, {
        id: entry.id,
        shift: values.shift,
        note: values.note || null,
        description: values.description || null,
        repeatEvents: values.repeatEvents,
      });

      console.log("Update result:", result);
      if (result.success) {
        toast.success("Schedule entry updated successfully");
        setOpen(false);
        router.refresh();
      } else {
        console.error("Update failed:", result.error);
        toast.error(result.error || "Failed to update schedule entry");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("An error occurred while updating the schedule entry");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-accent h-6 w-6 p-0"
        >
          <Pencil className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Schedule Entry</DialogTitle>
          <DialogDescription>
            Make changes to your schedule entry here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="shift"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shift</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shift" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="On">On</SelectItem>
                      <SelectItem value="Off">Off</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add a note"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a description"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {entry.repeatEvents && (
              <div className="text-muted-foreground text-sm">
                This is a recurring event. Changes will apply to all instances
                of this event.
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
