"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToId } from "@/lib/utils/scroll";

/**
 * Finishes the job for anchors that point at a *different* page — About →
 * `/#cases`, a pasted link, a refresh on a hash. The router lands on the route
 * first, then this scrolls to the target once the new DOM has painted.
 *
 * Renders nothing.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    // Two frames: one for the route's DOM, one for layout to settle
    const outer = requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToId(hash));
    });

    return () => cancelAnimationFrame(outer);
  }, [pathname]);

  return null;
}
