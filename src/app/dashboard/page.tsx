import { cookies } from "next/headers";

import { DashboardLogin } from "@/components/site/dashboard-login";
import { TrackingToggle } from "@/components/site/tracking-toggle";
import { verifySession } from "@/lib/dashboard-session";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

type View = { path: string; locale: string | null; referrer: string | null; created_at: string };
type Message = { name: string; email: string; message: string; created_at: string };

function tally<T extends string | null>(rows: T[]) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = row?.trim() || "direct";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-muted p-5">
      <p className="label-mono text-muted-foreground">{label}</p>
      <p className="font-display mt-2 text-4xl font-bold leading-none tabular-nums">{value}</p>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8">{children}</main>;
}

/** Reading the clock and the database belongs outside the render path. */
async function loadDashboard() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [viewsRes, messagesRes] = await Promise.all([
    supabase
      .from("page_views")
      .select("path, locale, referrer, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000),
    supabase
      .from("contact_messages")
      .select("name, email, message, created_at")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return {
    views: (viewsRes.data ?? []) as View[],
    messages: (messagesRes.data ?? []) as Message[],
  };
}

export default async function Dashboard() {
  const password = process.env.DASHBOARD_PASSWORD;
  const unlocked = verifySession((await cookies()).get("dash")?.value, password);

  if (!password || !unlocked) {
    return (
      <Shell>
        <DashboardLogin />
      </Shell>
    );
  }

  const data = await loadDashboard();
  if (!data) {
    return (
      <Shell>
        <p className="text-sm text-muted-foreground">
          Supabase is not configured on this deployment.
        </p>
      </Shell>
    );
  }

  const { views, messages } = data;

  const byDay = tally(views.map((v) => v.created_at.slice(0, 10))).sort((a, b) =>
    a[0] < b[0] ? 1 : -1,
  );
  const byPath = tally(views.map((v) => v.path)).slice(0, 12);
  const byReferrer = tally(views.map((v) => v.referrer)).slice(0, 8);
  const byLocale = tally(views.map((v) => v.locale));
  const peak = Math.max(1, ...byDay.map(([, n]) => n));

  return (
    <Shell>
      <p className="label-mono text-muted-foreground">Portfolio</p>
      <h1 className="font-display mt-3 text-4xl font-bold md:text-5xl">
        Dashboard
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last 30 days. No cookies and no identifiers are stored: a view is a path,
        a language, a referring host, and a country.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Views" value={views.length} />
        <Stat label="Days with traffic" value={byDay.length} />
        <Stat label="Messages" value={messages.length} />
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Per day</h2>
        <ul className="mt-6 border-t border-border">
          {byDay.slice(0, 30).map(([day, count]) => (
            <li key={day} className="flex items-center gap-4 border-b border-border py-2">
              <span className="label-mono w-28 shrink-0 text-muted-foreground">{day}</span>
              <span
                aria-hidden="true"
                className="h-2.5 rounded-full"
                style={{
                  width: `${Math.max(2, (count / peak) * 100)}%`,
                  background: "var(--coral-block)",
                }}
              />
              <span className="label-mono ml-auto shrink-0">{count}</span>
            </li>
          ))}
          {byDay.length === 0 ? (
            <li className="border-b border-border py-4 text-sm text-muted-foreground">
              Nothing recorded yet.
            </li>
          ) : null}
        </ul>
      </section>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-bold">Pages</h2>
          <ul className="mt-6 border-t border-border">
            {byPath.map(([path, count]) => (
              <li key={path} className="flex gap-4 border-b border-border py-2 text-sm">
                <span className="truncate">{path}</span>
                <span className="label-mono ml-auto shrink-0 text-muted-foreground">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">
            Referrers and language
          </h2>
          <ul className="mt-6 border-t border-border">
            {[...byReferrer, ...byLocale].map(([label, count], index) => (
              <li
                key={`${label}-${index}`}
                className="flex gap-4 border-b border-border py-2 text-sm"
              >
                <span className="truncate">{label}</span>
                <span className="label-mono ml-auto shrink-0 text-muted-foreground">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <TrackingToggle />

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Messages</h2>
        <ul className="mt-6 border-t border-border">
          {messages.map((message) => (
            <li key={message.created_at + message.email} className="border-b border-border py-5">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-base font-medium">{message.name}</span>
                <a
                  href={`mailto:${message.email}`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  {message.email}
                </a>
                <span className="label-mono ml-auto text-muted-foreground">
                  {message.created_at.slice(0, 16).replace("T", " ")}
                </span>
              </div>
              <p className="mt-2 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
                {message.message}
              </p>
            </li>
          ))}
          {messages.length === 0 ? (
            <li className="border-b border-border py-4 text-sm text-muted-foreground">
              No messages yet.
            </li>
          ) : null}
        </ul>
      </section>
    </Shell>
  );
}
