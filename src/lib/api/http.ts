import { serverEnv } from "@/lib/config/env";
import { ApiError } from "./errors";

/**
 * The only place in the app that calls `fetch` against the backend.
 *
 * Feature slices import this instead of using `fetch` directly, which keeps
 * base URL, auth headers, error shape and cache tagging consistent — and means
 * swapping the transport later touches exactly one file.
 */

type QueryValue = string | number | boolean | null | undefined;

export interface RequestOptions {
  /** Appended as a query string; `null` / `undefined` entries are dropped. */
  query?: Record<string, QueryValue>;
  /** Serialized as JSON. Use `FormData` to send multipart instead. */
  body?: unknown;
  headers?: Record<string, string>;
  /** Bearer token for authenticated calls. */
  token?: string;
  signal?: AbortSignal;
  /** Next.js caching: `{ revalidate: 60 }` or `{ tags: ["orders"] }`. */
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = new URL(
    path.startsWith("/") ? path.slice(1) : path,
    serverEnv.apiBaseUrl.endsWith("/")
      ? serverEnv.apiBaseUrl
      : `${serverEnv.apiBaseUrl}/`,
  );

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return null;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json().catch(() => null);
  }
  return response.text();
}

function extractMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object" && "message" in payload) {
    const message = (payload as { message?: unknown }).message;
    if (typeof message === "string" && message.length > 0) return message;
  }
  return fallback;
}

async function request<T>(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { query, body, headers, token, signal, next, cache } = options;
  const isFormData = body instanceof FormData;

  const response = await fetch(buildUrl(path, query), {
    method,
    signal,
    next,
    cache,
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : body !== undefined && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      extractMessage(payload, `${method} ${path} failed with ${response.status}`),
      payload,
    );
  }

  return payload as T;
}

export const http = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, options?: RequestOptions) => request<T>("POST", path, options),
  put: <T>(path: string, options?: RequestOptions) => request<T>("PUT", path, options),
  patch: <T>(path: string, options?: RequestOptions) => request<T>("PATCH", path, options),
  delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options),
};
