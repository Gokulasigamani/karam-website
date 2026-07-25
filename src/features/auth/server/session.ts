import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isProduction } from "@/lib/config/env";
import { userIdForToken, SESSION_MAX_AGE_SECONDS } from "./sessions.repo";
import { findUserById, type Role, type SessionUser } from "./users.repo";

/**
 * The one place the app asks "who is this?". Everything downstream — pages,
 * server actions, role checks — goes through here, and `import "server-only"`
 * keeps it off the client.
 */

export const SESSION_COOKIE = "karam_session";

/**
 * The current user, or null when signed out. `cache` memoises it for the
 * duration of a single request, so a page and its actions don't each hit the
 * database.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const userId = await userIdForToken(token);
  if (!userId) return null;

  return findUserById(userId);
});

/** Redirects to login when signed out; otherwise returns the user. */
export async function requireUser(nextPath?: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect(nextPath ? `/login?next=${encodeURIComponent(nextPath)}` : "/login");
  }
  return user;
}

/** Requires one of `roles`; sends an authenticated-but-wrong-role user home. */
export async function requireRole(roles: Role | Role[], nextPath?: string): Promise<SessionUser> {
  const user = await requireUser(nextPath);
  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(user.role)) redirect("/account");
  return user;
}

/* ---- Cookie writers. Only callable from a Server Action or Route Handler. ---- */

export async function setSessionCookie(token: string): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}
