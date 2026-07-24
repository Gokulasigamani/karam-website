"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/icons";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Splash timings, in milliseconds. */
const HOLD_MS = 1800;
const FADE_MS = 600;

/** Staggered so the three dots read as one travelling pulse. */
const DOT_DELAYS = [0, 0.16, 0.32];

/**
 * The opening sequence: a frosted white panel, the mark spinning, the name
 * revealing letter by letter, then the whole thing lifting away.
 *
 * It lives in the root layout, so it mounts once per full page load and stays
 * out of the way on client-side navigation. The page is rendered behind it the
 * entire time — which is what the blur is picking up — so nothing is delayed
 * and crawlers see the real content.
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  // Hold the page still until the splash has cleared
  useEffect(() => {
    if (!visible) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [visible]);

  const letters = siteConfig.name.split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          role="status"
          aria-label={`${siteConfig.name} is loading`}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-canvas/80 backdrop-blur-2xl"
        >
          <motion.div
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: FADE_MS / 1000, ease: EASE }}
            className="relative flex flex-col items-center gap-7"
          >
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{
                scale: { duration: 0.5, ease: EASE },
                opacity: { duration: 0.4 },
                rotate: { duration: 1.6, ease: "linear", repeat: Infinity },
              }}
              className="block"
            >
              <Logo className="size-14 text-lime-500 sm:size-16" />
            </motion.span>

            {/* Wordmark — each letter rises out of its own mask */}
            <span className="flex text-[2.125rem] leading-[1.1] font-extrabold tracking-[-0.04em] text-ink sm:text-[2.75rem]">
              {letters.map((letter, index) => (
                <span key={`${letter}-${index}`} className="inline-block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.35 + index * 0.07 }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </span>

            {/* Dot loader */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="flex items-center gap-2"
            >
              {DOT_DELAYS.map((delay) => (
                <span
                  key={delay}
                  className="block size-2 rounded-full bg-lime-600"
                  style={{ animation: `loader-dot 1.1s ease-in-out ${delay}s infinite` }}
                />
              ))}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
