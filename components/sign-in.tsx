import { signIn } from "@/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignIn() {
  return (
        <form
          action={async () => {
            "use server";
            await signIn( { redirectTo: "/dashboard" });
          }}
        >
          <Button
            size="signin"
            type="submit">
            Sign in
          </Button>
        </form>
  );
}
