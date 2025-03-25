"use client";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./svg-icons";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <MoonIcon />;

  if (resolvedTheme === "dark") {
    return (
      <div className="hover:bg-muted hover:text-primary cursor-pointer rounded-lg p-2">
        <SunIcon onClick={() => setTheme("light")} />{" "}
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div className="hover:bg-muted hover:text-primary cursor-pointer rounded-lg p-2">
        <MoonIcon onClick={() => setTheme("dark")} />
      </div>
    );
  }
};
export default ThemeToggle;
