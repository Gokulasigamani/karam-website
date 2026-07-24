/**
 * Single source of truth for environment variables.
 *
 * Nothing else in the app should read `process.env` directly — that way a
 * missing variable fails loudly here instead of surfacing as `undefined`
 * three layers down.
 *
 * Values are read lazily (via getters) so importing this module never throws
 * at build time; it only throws when a variable is actually needed.
 */

function required(name: string, value: string | undefined): string {
  if (!value || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${name}. Add it to .env.local (see .env.example).`,
    );
  }
  return value;
}

/**
 * Server-only configuration. Never import this from a Client Component —
 * these values must not reach the browser bundle.
 */
export const serverEnv = {
  get apiBaseUrl(): string {
    return required("API_BASE_URL", process.env.API_BASE_URL);
  },
} as const;

/**
 * Values safe to expose to the browser. Must be prefixed with `NEXT_PUBLIC_`
 * so Next.js inlines them at build time.
 */
export const publicEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";
