import Link from "next/link";
import { auth } from "@/auth";

export default async function Nav() {
  const session = await auth();
  if (!session?.user) {
    return (
      <>
        <nav className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/#features"
            className="text-lg font-medium underline-offset-4 hover:underline"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-lg font-medium underline-offset-4 hover:underline"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            data-testid="contactLink"
            href="/contact"
            className="text-lg font-medium underline-offset-4 hover:underline"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </>
    );
  }
  return (
    <>
      <nav className="flex items-center gap-2 sm:gap-6">
        <Link
          href="/#features"
          className="text-lg font-medium underline-offset-4 hover:underline"
          prefetch={false}
        >
          Features
        </Link>
        <Link
          data-testid="contactLink"
          href="/contact"
          className="text-lg font-medium underline-offset-4 hover:underline"
          prefetch={false}
        >
          Contact
        </Link>
      </nav>
    </>
  );
}
