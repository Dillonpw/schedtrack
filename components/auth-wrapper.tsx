"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { SignIn } from "@/components/sign-in";

type AuthWrapperProps = {
  children: ReactNode;
  noAuthChildren?: ReactNode;
  allowActions?: boolean;
};

export default function AuthWrapper({
  children,
  noAuthChildren,
  allowActions = false,
}: AuthWrapperProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (!session) {
    if (noAuthChildren) {
      return <>{noAuthChildren}</>;
    }

    if (allowActions) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <p className="mb-4 text-center">
              Please login to use all features.
            </p>
            <SignIn />
          </div>
        </main>
      );
    }

    return (
      <>
        <div className="mb-4 w-full rounded bg-amber-500/20 p-2 text-center dark:bg-amber-600/20">
          <p className="text-sm font-medium">
            Preview mode: Sign in to save data and access all features
          </p>
        </div>
        {children}
      </>
    );
  }

  return <>{children}</>;
}
