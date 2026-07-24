"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { StatePoint } from "@/content/about";
import { Icon } from "@/components/ui/icons";

const CYCLE_MS = 4000;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The banner's step text, changing in place.
 *
 * The title animates in word by word and the description follows, so a change
 * reads as one movement rather than a swap. `mode="wait"` lets the outgoing
 * text clear before the next arrives, and the block reserves its height so
 * nothing around it shifts.
 *
 * The cycle runs regardless of the OS motion setting — it is the content of
 * this section, not decoration. Only the reveal-on-scroll effects opt out.
 */
export function BannerCycle({ points }: { points: StatePoint[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % points.length);
    }, CYCLE_MS);

    return () => clearTimeout(timer);
  }, [index, points.length]);

  const active = points[index];

  return (
    <div>
      <div className="min-h-[11.5rem] sm:min-h-[10rem] lg:min-h-[10.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
              exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
            }}
          >
            <div className="flex items-center gap-3">
              <motion.span
                variants={{
                  hidden: { opacity: 0, scale: 0.75 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
                  exit: { opacity: 0, scale: 0.75, transition: { duration: 0.22 } },
                }}
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-lime-400 text-shade"
              >
                <Icon name={active.icon} className="size-[1.0625rem]" />
              </motion.span>

              <motion.span
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.35 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="text-[0.6875rem] font-bold tracking-[0.12em] text-white/40 uppercase"
              >
                Step {String(index + 1).padStart(2, "0")}
              </motion.span>
            </div>

            {/* Word by word — each word gets its own overflow window */}
            <h3 className="mt-4 flex flex-wrap gap-x-[0.28em] text-[1.375rem] leading-[1.18] font-extrabold text-white sm:text-[1.625rem] lg:text-[1.875rem]">
              {active.title.split(" ").map((word, wordIndex) => (
                <span
                  key={`${word}-${wordIndex}`}
                  className="inline-block overflow-hidden py-[0.08em]"
                >
                  <motion.span
                    variants={{
                      hidden: { y: "110%" },
                      visible: { y: 0, transition: { duration: 0.5, ease: EASE } },
                      exit: { y: "-110%", transition: { duration: 0.28, ease: EASE } },
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h3>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
                exit: { opacity: 0, y: -8, transition: { duration: 0.22 } },
              }}
              className="mt-3 max-w-xl text-[0.875rem] leading-[1.7] text-white/55"
            >
              {active.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress rails — the active one fills over the life of the step */}
      <div className="mt-6 flex gap-2">
        {points.map((point, pointIndex) => (
          <button
            key={point.title}
            type="button"
            onClick={() => setIndex(pointIndex)}
            aria-label={`Show step ${pointIndex + 1}: ${point.title}`}
            aria-current={pointIndex === index ? "step" : undefined}
            className="group h-5 flex-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
          >
            <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/12 transition-colors duration-300 group-hover:bg-white/25">
              {pointIndex === index && (
                <motion.span
                  key={index}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                  className="block h-full origin-left rounded-full bg-lime-400"
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
