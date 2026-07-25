"use server";

import { cookies } from "next/headers";
import { LOCALE_COOKIE, type Locale } from "./config";

/** Remembers the visitor's language choice for a year. The switcher calls this,
 *  then refreshes so server components re-render in the new language. */
export async function setUserLocale(locale: Locale): Promise<void> {
  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
