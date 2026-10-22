"use client";

import { setSound, useSound } from "@/lib/sound";

/**
 * "Audio Off —" / "Audio On" with a moving wave, as on huyml.co, set as a
 * Square pill. Off by default; the choice is remembered.
 */
export function SoundToggle({ label, on, off }: { label: string; on: string; off: string }) {
  const enabled = useSound();

  return (
    <button
      type="button"
      data-sound-toggle
      aria-pressed={enabled}
      onClick={() => setSound(!enabled)}
      className="press hidden h-10 shrink-0 items-center gap-2 rounded-full bg-muted px-4 text-sm font-medium text-foreground/70 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:inline-flex"
    >
      <span>{label}</span>
      <span className="text-foreground">{enabled ? on : off}</span>
      <span aria-hidden="true" className={`sound-wave ${enabled ? "is-on" : ""}`}>
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
