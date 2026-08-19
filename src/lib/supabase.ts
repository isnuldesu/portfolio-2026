import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Publishable-key client. It can only insert into contact_messages: the table
 * has RLS on with a single INSERT policy for `anon` and no SELECT policy, so a
 * leaked key cannot read anything back.
 *
 * Returns null when the env vars are missing so a local checkout without a
 * Supabase project still builds and renders.
 */
export function getSupabase() {
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
