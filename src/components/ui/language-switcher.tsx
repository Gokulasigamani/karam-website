"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import { cn } from "@/lib/utils/cn";

/**
 * EN / தமிழ் toggle. Writes the choice to a cookie and refreshes the route so
 * every server component re-renders in the chosen language.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const active = useLocale() as Locale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(locale: Locale) {
    if (locale === active || pending) return;
    startTransition(async () => {
      await setUserLocale(locale);
      router.refresh();
    });
  }

  return (
    <div
      className={cn("inline-flex items-center rounded-full bg-surface p-0.5", className)}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => choose(locale)}
          aria-pressed={locale === active}
          className={cn(
            "cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            locale === active
              ? "bg-lime-400 text-shade"
              : "text-muted hover:text-ink",
          )}
        >
          {localeNames[locale]}
        </button>
      ))}
    </div>
  );
}
