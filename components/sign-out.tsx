import { signOut } from "@/auth";
import { Button } from "./ui/button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        className="text-black dark:text-gray-100"
        variant="ghost"
        type="submit"
        size="sm"
        data-testid="sign-out"
      >
        Sign Out
      </Button>
    </form>
  );
}
