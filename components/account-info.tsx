"use client";

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
import {
  NotebookPen,
  CalendarDays,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AccountInfo = () => {
  const { data: session } = useSession();
  const email: string | null | undefined = session?.user?.email;
  const username = email?.split("@")[0];
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin on client side
    // This is a simplification - in production, use a more secure approach
    const adminCheck = async () => {
      if (email) {
        // You might want to add a server action to check this securely
        setIsAdmin(process.env.NEXT_PUBLIC_ADMIN_EMAIL === email);
      } else {
        setIsAdmin(false);
      }
    };

    adminCheck();
  }, [email]);

  return (
    <div className="border-border w-full border-b-2">
      <div className="mx-auto flex items-center justify-between px-2 pb-2 md:px-6 lg:container lg:mx-auto">
        <div className="flex gap-1 md:gap-2">
          <Button
            asChild
            variant="ghost"
            className="hover:bg-transparent focus:bg-transparent"
          >
            <Link
              href="/schedule"
              className="hover:text-primary flex items-center no-underline"
            >
              <CalendarDays className="hover:stroke-primary block h-8 w-8 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-6 sm:hidden" />
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
              className="hover:text-primary flex items-center no-underline"
            >
              <NotebookPen className="hover:stroke-primary block h-8 w-8 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-6 sm:hidden" />
              <span className="hidden sm:block">Generate</span>
            </Link>
          </Button>
          {session?.user && (
            <>
              <Button
                asChild
                variant="ghost"
                className="hover:bg-transparent focus:bg-transparent"
              >
                <Link
                  href="/feedback"
                  className="hover:text-primary flex items-center no-underline"
                >
                  <MessageSquare className="hover:stroke-primary block h-8 w-8 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-6 sm:hidden" />
                  <span className="hidden sm:block">Feedback</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="hover:bg-transparent focus:bg-transparent"
              >
                <Link
                  href="/account"
                  className="hover:text-primary flex items-center no-underline"
                >
                  <User className="hover:stroke-primary block h-8 w-8 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-6 sm:hidden" />
                  <span className="hidden sm:block">Account</span>
                </Link>
              </Button>
            </>
          )}
          {isAdmin && (
            <Button
              asChild
              variant="ghost"
              className="hover:bg-transparent focus:bg-transparent"
            >
              <Link
                href="/admin"
                className="hover:text-primary flex items-center no-underline"
              >
                <Settings className="hover:stroke-primary block h-8 w-8 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-6 sm:hidden" />
                <span className="hidden sm:block">Admin</span>
              </Link>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sign Out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to sign out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You are currently signed in as{" "}
                      <span className="font-medium">{username}</span>. You will
                      need to sign back in to see your schedule.
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
                    <SignOut />
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
