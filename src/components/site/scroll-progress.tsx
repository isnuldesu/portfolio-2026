"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A rule under the header that fills with reading position.
 *
 * This is the one thing GSAP is here for: a value scrubbed against scroll
 * position rather than an animation that plays once on entry. Everything else
 * on the site stays on Motion, so only this leaf pays for the library.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = bar.current;
    if (!element) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    // Sheets grow as images decode; recalculate once the page settles.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 1200);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
      context.revert();
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none sticky top-16 z-50 h-[3px] w-full"
    >
      <div
        ref={bar}
        className="h-full w-full origin-left scale-x-0"
        style={{ background: "var(--coral-block)" }}
      />
    </div>
  );
}
