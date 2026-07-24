"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Catches render errors below the root layout. Error boundaries must be Client
 * Components. `global-error.tsx` would be needed only to catch failures in the
 * root layout itself.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Swap for your error reporter (Sentry, etc.) when one is added.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong.</h1>
      <p className="text-sm opacity-70">
        Please try again. If the problem continues, come back in a little while.
      </p>
      <Button onClick={reset}>Try again</Button>
    </Container>
  );
}
