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
        className="text-black"
        variant="destructive"
        type="submit"
        size="sm"
        data-testid="sign-out"
      >
        Sign Out
      </Button>
    </form>
  );
}
