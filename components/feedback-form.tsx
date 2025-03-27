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
    <Card>
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Type</Label>
            <RadioGroup
              value={type}
              onValueChange={setType}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="feedback"
                  id="feedback"
                  className="cursor-pointer"
                />
                <Label htmlFor="feedback" className="cursor-pointer">
                  General Feedback
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="bug"
                  id="bug"
                  className="cursor-pointer"
                />
                <Label htmlFor="bug" className="cursor-pointer">
                  Bug Report
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="feature"
                  id="feature"
                  className="cursor-pointer"
                />
                <Label htmlFor="feature" className="cursor-pointer">
                  Feature Request
                </Label>
              </div>
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
