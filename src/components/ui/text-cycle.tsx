"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Rotates through a list of words in place.
 *
 * All items are stacked in one grid cell, so the box sizes itself to the widest
 * word and nothing around it reflows as the text changes. The first item renders
 * on the server, which means it stays readable without JavaScript.
 *
 * The shared line-height and lack of vertical padding are what keep the moving
 * word on the same line as the static text beside it.
 */
export function TextCycle({
  items,
  intervalMs = 2400,
  className,
}: {
  items: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  return (
    <span className="inline-grid overflow-hidden leading-[1.35]">
      {items.map((item, itemIndex) => (
        <span
          key={item}
          aria-hidden={itemIndex !== index}
          className={cn(
            "col-start-1 row-start-1 leading-[1.35] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            itemIndex === index
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0",
            className,
          )}
        >
          {item}
        </span>
      ))}
    </span>
  );
}
