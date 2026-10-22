"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { m, useReducedMotion } from "motion/react";

import { MotionProvider } from "@/components/site/motion-provider";
import { scrollToCenter } from "@/components/site/smooth-scroll";
import { play } from "@/lib/sound";

export type ReelEntry =
  | { kind: "image"; src: string; width: number; height: number; alt: string; caption?: string }
  | { kind: "text"; label: string; heading?: string; body?: string; bullets?: string[] };

gsap.registerPlugin(ScrollTrigger);

// The huyml.co settle: long, soft, nothing overshoots.
const EASE = [0.22, 1, 0.36, 1] as const;

// Notes come in out of a blur.
const reveal = {
  initial: { opacity: 0, y: 32, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.8, ease: EASE },
};

// Plates arrive tipped back in 3D and lay flat as they reach the reader.
const plateReveal = {
  initial: { opacity: 0, y: 64, rotateX: 18, scale: 0.94, transformPerspective: 1200 },
  whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 1200 },
  viewport: { once: true, amount: 0.08 },
  transition: { duration: 1, ease: EASE },
};

/**
 * The body of a case study: every plate of the project stacked down the page,
 * with the process notes set between them, a giant project name pinned to the
 * bottom of the viewport over the plates, and a rail of thumbnails on the
 * right that marks the plate in view and jumps to any other.
 */
export function CaseReel({ entries, title }: { entries: ReelEntry[]; title: string }) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const plateRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const images = entries
    .map((entry, index) => ({ entry, index }))
    .filter((item): item is { entry: Extract<ReelEntry, { kind: "image" }>; index: number } => item.entry.kind === "image");

  useEffect(() => {
    const nodes = plateRefs.current.filter(Boolean) as HTMLElement[];
    // A plate counts as "in view" once it crosses the middle band of the screen.
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) setActive(Number((record.target as HTMLElement).dataset.plate));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Scroll-linked motion, on ScrollTrigger (which shares the GSAP ticker
  // with Lenis, so it moves in step with the smooth scroll).
  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      // The giant name greets the page, then blurs and sinks away over the
      // first 160px of scroll, so it never sits on a plate being read.
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          opacity: 0,
          y: 80,
          filter: "blur(12px)",
          ease: "none",
          scrollTrigger: { start: 0, end: 160, scrub: true },
        });
      }
      // Each plate's picture drifts slightly against its frame while the
      // plate crosses the screen: a quiet parallax, scaled up just enough
      // that the frame never shows an edge.
      gsap.utils.toArray<HTMLElement>("[data-parallax]", rootRef.current).forEach((picture) => {
        gsap.fromTo(
          picture,
          { yPercent: -3, scale: 1.07 },
          {
            yPercent: 3,
            scale: 1.07,
            ease: "none",
            scrollTrigger: { trigger: picture.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, rootRef);
    // Plates load images after layout; recalculate once they are in.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reduceMotion]);

  const jump = (plate: number) => {
    const node = plateRefs.current[plate];
    if (node) scrollToCenter(node);
  };

  // The same tick as the home showcase whenever a new plate takes the centre.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    play("step");
  }, [active]);

  // A long rail scrolls on its own; keep the current thumbnail inside it.
  const railRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const rail = railRef.current;
    const item = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !item || rail.scrollHeight <= rail.clientHeight) return;
    rail.scrollTo({ top: item.offsetTop - rail.clientHeight / 2 + item.offsetHeight / 2, behavior: "smooth" });
  }, [active]);

  // Plate number of each entry (null for notes), worked out before render.
  const plateOf: (number | null)[] = [];
  let count = 0;
  for (const entry of entries) plateOf.push(entry.kind === "image" ? count++ : null);

  return (
    <MotionProvider>
      <div ref={rootRef} className="relative min-w-0 pb-16 lg:pt-10">
        <ol className="space-y-16 md:space-y-24">
          {entries.map((entry, index) => {
            if (entry.kind === "text") {
              return (
                <m.li key={`text-${index}`} {...(reduceMotion ? {} : reveal)} className="max-w-[44rem] rounded-2xl bg-muted p-6 md:p-8">
                  <p className="label-mono text-muted-foreground">{entry.label}</p>
                  {entry.heading ? (
                    <h2 className="font-display mt-3 text-2xl font-bold leading-tight text-balance md:text-3xl">{entry.heading}</h2>
                  ) : null}
                  {entry.body ? <p className="mt-3 text-base leading-relaxed text-foreground/80">{entry.body}</p> : null}
                  {entry.bullets?.length ? (
                    <ul className="mt-4 space-y-2">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-base leading-relaxed text-foreground/80">
                          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--coral)]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </m.li>
              );
            }

            const current = plateOf[index] ?? 0;
            return (
              <m.li
                key={entry.src}
                ref={(node: HTMLLIElement | null) => {
                  plateRefs.current[current] = node;
                }}
                data-plate={current}
                {...(reduceMotion ? {} : plateReveal)}
                style={{ transformOrigin: "50% 0%" }}
              >
                <figure>
                  <div className="overflow-hidden rounded-2xl border border-border bg-muted">
                    <Image
                      data-parallax
                      src={entry.src}
                      alt={entry.alt}
                      width={entry.width}
                      height={entry.height}
                      priority={current === 0}
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="h-auto w-full will-change-transform"
                    />
                  </div>
                  {entry.caption ? (
                    <figcaption className="mt-3 flex gap-3 text-sm text-muted-foreground">
                      <span className="label-mono shrink-0">{String(current + 1).padStart(2, "0")}</span>
                      {entry.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </m.li>
            );
          })}
        </ol>

        {/* The project name over the foot of the screen on arrival. It fades
            and sinks as soon as the page scrolls, so it never sits on top of
            a plate while someone is reading. Decorative: the real heading is
            in the meta column. */}
        <p
          ref={titleRef}
          aria-hidden="true"
          style={{
            // One line, sized to the name: long names get smaller type rather than wrapping.
            fontSize: `min(9vw, ${Math.round(1500 / Math.max(title.length, 8))}px)`,
            ...(reduceMotion ? { opacity: 0 } : null),
          }}
          className="font-display pointer-events-none fixed bottom-24 left-[21rem] right-8 z-10 hidden whitespace-nowrap text-right font-bold leading-none tracking-tight text-[var(--coral)] lg:block"
        >
          {title}
        </p>
      </div>

      {/* Thumbnail rail */}
      <nav aria-label="Plates" className="hidden lg:block">
        <ol
          ref={railRef}
          data-lenis-prevent
          className={`sticky flex flex-col gap-2 [scrollbar-width:none] ${
            images.length > 8
              ? "top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto px-1 py-2"
              : "top-[calc(50dvh-10rem)] pt-10"
          }`}
        >
          {images.map(({ entry }, index) => (
            <li key={entry.src}>
              <button
                type="button"
                onClick={() => jump(index)}
                aria-label={`${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                className={`press block w-full overflow-hidden rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring ${
                  index === active
                    ? "opacity-100 ring-2 ring-foreground ring-offset-2 ring-offset-background"
                    : "opacity-45 hover:opacity-80"
                }`}
              >
                <Image
                  src={entry.src}
                  alt=""
                  width={entry.width}
                  height={entry.height}
                  sizes="64px"
                  className="h-auto w-full"
                />
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </MotionProvider>
  );
}
