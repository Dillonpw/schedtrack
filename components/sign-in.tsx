import { signIn } from "@/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInBtn() {
  return (
    <div className="w-full max-w-sm rounded-lg border-2 bg-background p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Sign in</h2>
      <div className="space-y-4">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <Button
            className="flex w-full items-center justify-center"
            size="signin"
            type="submit">
            Sign in with Google
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
        >
          <Button
            className="flex w-full items-center justify-center"
            size="signin"
            type="submit"
          >
            Sign in with Github
          </Button>
        </form>
      </div>
      <div className="my-4 flex items-center justify-center">
        <span className="text-sm">or continue with</span>
      </div>
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";
          await signIn("resend", formData, { redirectTo: "/dashboard" });
        }}
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-white text-black"
            required
          />
        </div>
        <Button className="w-full" size="signin" type="submit">
          Sign in with Email
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Button asChild variant="link">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
