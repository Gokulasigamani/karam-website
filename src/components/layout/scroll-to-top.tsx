"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToTop } from "@/lib/utils/scroll";
import { Icon } from "@/components/ui/icons";

/** How far down the page the button appears. */
const SHOW_AFTER_PX = 420;

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating shortcut back to the top, bottom right.
 *
 * The ring around it tracks how far down the page you are, so the control
 * doubles as a position indicator. It uses the same eased tween as the anchor
 * links, which means the trip up matches the trip down.
 */
export function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setProgress(max > 0 ? Math.min(1, scrolled / max) : 0);
      setVisible(scrolled > SHOW_AFTER_PX);
    };

    // Throttle to one measurement per frame — scroll fires far more often
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    // Deferred so the first measurement isn't a synchronous effect update
    const initial = requestAnimationFrame(measure);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(initial);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="scroll-top group fixed right-4 bottom-4 z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-contrast text-paper shadow-[var(--shadow-fab)] transition-[bottom] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:right-7 sm:bottom-7 sm:size-14"
        >
          {/* Progress ring */}
          <svg
            viewBox="0 0 48 48"
            className="absolute inset-0 size-full -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white/15"
            />
            <circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              className="text-lime-400 transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>

          {/* Arrow lifts on hover */}
          <Icon
            name="arrowUp"
            strokeWidth={2}
            className="relative size-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
