"use client";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./toggle-theme";
import { HeaderProps } from "@/types";
import { motion } from "framer-motion";

const Header = ({ children }: HeaderProps) => {
  return (
    <motion.header 
    initial={{ opacity: 0, x: -200 }}
    animate={{ opacity: 1, x:0 }}
    className="flex h-14 items-center justify-between bg-border p-2 dark:bg-muted lg:px-6">
      <Link
        data-testid="favicon-link"
        href="/"
        className="flex items-center justify-center"
        prefetch={true}
      >
        <Image src="/favicon.png" alt="Icon" width={24} height={24} />
        <p className="ml-2 hidden text-xl font-semibold md:inline">
          Sched Track
        </p>
      </Link>
      <div className="flex items-center gap-2">
        {children}
        <ThemeToggle />
      </div>
    </motion.header>
  );
};

export default Header;
