import { auth } from "@/auth";
//import React, { ReactNode } from "react";
import Link from "next/link";
import { SignOut } from "./Sign-out";
import { Button } from "./ui/button";

//TODO
// add { children }: { children: ReactNode } and wrap pages inside
const LoggedIn = async () => {
  const session = await auth();

  if (!session?.user)
    return (
      <div className="m-2 flex justify-end">
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
    <div className="flex items-center justify-between gap-2 border-b-2 bg-none px-2 pb-2">
      <div>
        <Button asChild variant="link">
          <Link href="/schedule" className="text-xs md:text-lg">
            Schedule
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/dashboard" className="text-xs md:text-lg">
            Dashboard
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
  );
};

export default LoggedIn;
