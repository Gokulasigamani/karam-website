import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { RotatingText } from "./rotating-text";
import { cn } from "@/lib/utils/cn";

/**
 * Opening banner for inner pages: a photograph under a heavy black shade, with
 * a line that changes on its own. Every page starts the same way, and the
 * treatment greets rather than announces.
 *
 * `aside` fills the right column on wide screens and stacks underneath on
 * narrow ones.
 */
export function PageBanner({
  eyebrow,
  title,
  rotating,
  description,
  image,
  aside,
  className,
}: {
  eyebrow: string;
  title: string;
  rotating: { prefix: string; items: string[] };
  description: string;
  image: { url: string; alt: string };
  aside?: ReactNode;
  className?: string;
}) {
  const hasAside = Boolean(aside);

  return (
    <Container className={cn("pt-2 pb-12 lg:pb-16", className)}>
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[var(--radius-block)] bg-ink px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />

          {/* Black shade — heavy enough that white type stays legible over any
              photograph, angled so the left side where the text sits is darkest */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/92 to-ink/70"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/45" />

          {/* Soft lime bloom, keeps the block from reading as a flat slab */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -right-20 -z-10 size-80 rounded-full bg-lime-400/12 blur-3xl"
          />

          <div
            className={cn(
              "relative grid gap-10",
              hasAside &&
                "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16",
            )}
          >
            <div>
              <span className="text-[0.6875rem] font-bold tracking-[0.14em] text-lime-400 uppercase">
                {eyebrow}
              </span>

              <h1 className="mt-4 max-w-2xl text-[2rem] leading-[1.06] font-extrabold sm:text-[2.5rem] lg:text-[3rem]">
                {title}
              </h1>

              {/* items-center, not baseline: a grid inside a flex row does not
                  share a reliable baseline with the text beside it */}
              <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[1.0625rem] leading-[1.35] font-bold sm:text-xl lg:text-[1.375rem]">
                <span className="text-white/40">{rotating.prefix}</span>
                <RotatingText items={rotating.items} className="text-lime-400" />
              </p>

              <p className="mt-6 max-w-xl text-[0.875rem] leading-[1.75] text-white/60 lg:text-[0.9375rem]">
                {description}
              </p>
            </div>

            {hasAside && <div>{aside}</div>}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}

/** Compact numbered list used as a banner `aside`. */
export function BannerSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-0">
      {steps.map((step, index) => (
        <li
          key={step}
          className="flex gap-4 border-t border-white/12 py-3.5 first:border-t-0 first:pt-0"
        >
          <span className="text-[0.6875rem] font-bold tabular-nums text-lime-400">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[0.8125rem] leading-[1.55] text-white/65">{step}</span>
        </li>
      ))}
    </ol>
  );
}

/** Compact figure list used as a banner `aside`. */
export function BannerStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="block text-2xl font-extrabold tabular-nums lg:text-[1.75rem]">
              {stat.value}
            </span>
            <span className="mt-1 block text-[0.75rem] leading-snug text-white/50">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
