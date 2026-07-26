"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import en from "@/messages/en.json";
import ta from "@/messages/ta.json";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";

/** Both catalogs ship to the client so switching needs no network round-trip. */
const MESSAGES: Record<Locale, typeof en> = { en, ta: ta as unknown as typeof en };

const ONE_YEAR = 60 * 60 * 24 * 365;

interface LocaleControl {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleControl | null>(null);

/** Read + change the active language from any client component. */
export function useLocaleControl(): LocaleControl {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocaleControl must be used within <LocaleProvider>");
  return ctx;
}

/**
 * Holds the active locale as client state and feeds it to next-intl. Because the
 * locale lives on the client and both message sets are already loaded, switching
 * is instant — a state update re-renders every `useTranslations` consumer with
 * no request to the server.
 *
 * The initial value comes from the server (the cookie), so the first render —
 * including SSR — matches, and there is no hydration flicker. On change we also
 * persist the cookie (so a future full load starts in the right language) and
 * update `<html lang>` for correctness and assistive tech.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const change = useCallback((next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${ONE_YEAR};samesite=lax`;
    document.documentElement.lang = next;
    setLocale(next);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale: change }}>
      <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
