"use client";

import { useEffect, useState } from "react";

/** Matches the end of the case-curtain-out keyframes in globals.css. */
const DURATION_MS = 1400;

/**
 * Entrance for a case study: a full ink panel holding the project name, which
 * drops away to reveal the page. Plays on every visit to a case study, since
 * it is the cue that a new project has opened. Pure CSS, so it runs before
 * hydration; hidden under reduced motion. Unmounts once done so it can never
 * block clicks.
 */
export function CaseCurtain({ title }: { title: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div className="case-curtain" aria-hidden="true">
      <p className="case-curtain-title">{title}</p>
    </div>
  );
}
