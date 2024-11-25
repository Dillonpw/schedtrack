import { auth } from "@/auth";
//import React, { ReactNode } from "react";
import Link from "next/link";
import { SignOut } from "./Sign-out";
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
      <div className="flex items-center justify-between gap-2 border-b-2 bg-border bg-none px-2 pb-2">
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
      <svg
        viewBox="0 0 1440 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        className="bg-border"
      >
        <path
          transform="rotate(180) translate(-1440, -60)"
          d="M-100 58C-100 58 218.416 36.3297 693.5 36.3297C1168.58 36.3297 1487 58 1487 58V-3.8147e-06H-100V58Z"
          className="fill-muted"
        ></path>
      </svg>
    </>
  );
};

export default LoggedIn;
