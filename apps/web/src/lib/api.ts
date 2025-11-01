import { headers } from 'next/headers';

/**
 * Resolve a base URL that works for server-side fetches.
 * - If NEXT_PUBLIC_API_BASE_URL is set, use it directly (absolute URL).
 * - Otherwise, use the current request host so Next rewrites can proxy /api/* to the backend.
 */
export function getApiBase(): string {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? 'http';
  return `${proto}://${host}`;
}

/**
 * Server-side fetch helper that composes an absolute URL using the current host
 * so relative /api paths work in RSC/SSR too.
 */
export async function apiFetch(path: string, init?: RequestInit) {
  const base = getApiBase();
  const url = path.startsWith('http') ? path : `${base}${path}`;
  const res = await fetch(url, { cache: 'no-store', ...init });
  return res;
}
