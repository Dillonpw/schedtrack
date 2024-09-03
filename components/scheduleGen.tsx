"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import { generateSchedule } from "@/lib/actions/generateSchedule"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { FormData } from "@/types"

const useScheduleForm = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData)
  const { workDays, offDays, totalDays, startDate } = formData

  const updateField = (
    field: keyof FormData,
    value: number | Date | undefined,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return { formData, updateField, workDays, offDays, totalDays, startDate }
}

const FormField = ({
  label,
  id,
  value,
  onChange,
  min,
  max,
  tooltip,
}: {
  label: string
  id: string
  value: number
  onChange: (value: number) => void
  min: number
  max?: number
  tooltip: string
}) => (
  <div className="w-full">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <label htmlFor={id} className="mb-2 block text-sm font-medium">
            {label}{" "}
            <span className="rounded-full border bg-muted px-1 text-xs">?</span>
          </label>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Input
      type="number"
      id={id}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      min={min}
      max={max}
      required
      className="w-full"
    />
  </div>
)

export default function GenerateSchedule() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const { formData, updateField, workDays, offDays, totalDays, startDate } =
    useScheduleForm({
      workDays: 4,
      offDays: 2,
      totalDays: 90,
      startDate: new Date(),
    })

  const handleGenerateSchedule = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !session) {
      toast({
        title: "Error",
        description: "Please select a start date and ensure you're logged in.",
        variant: "destructive",
      })
      return
    }

    try {
      await generateSchedule({
        workDays,
        offDays,
        totalDays,
        startDate,
      })
      router.push('/schedule')
    } catch (error) {
      console.error("Failed to generate schedule:", error)
      toast({
        title: "Error",
        description: "Failed to generate schedule. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        Please sign in to generate a schedule.
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Generate Schedule
        </h1>
        <form
          onSubmit={handleGenerateSchedule}
          className="space-y-6"
        >
          <FormField
            label="Work Days"
            id="workDays"
            value={workDays}
            onChange={(value) => updateField("workDays", value)}
            min={1}
            tooltip="Enter the number of consecutive work days in your rotation"
          />
          <FormField
            label="Off Days"
            id="offDays"
            value={offDays}
            onChange={(value) => updateField("offDays", value)}
            min={1}
            tooltip="Enter the number of consecutive days off in your rotation"
          />
          <FormField
            label="Total Days"
            id="totalDays"
            value={totalDays}
            onChange={(value) => updateField("totalDays", value)}
            min={1}
            max={183}
            tooltip="Enter the number of days ahead you would like to display"
          />
          <div className="w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label className="mb-2 block text-sm font-medium">
                    Start Date{" "}
                    <span className="rounded-full border bg-muted px-1 text-xs">
                      ?
                    </span>
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  Select the first day of your next or last rotation
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => updateField("startDate", date as Date)}
              className="rounded-md border"
            />
          </div>
          <Button type="submit" className="w-full">
            Generate Schedule
          </Button>
        </form>
      </div>
    </main>
  )
}