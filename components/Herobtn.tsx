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
        <Button variant="secondary" className="border-2 border-red-600" asChild>
          <Link href="https://buy.stripe.com/7sIaFa7EQeJzbW8aEG">Donate</Link>
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
      <Button variant="secondary" asChild>
        <Link href="https://buy.stripe.com/7sIaFa7EQeJzbW8aEG">Donate</Link>
      </Button>
    </div>
  );
}
