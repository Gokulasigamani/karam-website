import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, TIME_ZONE } from "./config";

/**
 * Resolves the active locale from the `NEXT_LOCALE` cookie (falling back to
 * English) and loads that language's messages. next-intl calls this on every
 * request; there is no locale in the URL, so the cookie is the single source.
 */
export default getRequestConfig(async () => {
  const cookieValue = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieValue) ? cookieValue : defaultLocale;

  return {
    locale,
    timeZone: TIME_ZONE,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
