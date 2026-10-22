"use client";

import { useEffect } from "react";

import { play } from "@/lib/sound";

/** One listener for the whole site: any link or button press taps. */
export function PressSound() {
  useEffect(() => {
    const onPress = (event: PointerEvent) => {
      const target = event.target as Element | null;
      // The audio toggle makes its own sound.
      if (target?.closest("a, button, [role='button']") && !target.closest("[data-sound-toggle]")) play("tap");
    };
    document.addEventListener("pointerdown", onPress, { passive: true });
    return () => document.removeEventListener("pointerdown", onPress);
  }, []);

  return null;
}
