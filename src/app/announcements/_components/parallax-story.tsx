"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface StoryChapter {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
}

/**
 * Sticky-stack storytelling: the chapter cards pin to the viewport one after
 * another, and each new card scrolls up and over the one before it — the card
 * beneath shrinks and dims a touch so the deck reads with depth. Inside each
 * card the photograph drifts slower than the frame (parallax). All of it
 * collapses to a plain stacked list when the visitor prefers reduced motion.
 */
export function StackedStories({ chapters }: { chapters: StoryChapter[] }) {
  return (
    <div className="relative">
      {chapters.map((chapter, index) => (
        <StackCard
          key={chapter.title}
          chapter={chapter}
          index={index}
          total={chapters.length}
        />
      ))}
    </div>
  );
}

function StackCard({
  chapter,
  index,
  total,
}: {
  chapter: StoryChapter;
  index: number;
  total: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isLast = index === total - 1;

  // 0 while the card is arriving/pinned, → 1 as the next card scrolls over it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  // Inner image parallax — drifts within the oversized frame as the card moves.
  const { scrollYProgress: throughView } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(throughView, [0, 1], ["-12%", "12%"]);

  // Pin lower for each card so a sliver of the one beneath keeps peeking.
  const top = 88 + index * 22;
  const right = index % 2 === 1;

  const coverStyle = reduced || isLast ? undefined : { scale, opacity };

  return (
    <div
      ref={ref}
      className="sticky pb-5 lg:pb-7"
      style={{ top: `${top}px` }}
    >
      <motion.article
        style={coverStyle}
        className="relative isolate flex min-h-[74vh] origin-top items-center overflow-hidden rounded-[var(--radius-block)] bg-shade shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.35)] lg:min-h-[80vh]"
        aria-label={chapter.title}
      >
        {/* Parallax photograph — oversized so it can drift within the frame */}
        <motion.div
          className="absolute inset-x-0 -top-[12%] h-[124%]"
          style={reduced ? undefined : { y: imageY }}
        >
          <Image
            src={chapter.image}
            alt=""
            fill
            sizes="(max-width: 1536px) 100vw, 1472px"
            className="object-cover"
            aria-hidden="true"
          />
        </motion.div>

        {/* Scrim, angled toward the copy */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-shade/95 via-shade/60 to-shade/30",
            right
              ? "sm:bg-gradient-to-l sm:from-shade sm:via-shade/70 sm:to-transparent"
              : "sm:bg-gradient-to-r sm:from-shade sm:via-shade/70 sm:to-transparent",
          )}
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className={cn("max-w-lg", right && "sm:ml-auto")}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full border border-lime-400/40 bg-lime-400/10 text-sm font-extrabold text-lime-400 tabular-nums backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-white/20" />
              <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-white/50 uppercase tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-lime-400 uppercase">
              {chapter.eyebrow}
            </span>
            <h2 className="mt-3 text-[1.75rem] leading-[1.1] font-extrabold text-paper [overflow-wrap:anywhere] sm:text-[2.25rem] lg:text-[2.75rem]">
              {chapter.title}
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/75 lg:text-[1.0625rem]">
              {chapter.body}
            </p>
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}
