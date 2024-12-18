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
      <div className="cursor-pointer rounded-lg p-2 hover:bg-muted">
        <SunIcon onClick={() => setTheme("light")} />{" "}
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div className="cursor-pointer rounded-lg p-2 hover:bg-muted">
        <MoonIcon onClick={() => setTheme("dark")} />
      </div>
    );
  }
};
export default ThemeToggle;
