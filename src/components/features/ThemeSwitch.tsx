"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for system preference or stored theme on mount
    const storedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = storedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant={"ghost"}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <div className="flex gap-2 items-center">
        {theme === "light" ? (
          <>
            <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            Light
          </>
        ) : (
          <>
            <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            Dark
          </>
        )}
      </div>
    </Button>
  );
};

export default ThemeSwitcher;
