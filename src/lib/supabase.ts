import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (service role) for writing leads.
 * Returns null when env is not configured, so local dev and builds never crash —
 * the API route degrades gracefully and still acknowledges the lead.
 *
 * Required env (set in Vercel + .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (server-only — never expose to the client)
 */
let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const isSupabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
