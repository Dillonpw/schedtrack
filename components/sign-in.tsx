"use client";

import { signInAction } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";

export function SignIn() {
  return (
    <form action={signInAction}>
      <Button
        type="submit"
        className="from-primary to-secondary text-primary-foreground group w-full bg-gradient-to-r hover:scale-103 min-[400px]:w-auto"
      >
        Sign in
      </Button>
    </form>
  );
}
