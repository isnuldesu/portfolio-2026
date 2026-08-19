"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * Loads only the DOM animation feature set instead of the full Motion runtime.
 * `strict` makes any stray `motion.*` usage throw, so the heavy bundle cannot
 * sneak back in through a later component.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
