"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { submitFeedback } from "@/lib/actions/feedback";

export function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [type, setType] = useState("feedback");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitFeedback(feedback, type);
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });
      setFeedback("");
      setType("feedback");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-primary/20 relative border shadow-lg">
      <div className="from-primary/50 to-secondary/50 absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-20 blur"></div>
      <div className="relative">
        <CardHeader>
          <CardTitle>Leave Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <RadioGroup
                value={type}
                onValueChange={setType}
                className="flex gap-4"
              >
                {[
                  { value: "feedback", label: "General Feedback" },
                  { value: "bug", label: "Bug Report" },
                  { value: "feature", label: "Feature Request" },
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={value}
                      id={value}
                      className="cursor-pointer"
                    />
                    <Label htmlFor={value} className="cursor-pointer">
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-text">Your Message</Label>
              <Textarea
                id="feedback-text"
                placeholder={
                  type === "bug"
                    ? "Please describe the bug and steps to reproduce it..."
                    : type === "feature"
                      ? "Please describe the feature you'd like to see..."
                      : "Share your thoughts about the application..."
                }
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[200px]"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="from-primary to-secondary text-primary-foreground bg-gradient-to-r"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
