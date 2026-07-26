"use client";

import { Reveal } from "./reveal";

/**
 * A slim vertical thread that visually links one home section to the next: a
 * hairline gradient with a lime node that gently pulses. Purely decorative — it
 * reveals on scroll and is dropped for reduced-motion users.
 */
export function SectionConnector() {
  return (
    <div aria-hidden="true" className="flex justify-center py-3">
      <Reveal className="relative flex h-14 w-px justify-center bg-gradient-to-b from-transparent via-hairline to-transparent lg:h-16">
        <span className="connector-node absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-lime-400" />
      </Reveal>
    </div>
  );
}
