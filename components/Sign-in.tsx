import { signIn } from "@/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

export default function Component() {

  return (
    <div className="w-full max-w-sm rounded-lg bg-primary-foreground p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Sign in</h2>
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";
          await signIn("resend", formData);
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
            className="w-full"
          />
        </div>
        <Button className="w-full" size="signin" type="submit">
          Sign in with Email
        </Button>
      </form>
      <div className="my-4 flex items-center justify-center">
        <span className="text-sm text-gray-600">or</span>
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <Button
          className="flex w-full items-center justify-center"
          size="signin"
          type="submit"
        >
          <ChromeIcon className="mr-2 h-5 w-5" />
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
          <ChromeIcon className="mr-2 h-5 w-5" />
          Sign in with Github
        </Button>
      </form>
      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
