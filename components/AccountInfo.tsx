import { auth } from "@/auth";
import React from "react";
import Link from "next/link";
import { SignOut } from "./Sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

const LoggedIn = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="justify-evenly flex min-w-[100vw] items-center gap-2 bg-none px-4 py-2">
      <Link href="/schedule">Schedule</Link>
      <div className="flex items-center gap-2">
        {session.user.image && (
          <Avatar>
            <AvatarImage src={session.user.image as string} />
            <AvatarFallback>
              <Skeleton className="h-12 w-12 rounded-full" />
            </AvatarFallback>
          </Avatar>
        )}
        <p className="select-none text-sm font-semibold md:text-lg">
          {session.user.email}
        </p>
        <SignOut />
      </div>
    </div>
  );
};

export default LoggedIn;
