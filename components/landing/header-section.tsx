"use client";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./toggle-theme";
import { HeaderProps } from "@/types";

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="flex h-14 items-center justify-between p-2 xl:px-40">
      <Link
        href="/?landing=true"
        className="flex items-center justify-center"
        prefetch={true}
      >
        <Image src="/favicon.png" alt="Icon" width={32} height={32} />
        <p className="ml-2 hidden text-xl font-semibold md:inline">
          Sched Track
        </p>
      </Link>
      <div className="flex items-center gap-2">
        {children}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
