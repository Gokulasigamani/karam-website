/** The languages the site speaks. English is the default for a new visitor. */
export const locales = ["en", "ta"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * The site serves Tamil Nadu, so all dates and times are rendered in India
 * Standard Time. Setting this explicitly (rather than letting next-intl fall
 * back to the server's zone) keeps server and client markup identical and
 * silences next-intl's ENVIRONMENT_FALLBACK warning.
 */
export const TIME_ZONE = "Asia/Kolkata";

/** The cookie that remembers a visitor's choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Label shown for each language in the switcher — each in its own script. */
export const localeNames: Record<Locale, string> = {
  en: "EN",
  ta: "தமிழ்",
};

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ta";
}
