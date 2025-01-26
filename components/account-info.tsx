import { auth } from "@/auth";
import Link from "next/link";
import { SignInBtn } from "./sign-in"
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

const LoggedIn = async () => {
  const session = await auth();
  const email: string | null | undefined = session?.user?.email;
  const username = email?.split("@")[0];

  return (
    <div className="flex items-center justify-between gap-2 border-b-2 bg-border px-2 pb-2 dark:bg-muted xl:px-40">
      <div>
        <Button asChild variant="link">
          <Link href="/schedule" className="text-xs font-semibold md:text-lg">
            Schedule
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/generate" className="text-xs font-semibold md:text-lg">
            Generate
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {session?.user ? (
          <>
            {username && (
              <p className="select-none text-xs font-medium md:text-lg">
                {username}
              </p>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">Sign Out</Button>
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
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button
                      variant="ghost"
                      className="dark:border-none dark:text-gray-100"
                      size="lg"
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
            <SignInBtn />
        )}
      </div>
    </div>
  );
};

export default LoggedIn;
