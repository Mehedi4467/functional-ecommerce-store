"use client";

import type React from "react";
import { useEffect, useState } from "react";
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark;

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <>
      {children}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const isDark = theme ? theme === 'dark' : prefersDark;
              if (isDark) {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
        }}
      />
    </>
  );
}

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const newIsDark = !isDarkMode;

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setIsDark(newIsDark);
  };

  return { isDark, toggleTheme };
}
