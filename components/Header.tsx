import Link from "next/link";
import { CalendarIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="flex h-14 items-center justify-between px-4 lg:px-6">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <CalendarIcon className="h-6 w-6" />
        <span className="sr-only">Rotating Schedule Builder</span>
        <p className="ml-2 hidden text-xl font-semibold md:inline">
          Rotating Schedule Builder
        </p>
      </Link>
      <Nav />
      <ThemeToggle />
    </header>
  );
};

export default Header;
