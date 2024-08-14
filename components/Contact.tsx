"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", `${process.env.WEB3_FORMS_KEY}`);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center">
      <h1 className="mb-10 text-3xl font-bold">Contact Us</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Label htmlFor="">Your Name:</Label>
        <Input type="text" name="name" required />
        <Label htmlFor="">Your Email:</Label>
        <Input type="email" name="email" required />
        <Label htmlFor="">Message:</Label>
        <Textarea name="message" required></Textarea>

        <Button type="submit">Submit Form</Button>
      </form>
      <span data-testid="result">{result}</span>
    </section>
  );
}
