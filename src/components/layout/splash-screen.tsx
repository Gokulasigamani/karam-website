"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/icons";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Splash timings, in milliseconds. */
const HOLD_MS = 1900;
const FADE_MS = 600;

/**
 * Fixed specks, not random ones — `Math.random()` at render would produce
 * different markup on the server and the client and break hydration.
 * Positions avoid the middle band, where the wordmark sits.
 */
const SPECKS = [
  { left: "8%", top: "14%", size: 3, delay: 0, duration: 2.1 },
  { left: "17%", top: "68%", size: 2, delay: 0.7, duration: 2.6 },
  { left: "23%", top: "26%", size: 4, delay: 1.1, duration: 2.2 },
  { left: "31%", top: "82%", size: 2, delay: 0.3, duration: 1.9 },
  { left: "38%", top: "11%", size: 3, delay: 1.4, duration: 2.4 },
  { left: "44%", top: "88%", size: 2, delay: 0.9, duration: 2.0 },
  { left: "12%", top: "44%", size: 2, delay: 1.7, duration: 2.8 },
  { left: "56%", top: "9%", size: 4, delay: 0.2, duration: 2.3 },
  { left: "62%", top: "79%", size: 3, delay: 1.2, duration: 2.1 },
  { left: "69%", top: "22%", size: 2, delay: 0.5, duration: 2.7 },
  { left: "76%", top: "62%", size: 3, delay: 1.5, duration: 2.2 },
  { left: "83%", top: "17%", size: 2, delay: 0.8, duration: 1.8 },
  { left: "88%", top: "74%", size: 4, delay: 0.4, duration: 2.5 },
  { left: "94%", top: "38%", size: 2, delay: 1.3, duration: 2.3 },
  { left: "5%", top: "86%", size: 3, delay: 1.0, duration: 2.6 },
  { left: "50%", top: "94%", size: 2, delay: 1.6, duration: 2.0 },
  { left: "72%", top: "92%", size: 2, delay: 0.6, duration: 2.4 },
  { left: "29%", top: "5%", size: 2, delay: 1.8, duration: 2.2 },
  { left: "91%", top: "88%", size: 3, delay: 0.1, duration: 2.7 },
  { left: "3%", top: "58%", size: 2, delay: 1.45, duration: 2.15 },
];

/**
 * The opening sequence: a green-and-black gradient field with drifting specks,
 * the mark spinning inside a turning sheen, the name revealing letter by
 * letter, then the whole panel lifting away.
 *
 * It lives in the root layout, so it mounts once per full page load and stays
 * out of the way on client-side navigation. The page itself is rendered behind
 * it the entire time, so nothing is delayed and crawlers see the real content.
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
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink"
        >
          {/* Green-into-black field */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 18% 22%, rgba(195,245,60,0.20), transparent 52%)," +
                "radial-gradient(circle at 82% 76%, rgba(147,197,22,0.16), transparent 48%)," +
                "radial-gradient(circle at 50% 50%, rgba(60,120,40,0.14), transparent 62%)," +
                "linear-gradient(155deg, #04140a 0%, #0a0a0a 46%, #061a0c 100%)",
            }}
          />

          {/* Glitter */}
          <div aria-hidden="true" className="absolute inset-0">
            {SPECKS.map((speck) => (
              <span
                key={`${speck.left}-${speck.top}`}
                className="absolute rounded-full bg-lime-200"
                style={{
                  left: speck.left,
                  top: speck.top,
                  width: speck.size,
                  height: speck.size,
                  boxShadow: "0 0 8px 1px rgba(226,250,156,0.65)",
                  animation: `glitter ${speck.duration}s ease-in-out ${speck.delay}s infinite`,
                }}
              />
            ))}
          </div>

          <motion.div
            exit={{ scale: 1.06, opacity: 0 }}
            transition={{ duration: FADE_MS / 1000, ease: EASE }}
            className="relative flex flex-col items-center gap-7"
          >
            <span className="relative grid size-32 place-items-center sm:size-36">
              {/* Sheen turning behind the mark */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full opacity-70 blur-md"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(195,245,60,0.42) 70deg, transparent 150deg, rgba(147,197,22,0.28) 250deg, transparent 330deg)",
                  animation: "sheen-turn 4.5s linear infinite",
                }}
              />

              <motion.span
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                transition={{
                  scale: { duration: 0.5, ease: EASE },
                  opacity: { duration: 0.4 },
                  rotate: { duration: 1.6, ease: "linear", repeat: Infinity },
                }}
                className="relative block"
              >
                <Logo
                  className="size-14 text-lime-400 sm:size-16"
                  style={{ filter: "drop-shadow(0 0 14px rgba(195,245,60,0.5))" }}
                />
              </motion.span>
            </span>

            {/* Wordmark — each letter rises out of its own mask */}
            <span className="flex text-[2.125rem] leading-[1.1] font-extrabold tracking-[-0.04em] text-white sm:text-[2.75rem]">
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

            {/* Hairline that draws itself under the name */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="block h-px w-28 origin-left bg-gradient-to-r from-lime-400 via-lime-400/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
