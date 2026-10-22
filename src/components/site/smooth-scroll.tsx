"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

let instance: Lenis | null = null;

/**
 * Smooth page scroll, the way huyml.co feels: wheel input is eased towards
 * its target instead of jumping a notch at a time. The page still scrolls
 * natively underneath, so sticky, scroll-linked motion and find-in-page keep
 * working. Off under reduced motion, where native scroll takes over and
 * ScrollTrigger reads it directly.
 *
 * Lenis runs on the GSAP ticker rather than its own requestAnimationFrame,
 * so smooth scroll, ScrollTrigger and every GSAP tween share one clock and
 * scroll-linked animation never lags a frame behind the page.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, anchors: true, autoRaf: false });
    instance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}

/** Scroll the page to `top`, through Lenis when it is running. */
export function scrollToY(top: number, { immediate = false } = {}) {
  if (instance) instance.scrollTo(top, { immediate, duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

/** Scroll so `element` sits in the middle of the screen. */
export function scrollToCenter(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  scrollToY(window.scrollY + rect.top - (window.innerHeight - rect.height) / 2);
}
