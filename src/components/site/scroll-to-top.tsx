"use client";

import { useEffect } from "react";

import { scrollToY } from "@/components/site/smooth-scroll";

/**
 * A case study always opens at its very top. Without this, Next scrolls the
 * new segment (not the page) into view, which lands 64px down below the
 * header, and back/forward or a reload brings back wherever the reader last
 * stopped. Scroll restoration is turned off only while a case study is open.
 */
export function ScrollToTop() {
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    // Next's own scroll runs after this effect, from the layout above, so
    // reset on the next frame to have the last word.
    const frame = requestAnimationFrame(() => scrollToY(0, { immediate: true }));
    scrollToY(0, { immediate: true });

    return () => {
      cancelAnimationFrame(frame);
      history.scrollRestoration = previous;
    };
  }, []);

  return null;
}
