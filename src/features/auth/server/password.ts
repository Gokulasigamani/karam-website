import "server-only";

import bcrypt from "bcryptjs";

/** Work factor. 12 is a sensible 2020s default — slow enough to matter, not so
 *  slow it stalls a signup. */
const COST = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, COST);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
