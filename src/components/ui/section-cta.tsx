"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "./button";
import { Reveal } from "./reveal";
import { Icon } from "./icons";

interface Action {
  label: string;
  href: string;
}

/**
 * The call-to-action row that closes a section, pointing people to the page that
 * matches what they just read. Reveals on scroll like the rest of the section.
 */
export function SectionCta({
  primary,
  secondary,
  className,
}: {
  primary: Action;
  secondary?: Action;
  className?: string;
}) {
  return (
    <Reveal className={cn("mt-12 flex flex-wrap gap-3", className)}>
      <Button href={primary.href} size="lg">
        {primary.label}
        <Icon name="arrowRight" className="size-4" />
      </Button>
      {secondary && (
        <Button href={secondary.href} variant="subtle" size="lg">
          {secondary.label}
        </Button>
      )}
    </Reveal>
  );
}
