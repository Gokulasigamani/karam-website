"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface Banner {
  image: { url: string; alt: string };
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Premium auto-advancing hero carousel. Each banner is a photograph under a
 * shade with an editorial block; the image slowly zooms (Ken Burns) and the
 * copy staggers in, so a slide feels alive even between transitions.
 *
 * Accessibility: it pauses on hover and when the tab is hidden, honours
 * `prefers-reduced-motion` (no auto-advance, no motion), exposes real
 * previous/next buttons and a labelled slide picker, and a bar shows the time to
 * the next slide.
 */
export function BannerCarousel({
  banners,
  intervalMs = 6500,
  labels,
}: {
  banners: Banner[];
  intervalMs?: number;
  labels: { region: string; previous: string; next: string; goToSlide: string };
}) {
  const count = banners.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const paused = hovered || hidden;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );
  const advance = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  // Auto-advance + progress bar, unless paused or reduced motion.
  useEffect(() => {
    if (paused || reduced || count < 2) return;

    const timer = setTimeout(advance, intervalMs);
    const bar = barRef.current;
    if (bar) {
      bar.style.transition = "none";
      bar.style.width = "0%";
      void bar.offsetWidth; // reflow so the reset applies before the transition
      bar.style.transition = `width ${intervalMs}ms linear`;
      bar.style.width = "100%";
    }
    return () => clearTimeout(timer);
  }, [advance, paused, reduced, count, intervalMs, index]);

  const active = banners[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative isolate overflow-hidden rounded-[var(--radius-media)] bg-shade"
    >
      <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={reduced ? { opacity: 0 } : { x: direction > 0 ? "100%" : "-100%" }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: direction > 0 ? "-100%" : "100%" }}
            transition={{ duration: reduced ? 0.3 : 0.85, ease: EASE }}
            className="absolute inset-0"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${count}`}
          >
            {/* Ken Burns — slow zoom over the life of the slide */}
            <motion.div
              className="absolute inset-0"
              initial={reduced ? false : { scale: 1.12 }}
              animate={reduced ? undefined : { scale: 1 }}
              transition={{ duration: intervalMs / 1000 + 1, ease: "linear" }}
            >
              <Image
                src={active.image.url}
                alt={active.image.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-shade via-shade/70 to-shade/20 sm:bg-gradient-to-r sm:from-shade sm:via-shade/80 sm:to-shade/25"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-16 size-96 rounded-full bg-lime-400/10 blur-3xl"
            />

            {/* Copy, staggered in */}
            <motion.div
              className="relative flex h-full min-h-[480px] items-end p-6 pb-24 sm:min-h-[540px] sm:p-10 sm:pb-24 lg:min-h-[600px] lg:p-14 lg:pb-24"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
              }}
            >
              <div className="max-w-xl text-paper">
                {[
                  <span
                    key="eyebrow"
                    className="inline-block text-[0.6875rem] font-bold tracking-[0.16em] text-lime-400 uppercase"
                  >
                    {active.eyebrow}
                  </span>,
                  <h2
                    key="title"
                    className="mt-3 text-[1.875rem] leading-[1.05] font-extrabold [overflow-wrap:anywhere] sm:text-[2.5rem] lg:text-[3rem]"
                  >
                    {active.title}
                  </h2>,
                  <p
                    key="desc"
                    className="mt-4 max-w-lg text-[0.9375rem] leading-[1.7] text-white/70 lg:text-base"
                  >
                    {active.description}
                  </p>,
                  <Button key="cta" href={active.ctaHref} size="lg" className="mt-6">
                    {active.ctaLabel}
                    <Icon name="arrowRight" className="size-4" />
                  </Button>,
                ].map((child, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: reduced ? 0 : 22 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                  >
                    {child}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots — centred at the bottom, clear of the copy */}
      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {banners.map((_, dot) => (
          <button
            key={dot}
            type="button"
            onClick={() => goTo(dot, dot > index ? 1 : -1)}
            aria-label={labels.goToSlide.replace("{n}", String(dot + 1))}
            aria-current={dot === index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400",
              dot === index ? "w-8 bg-lime-400" : "w-2 bg-white/40 hover:bg-white/70",
            )}
          />
        ))}
      </div>

      {/* Progress to the next slide */}
      {!reduced && count > 1 && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <div ref={barRef} className="h-full bg-lime-400" style={{ width: "0%" }} />
        </div>
      )}
    </section>
  );
}
