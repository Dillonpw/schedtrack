"use client";

import { signOutAction } from "@/lib/actions/auth-actions";
import { Button } from "./ui/button";

export function SignOut() {
  return (
    <form action={signOutAction}>
      <Button
        variant="destructive"
        size="sm"
        type="submit"
        data-testid="sign-out"
      >
        Sign Out
      </Button>
    </form>
  );
}
