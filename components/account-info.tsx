import { auth } from "@/auth";
import Link from "next/link";
import { SignOut } from "./sign-out";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
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

  if (!session?.user)
    return (
      <div className="flex justify-end bg-muted px-2 xl:px-40">
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
        {session.user.email && (
          <p className="select-none text-xs font-medium md:text-lg">
            {username}
          </p>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost">Sign Out</Button>
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
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <SignOut />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LoggedIn;
