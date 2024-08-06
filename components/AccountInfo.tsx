import { auth } from "@/auth";
import React from "react";
import Link from "next/link";
import { SignOut } from "./Sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const LoggedIn = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex items-center justify-between gap-2 bg-none px-4 py-2">
      <Button asChild variant="link">
        <Link href="/schedule" className="text-sm md:text-lg">
          Schedule
        </Link>
      </Button>
      <div className="flex items-center gap-2">
        {session.user.image && (
          <Avatar>
            <AvatarImage src={session.user.image as string} />
            <AvatarFallback>
              <Skeleton className="h-12 w-12 rounded-full" />
            </AvatarFallback>
          </Avatar>
        )}
        {session.user.email && (
          <p className="select-none text-sm font-semibold md:text-lg">
            {session.user.email}
          </p>
        )}
        <SignOut />
      </div>
    </div>
  );
};

export default LoggedIn;
