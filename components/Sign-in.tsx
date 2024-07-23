import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SignIn() {
  return (
    <div className="flex flex-col gap-2 items-center border-2 p-10 rounded-xl bg-muted">
      <h1 className="text-3xl font-bold pb-5">Sign in</h1>
      <form className="flex flex-col gap-2 items-center"
        action={async (formData) => {
          "use server";
          await signIn("resend", formData);
        }}
      >
        <Input type="text" name="email" placeholder="Email" />
        <Button size="signin" type="submit">Signin with Email</Button>
      </form>
      <p className="text-center font-semibold">or</p>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button size="signin" type="submit">Signin with Google</Button>
      </form>
    </div>
  );
}
