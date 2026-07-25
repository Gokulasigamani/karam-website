"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/icons";

/** How long the splash holds before lifting away, in milliseconds. Kept short so
 *  it reads as a loader, not a gate. */
const HOLD_MS = 900;
const FADE_MS = 400;

/**
 * The opening splash: the Karam mark spinning on a frosted panel, then gone.
 * Mounts once per full page load (client navigations reuse the app shell), and
 * the real page renders behind it the whole time, so nothing is actually delayed.
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  // Hold the page still until the splash has cleared.
  useEffect(() => {
    if (!visible) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          role="status"
          aria-label={`${siteConfig.name} is loading`}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[110] grid place-items-center bg-canvas/85 backdrop-blur-2xl"
        >
          <Logo className="size-14 animate-spin text-lime-500 [animation-duration:1.1s] sm:size-16" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
