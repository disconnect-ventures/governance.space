"use client";

import { useLayoutEffect } from "react";

type Theme = "light" | "dark";

declare global {
  interface Window {
    __theme: Theme;
    __onThemeChange: (theme: Theme) => void;
    __setPreferredTheme: (theme: Theme) => void;
  }
}

function setupTheme() {
  window.__onThemeChange = function () {};

  function setTheme(newTheme: Theme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.documentElement.dataset.theme = newTheme;
    window.__onThemeChange(newTheme);
  }

  let preferredTheme;
  try {
    preferredTheme = localStorage.getItem("theme") as Theme;
  } catch {}

  window.__setPreferredTheme = function (newTheme: Theme) {
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch {}
  };

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  darkQuery.addEventListener("change", function (e) {
    window.__setPreferredTheme(e.matches ? "dark" : "light");
  });

  setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
}

export default function ThemeScript() {
  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "dark" | "light";
    const theme = window.__theme
      ? window.__theme
      : storedTheme
        ? storedTheme
        : "light";

    if (typeof window.__setPreferredTheme !== "function") {
      setupTheme();
    }

    window.__setPreferredTheme(theme);
  }, []);
  return <script dangerouslySetInnerHTML={{ __html: `(${setupTheme})();` }} />;
}
