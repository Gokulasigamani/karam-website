"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("errorPage");

  useEffect(() => {
    // Swap for your error reporter (Sentry, etc.) when one is added.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-[1.75rem] font-extrabold text-ink lg:text-[2rem]">{t("title")}</h1>
      <p className="max-w-md text-[0.875rem] leading-[1.7] text-muted">{t("body")}</p>
      <Button onClick={reset}>{t("retry")}</Button>
    </Container>
  );
}
