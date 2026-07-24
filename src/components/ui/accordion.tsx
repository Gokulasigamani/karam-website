"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./icons";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * The only client component in the FAQ section — the surrounding section stays
 * a Server Component. Grid-rows animation keeps open/close smooth without
 * measuring heights in JS.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question} className="border-t border-hairline last:border-b">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <span className="text-base font-medium text-ink transition-opacity group-hover:opacity-60 sm:text-[1.0625rem]">
                  {item.question}
                </span>
                <Icon
                  name="plus"
                  strokeWidth={1.5}
                  className={cn(
                    "size-5 shrink-0 text-ink transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pr-12 pb-6 text-[0.9375rem] leading-[1.7] text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
