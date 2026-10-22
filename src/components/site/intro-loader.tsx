"use client";

import { useEffect, useState } from "react";

/** Matches the end of the intro-out keyframes in globals.css. */
const DURATION_MS = 2300;

/**
 * Opening sequence, on every full load of home: the name rises in letter by
 * letter, holds for a beat, then lifts away to uncover the page. Whether it
 * plays is decided before first paint by INTRO_ARM_SCRIPT in the locale
 * layout (see src/lib/intro.ts).
 */
export function IntroLoader({ name }: { name: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    // Only the inline script marks "play", and only on a full page load.
    // Client-side navigation back to home never runs it, so the overlay
    // stays display:none and there is nothing to run.
    if (root.dataset.intro !== "play") return;

    root.style.overflow = "hidden";
    const finish = () => setDone(true);
    const timer = window.setTimeout(finish, DURATION_MS);
    window.addEventListener("keydown", finish, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", finish);
      root.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const root = document.documentElement;
    root.style.overflow = "";
    root.dataset.intro = "skip";
  }, [done]);

  if (done) return null;

  return (
    <div className="intro" aria-hidden="true" onClick={() => setDone(true)}>
      <p className="intro-name">
        {[...name].map((letter, i) => (
          <span key={i} className="intro-letter" style={{ "--i": i } as React.CSSProperties}>
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}
