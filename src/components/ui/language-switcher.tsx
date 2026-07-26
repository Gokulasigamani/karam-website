"use client";

import { locales, localeNames, type Locale } from "@/i18n/config";
import { useLocaleControl } from "@/lib/providers/locale-provider";
import { cn } from "@/lib/utils/cn";

/**
 * EN / தமிழ் toggle. The locale lives in client state and both message sets are
 * already loaded, so a tap re-renders the page in the other language instantly —
 * no server round-trip, no loader.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale: active, setLocale } = useLocaleControl();

  return (
    <div
      className={cn("inline-flex items-center rounded-full bg-surface p-0.5", className)}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale: Locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => setLocale(locale)}
          aria-pressed={locale === active}
          className={cn(
            "cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            locale === active ? "bg-lime-400 text-shade" : "text-muted hover:text-ink",
          )}
        >
          {localeNames[locale]}
        </button>
      ))}
    </div>
  );
}
