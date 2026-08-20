import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

/**
 * Server only. The secret key can read the tables the publishable key cannot,
 * which is what the dashboard needs. Never import this from a client component.
 */
export function getSupabaseAdmin() {
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
