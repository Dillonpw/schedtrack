import Link from "next/link";
import { CalendarIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="flex h-14 items-center justify-between px-4 lg:px-6">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={true}
      >
        <CalendarIcon className="h-6 w-6 text-red-600" />
        <span className="sr-only">Rotating Schedule Builder</span>
        <p className="ml-2 hidden text-xl font-semibold md:inline">
          Sched Track
        </p>
      </Link>
      <div className="flex gap-2">
        {children}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
