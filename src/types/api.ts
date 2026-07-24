/** Shapes shared across feature slices. Feature-specific types stay in the slice. */

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

/**
 * Return type for Server Actions. Actions resolve rather than throw so forms
 * can render field errors instead of tripping the nearest error boundary.
 */
export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export type Nullable<T> = T | null;
