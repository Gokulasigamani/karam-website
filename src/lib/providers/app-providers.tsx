"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

/**
 * Single client boundary for every context provider (theme, query client,
 * toaster, analytics...).
 *
 * The root layout stays a Server Component and renders this once, so adding a
 * provider later never forces another route into client rendering.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      // Tokens flip under `.dark`, so the class is what we need on <html>
      attribute="class"
      // Light is the default for everyone. The OS preference is deliberately
      // ignored — dark is opt-in via the toggle, and the choice then persists.
      defaultTheme="light"
      enableSystem={false}
      // Stops every colour on the page from animating during a theme change
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
