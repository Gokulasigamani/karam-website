"use client";

import type { ReactNode } from "react";

/**
 * Single client boundary for every context provider (theme, query client,
 * toaster, analytics...).
 *
 * The root layout stays a Server Component and renders this once, so adding a
 * provider later never forces another route into client rendering.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
