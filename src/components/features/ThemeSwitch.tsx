"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";

export const ThemeSwitcher = dynamic(
  () => import("~/components/features/ThemeSwitch"),
  {
    ssr: true,
    loading: () => <div>Loading ... </div>,
  }
);

const ThemeSwitcherButton = () => {
  const [theme, setTheme] = useState(global.window?.__theme || "light");
  const isDark = theme === "dark";

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className="p-2 rounded-full hover:bg-muted dark:hover:bg-muted/20 transition-colors"
      aria-label="Toggle theme"
    >
      <div className="flex gap-2 items-center">
        {theme === "light" ? (
          <>
            <Sun className="w-5 h-5 text-foreground" />
            Light
          </>
        ) : (
          <>
            <Moon className="w-5 h-5 text-foreground" />
            Dark
          </>
        )}
      </div>
    </Button>
  );
};

export default ThemeSwitcherButton;
