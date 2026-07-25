"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, localeNames, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/cn";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * EN / தமிழ் toggle. Writes the choice straight to the cookie on the client and
 * refreshes — one server round-trip instead of two (a server action to set the
 * cookie, then a refresh). The cookie is not sensitive, so it does not need to
 * be set server-side.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const active = useLocale() as Locale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(locale: Locale) {
    if (locale === active || pending) return;
    // Writing document.cookie is a DOM side effect in an event handler, not
    // state mutation — the immutability rule doesn't apply here.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${ONE_YEAR};samesite=lax`;
    startTransition(() => {
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
