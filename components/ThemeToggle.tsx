"use client";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./Icons";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <MoonIcon />;

  if (resolvedTheme === "dark") {
    return (
      <div className="cursor-pointer hover:bg-muted p-2 rounded-lg ">
        <SunIcon onClick={() => setTheme("light")} />{" "}
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div className="cursor-pointer hover:bg-muted p-2 rounded-lg">
        <MoonIcon onClick={() => setTheme("dark")} />
      </div>
    );
  }
};
export default ThemeToggle;
