import Link from "next/link";
import { CalendarIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <CalendarIcon className="h-6 w-6" />
        <span className="sr-only">Rotating Schedule Builder</span>
        <p className="ml-2 text-xl font-semibold hidden md:inline">Rotating Schedule Builder</p>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-lg font-medium underline-offset-4 hover:underline"
          prefetch={false}
        >
          Features
        </Link>
        <Link
          href="#"
          className="text-lg font-medium underline-offset-4 hover:underline"
          prefetch={false}
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-lg font-medium underline-offset-4 hover:underline"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="#"
          className="text-lg font-medium underline-offset-4 hover:underline"
          prefetch={false}
        >
          Contact
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
