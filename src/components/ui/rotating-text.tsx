"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Cycles a list of phrases, animating word by word.
 *
 * An invisible copy of the longest phrase sits in the same grid cell and sets
 * the box size, so the line reserves its space up front and nothing below it
 * moves as the text changes. The first phrase is server-rendered, so the line
 * still reads without JavaScript.
 *
 * Every level shares one line-height and carries no vertical padding — that is
 * what keeps the animated words sitting on the same line as the static text
 * beside them. Descenders clear the clip because the line box is taller than
 * the glyphs.
 */
export function RotatingText({
  items,
  intervalMs = 3200,
  className,
}: {
  items: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;

    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % items.length);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [index, items.length, intervalMs]);

  const longest = items.reduce((a, b) => (b.length > a.length ? b : a), items[0] ?? "");
  const active = items[index];

  return (
    <span className={cn("inline-grid leading-[1.35]", className)}>
      {/* Sizer — reserves the space the longest phrase needs */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {longest}
      </span>

      <span className="col-start-1 row-start-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04 } },
              exit: { transition: { staggerChildren: 0.018, staggerDirection: -1 } },
            }}
            className="flex flex-wrap gap-x-[0.28em] leading-[1.35]"
          >
            {active?.split(" ").map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className="inline-block overflow-hidden leading-[1.35]"
              >
                <motion.span
                  variants={{
                    hidden: { y: "110%" },
                    visible: { y: 0, transition: { duration: 0.5, ease: EASE } },
                    exit: { y: "-110%", transition: { duration: 0.3, ease: EASE } },
                  }}
                  className="inline-block leading-[1.35]"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
