import { auth } from "@/auth";
import Link from "next/link";
import { SignOut } from "./namingBug";
import { Button } from "./ui/button";

const LoggedIn = async () => {
  const session = await auth();

  if (!session?.user)
    return (
      <div className="flex justify-end bg-muted px-2">
        <Button asChild variant="link">
          <Link
            className="text-xl font-semibold"
            href="/signin"
            prefetch={false}
          >
            Sign In
          </Link>
        </Button>
      </div>
    );

  const email: any = session.user.email;
  const username = email.split("@")[0];

  return (
    <>
      <div className="flex items-center justify-between gap-2 border-b-2 bg-border px-2 pb-2 dark:bg-muted">
        <div>
          <Button asChild variant="link">
            <Link href="/schedule" className="text-xs md:text-lg">
              Schedule
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/generate" className="text-xs md:text-lg">
              Generate
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {session.user.email && (
            <p className="select-none text-xs font-semibold md:text-lg">
              {username}
            </p>
          )}
          <SignOut />
        </div>
      </div>
    </>
  );
};

export default LoggedIn;
