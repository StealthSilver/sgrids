"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const ThemeToggle = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const applyViewTransitionAnimation = useCallback(() => {
    if (!buttonRef.current) return;
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [duration]);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const currentlyDark =
      document.documentElement.classList.contains("dark");
    const nextTheme = currentlyDark ? "light" : "dark";

    const commitTheme = () => {
      flushSync(() => {
        setIsDark(!currentlyDark);
        // Update both next-themes state and the DOM class synchronously so
        // the rest of the app (e.g. globe config driven by useTheme()) stays
        // in sync across route transitions.
        setTheme(nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      });
    };

    // Some browsers (Safari/Firefox) don't support View Transitions. Fall back
    // to a plain theme switch in that case.
    if (typeof document.startViewTransition !== "function") {
      commitTheme();
      return;
    }

    await document.startViewTransition(commitTheme).ready;
    applyViewTransitionAnimation();
  }, [setTheme, applyViewTransitionAnimation]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "cursor-pointer transition-colors text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white",
        className
      )}
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
