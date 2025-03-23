"use server";

import { auth } from "@/auth";
import Link from "next/link";
import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { NotebookPen, CalendarDays } from "lucide-react";

const AccountInfo = async () => {
  const session = await auth();
  const email: string | null | undefined = session?.user?.email;
  const username = email?.split("@")[0];

  return (
    <div className="bg-background border-border w-full border-b-2">
      <div className="flex items-center justify-between gap-4 px-4 pb-2 md:px-6 lg:container lg:mx-auto">
        <div className="flex">
          <Button
            asChild
            variant="ghost"
            className="hover:bg-transparent focus:bg-transparent"
          >
            <Link
              href="/schedule"
              className="flex items-center no-underline hover:text-blue-800 focus:text-blue-500"
            >
              <CalendarDays className="block h-8 w-8 hover:text-blue-800 focus:text-blue-500 sm:hidden" />
              <span className="hidden sm:block">Schedule</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="hover:bg-transparent focus:bg-transparent"
          >
            <Link
              href="/generate"
              className="flex items-center no-underline hover:text-blue-800 focus:text-blue-500"
            >
              <NotebookPen className="block h-8 w-8 hover:text-blue-800 focus:text-blue-500 sm:hidden" />
              <span className="hidden sm:block">Generate</span>
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              {username && (
                <p className="text-xs font-medium select-none md:text-lg">
                  {username}
                </p>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    Sign Out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to sign out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will need to sign back in to see your schedule.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex flex-row items-center justify-end gap-2">
                    <AlertDialogCancel asChild>
                      <Button
                        variant="ghost"
                        className="dark:border-none dark:text-gray-100"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </AlertDialogCancel>
                    <SignOut size="sm" className="mt-2 w-[80px] sm:mt-0" />
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
