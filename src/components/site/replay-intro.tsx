"use client";

/**
 * Does a full page load of the home page, so the opening animation plays
 * again. A hard navigation is needed: the inline script that arms the intro
 * only runs on a document load.
 */
export function ReplayIntro({ href }: { href: string }) {
  return (
    <button
      type="button"
      onClick={() => window.location.assign(href)}
      className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none transition-opacity hover:opacity-85 focus-visible:ring-3 focus-visible:ring-ring"
    >
      Replay opening
    </button>
  );
}
