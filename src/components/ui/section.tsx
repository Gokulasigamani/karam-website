import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "./container";

/**
 * Vertical rhythm for every page block, in one place. Sections never set their
 * own padding — that is how the spacing scale stays consistent as the page grows.
 */
export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-16 lg:py-20", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Heading + description, set the same way in every section. */
export function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: {
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <h2 className="text-[1.625rem] leading-[1.15] font-extrabold text-ink sm:text-[2rem] lg:text-[2.375rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted lg:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * The borderless card used across the site: soft grey surface, generous
 * padding, no outline and no shadow. Separation comes from contrast alone.
 */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] bg-surface p-6 transition-colors duration-200 hover:bg-surface-strong lg:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}
