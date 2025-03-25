import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/toggle-theme";
import { ThemeProvider, useTheme } from "next-themes";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    setTheme: vi.fn(),
    resolvedTheme: "light",
    themes: ["light", "dark"],
  })),
}));

describe("ThemeToggle", () => {
  it("renders the moon icon in light mode", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("renders the sun icon in dark mode", () => {
    // Override the mock for this test
    vi.mocked(useTheme).mockReturnValue({
      setTheme: vi.fn(),
      resolvedTheme: "dark",
      themes: ["light", "dark"],
    });

    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("calls setTheme when clicked", () => {
    const setTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      setTheme,
      resolvedTheme: "light",
      themes: ["light", "dark"],
    });

    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByTestId("moon-icon"));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
