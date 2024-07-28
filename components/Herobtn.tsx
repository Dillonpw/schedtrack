import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function HeroBtn() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return (
      <div className="flex flex-row items-center justify-center gap-2 md:justify-start">
        <Button variant="default" asChild>
          <Link href="/dashboard" prefetch={false}>
            Get Started
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/signin" prefetch={false}>
            Sign In
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-row items-center justify-center gap-2 md:justify-start">
      <Button variant="default" asChild>
        <Link href="/dashboard" prefetch={false}>
          Get Started
        </Link>
      </Button>
    </div>
  );
}
