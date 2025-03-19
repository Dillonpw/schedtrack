import { signOut } from "@/auth";
import { Button } from "./ui/button";

interface SignOutProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function SignOut({ className, size = "default" }: SignOutProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        variant="destructive"
        size={size}
        type="submit"
        data-testid="sign-out"
        className={className}
      >
        Sign Out
      </Button>
    </form>
  );
}
