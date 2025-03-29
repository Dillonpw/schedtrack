import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button
        type="submit"
        className="from-primary to-secondary text-primary-foreground group w-full bg-gradient-to-r hover:scale-103 min-[400px]:w-auto"
      >
        Sign in
      </Button>
    </form>
  );
}
