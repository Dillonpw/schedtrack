import { auth } from "@/auth";
import React from "react";
import { SignOut } from "./Sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

const LoggedIn = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex w-full items-center justify-end gap-2 bg-none px-6 py-2 duration-300">
      <div className="flex items-center gap-2">
        {session.user.image && (
          <Avatar>
            <AvatarImage src={session.user.image as string} />
            <AvatarFallback>
              <Skeleton className="h-12 w-12 rounded-full" />
            </AvatarFallback>
          </Avatar>
        )}
        <p className="text-sm font-semibold md:text-lg select-none">{session.user.email}</p>
      </div>
      <SignOut />
    </div>
  );
};

export default LoggedIn;
