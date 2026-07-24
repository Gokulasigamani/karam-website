"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Icon } from "./icons";
import { cn } from "@/lib/utils/cn";

/**
 * Light/dark switch.
 *
 * The resolved theme is only known in the browser, so the control renders as an
 * inert placeholder of the same size until mount. That keeps the server and
 * client markup identical and stops the header from reflowing.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Deferred so it isn't a synchronous state update inside the effect
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className={cn("block size-9 rounded-full bg-surface lg:size-11", className)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={cn(
        "grid size-9 cursor-pointer place-items-center overflow-hidden rounded-full bg-surface text-ink transition-colors hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:size-11",
        className,
      )}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ y: 14, opacity: 0, rotate: -35 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="grid place-items-center"
      >
        <Icon name={isDark ? "sun" : "moon"} className="size-[1.125rem]" />
      </motion.span>
    </button>
  );
}
