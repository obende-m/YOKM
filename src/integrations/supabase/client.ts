import { createClient } from "@supabase/supabase-js";

import type { Database } from "./types";

/**
 * Public Supabase configuration. Both values are safe to ship to the browser:
 * access is enforced by Row Level Security in the database, not by hiding keys.
 * Vite inlines VITE_* variables at build time for both the browser and SSR bundles;
 * the plain names are accepted as a server-side fallback.
 */
export const SUPABASE_URL = (import.meta.env["VITE_SUPABASE_URL"] ||
  (typeof process !== "undefined" ? process.env["SUPABASE_URL"] : "") ||
  "") as string;
export const SUPABASE_PUBLISHABLE_KEY = (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
  (typeof process !== "undefined" ? process.env["SUPABASE_PUBLISHABLE_KEY"] : "") ||
  "") as string;

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

/** New-style Supabase API keys are opaque strings, not JWTs, so never send them as a bearer token. */
function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    if (
      isNewSupabaseApiKey(supabaseKey) &&
      headers.get("Authorization") === `Bearer ${supabaseKey}`
    ) {
      headers.delete("Authorization");
    }
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

function createSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["VITE_SUPABASE_URL"] : []),
      ...(!SUPABASE_PUBLISHABLE_KEY ? ["VITE_SUPABASE_PUBLISHABLE_KEY"] : []),
    ];
    const message = `Missing environment variable(s): ${missing.join(", ")}. See .env.example.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  const isBrowser = typeof window !== "undefined";
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
    auth: {
      persistSession: isBrowser,
      autoRefreshToken: isBrowser,
      detectSessionInUrl: isBrowser,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

/** Lazily created so that importing this module never throws during build. */
export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});

/** A stateless client for server-side reads of public data (no session, no cookies). */
export function createPublicServerClient() {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

/** Public URL of an object in the "media" storage bucket. */
export function storagePublicUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/media/${path.split("/").map(encodeURIComponent).join("/")}`;
}
