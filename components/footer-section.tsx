import Link from "next/link";
import ThemeToggle from "./toggle-theme";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="just flex max-h-18 w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-10 sm:flex-row md:px-6">
      <p className="text-xs">&copy; {year} Sched Track. All rights reserved.</p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link
          href="/privacy"
          className="text-xs underline-offset-4 hover:underline"
          prefetch={false}
        >
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
