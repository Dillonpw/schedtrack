import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { redirect } from "next/dist/server/api-utils";

export default function SignIn() {
  return (
    <div className="mt-[-10rem] flex flex-col items-center gap-2 rounded-xl border-2 bg-muted p-10">
      <h1 className="pb-5 text-3xl font-bold">Sign in</h1>
      <form
        className="flex flex-col items-center gap-2"
        action={async (formData) => {
          "use server";
          await signIn("resend", formData, { redirectTo: "/dashboard" });
        }}
      >
        <Input type="text" name="email" placeholder="Email" />
        <Button size="signin" type="submit">
          Signin with Email
        </Button>
      </form>
      <p className="text-center font-semibold">or</p>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <Button size="signin" type="submit">
          Signin with Google
        </Button>
      </form>
    </div>
  );
}
