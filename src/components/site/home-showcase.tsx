"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ProjectVisual } from "@/components/site/project-visual";
import type { StackState } from "@/components/site/showcase-stack";
import { scrollToY } from "@/components/site/smooth-scroll";
import { play } from "@/lib/sound";

// Three.js only loads on desktop, after the page is interactive.
const ShowcaseStack = dynamic(
  () => import("@/components/site/showcase-stack").then((mod) => mod.ShowcaseStack),
  { ssr: false },
);

export type ShowcaseItem = {
  slug: string;
  title: string;
  cover: string;
  screen?: string;
  role: string;
  year: string;
  discipline: string;
  teaser: string;
  result?: string;
};

type Labels = {
  role: string;
  year: string;
  result: string;
  view: string;
  selected: string;
};

/** Height of one row in the right-hand index, in px. Drives the list offset. */
const ROW = 76;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Selected work as one pinned stage, after huyml.co: meta on the left, a
 * WebGL stack of covers in the middle, every project title on the right.
 *
 * Scroll sets a target position; GSAP eases a single number towards it, and
 * everything on the stage (the 3D stack, the index, the counter) is drawn
 * from that one number every frame. Nothing steps: between two projects the
 * whole stage is visibly in between. Below md it falls back to a plain stack.
 */
export function HomeShowcase({
  items,
  labels,
  locale,
}: {
  items: ShowcaseItem[];
  labels: Labels;
  locale: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const state = useRef<StackState>({ pos: 0, vel: 0 });
  const [active, setActive] = useState(0);
  const [webgl, setWebgl] = useState(false);
  const [stackReady, setStackReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- decided once, on the client only
    setWebgl(desktop && !reduce);

    const proxy = state.current;
    const moveTo = gsap.quickTo(proxy, "pos", { duration: reduce ? 0 : 1.1, ease: "power3.out" });
    const rows = Array.from(list.children) as HTMLElement[];
    let shown = 0;
    let last = proxy.pos;

    // Raw position: 0 at the middle of the first project's slot, 1 at the
    // middle of the second, and so on.
    const raw = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return { value: 0, pinned: false };
      const progress = -rect.top / travel;
      return {
        value: gsap.utils.clamp(0, items.length - 1, gsap.utils.clamp(0, 1, progress) * items.length - 0.5),
        pinned: progress > 0 && progress < 1,
      };
    };

    // Each project holds the stage for most of its slot and hands over in
    // the middle third, so the stage reads as a sequence of projects rather
    // than a constant slide.
    const hold = (value: number) => {
      const base = Math.floor(value);
      const f = value - base;
      const t = gsap.utils.clamp(0, 1, (f - 0.3) / 0.4);
      return base + t * t * (3 - 2 * t);
    };

    // Every frame: draw the index from the eased position.
    const draw = () => {
      const { pos } = proxy;
      proxy.vel = pos - last;
      last = pos;
      list.style.transform = `translate3d(0, ${-(pos * ROW + ROW / 2)}px, 0)`;
      rows.forEach((row, index) => {
        const d = Math.abs(index - pos);
        row.style.opacity = String(gsap.utils.clamp(0.14, 1, 1 - d * 0.7));
        row.style.filter = d < 0.05 ? "" : `blur(${Math.min(Math.max(d - 0.6, 0), 2) * 1.5}px)`;
      });
      const nearest = Math.round(pos);
      if (nearest !== shown) {
        shown = nearest;
        setActive(nearest);
        play("step");
      }
    };

    // When scrolling stops between two projects, finish the move, the way
    // huyml.co always lands on a project.
    let idle = 0;
    let landed = Math.round(raw().value);
    const settle = () => {
      const { value, pinned } = raw();
      // Any deliberate push moves one project in that direction; a nudge
      // smaller than that springs back.
      const delta = value - landed;
      const nearest = gsap.utils.clamp(
        0,
        items.length - 1,
        Math.abs(delta) < 0.12 ? landed : landed + Math.sign(delta) * Math.max(1, Math.round(Math.abs(delta))),
      );
      landed = nearest;
      if (!pinned || Math.abs(value - nearest) < 0.02) return;
      const travel = section.offsetHeight - window.innerHeight;
      const top = section.getBoundingClientRect().top + window.scrollY;
      scrollToY(top + ((nearest + 0.5) / items.length) * travel);
    };

    const onScroll = () => {
      moveTo(hold(raw().value));
      window.clearTimeout(idle);
      if (!reduce) idle = window.setTimeout(settle, 160);
    };
    proxy.pos = hold(raw().value);
    moveTo(proxy.pos);
    draw();
    gsap.ticker.add(draw);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(idle);
      gsap.ticker.remove(draw);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  // Scroll so the chosen project sits mid-way through its slot.
  const goTo = (index: number) => {
    const section = sectionRef.current;
    if (!section || index < 0 || index >= items.length) return;
    const travel = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + ((index + 0.5) / items.length) * travel);
  };

  const current = items[active];

  return (
    <>
      {/* Desktop: pinned stage */}
      <section
        ref={sectionRef}
        aria-label={labels.selected}
        className="relative hidden md:block"
        style={{ height: `${items.length * 70}vh` }}
      >
        <div className="sticky top-16 mx-auto grid h-[calc(100dvh-4rem)] w-full max-w-[90rem] grid-cols-12 gap-8 px-8 py-8">
          {/* Meta. Re-keyed on every change so it blurs back in rather than cutting. */}
          <div className="col-span-3 flex flex-col justify-between">
            <div key={current.slug} className="blur-swap">
              <dl className="space-y-5">
                <div>
                  <dt className="label-mono text-muted-foreground">{labels.role}</dt>
                  <dd className="mt-1 font-medium">{current.role}</dd>
                </div>
                <div>
                  <dt className="label-mono text-muted-foreground">{labels.year}</dt>
                  <dd className="mt-1 font-medium">{current.year}</dd>
                </div>
                {current.result ? (
                  <div>
                    <dt className="label-mono text-muted-foreground">{labels.result}</dt>
                    <dd className="mt-1 max-w-[30ch] font-medium">{current.result}</dd>
                  </div>
                ) : null}
              </dl>
              <p className="mt-6 line-clamp-3 max-w-[34ch] text-sm text-muted-foreground">{current.teaser}</p>
              <Link
                href={`/${locale}/work/${current.slug}`}
                className="press mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:opacity-85 focus-visible:ring-3 focus-visible:ring-ring"
              >
                {labels.view}
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div>
              <p className="label-mono text-muted-foreground">{labels.selected}</p>
              <p className="mt-2 flex items-start gap-2 leading-none">
                <span key={active} className="blur-swap font-display text-[clamp(5rem,9vw,9rem)] font-bold tabular-nums">
                  {pad(active + 1)}
                </span>
                <span className="label-mono mt-3 text-muted-foreground">/{pad(items.length)}</span>
              </p>
            </div>
          </div>

          {/* Cover stack */}
          <div className="relative col-span-5 [container-type:size]">
            {webgl ? (
              <ShowcaseStack
                covers={items.map((item) => item.cover)}
                state={state}
                onReady={() => setStackReady(true)}
              />
            ) : null}

            {/* Until the scene is up (and without WebGL), the active cover as a plain image. */}
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 aspect-[2048/1449] w-[min(90cqw,82cqh)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
                stackReady ? "opacity-0" : "opacity-100"
              }`}
            >
              <div key={current.slug} className="blur-swap size-full overflow-hidden rounded-2xl">
                <ProjectVisual cover={current.cover} screen={current.screen} sizes="40vw" priority className="size-full" />
              </div>
            </div>

            {/* Hit areas over the drawn planes: the active plate opens the
                case study, the strips above and below step to the neighbours. */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => goTo(active - 1)}
              className="absolute inset-x-0 top-0 h-[18%] cursor-n-resize"
            />
            <Link
              href={`/${locale}/work/${current.slug}`}
              aria-label={current.title}
              className="absolute left-1/2 top-1/2 aspect-[2048/1449] w-[min(90cqw,82cqh)] -translate-x-1/2 -translate-y-1/2 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring"
            />
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => goTo(active + 1)}
              className="absolute inset-x-0 bottom-0 h-[18%] cursor-s-resize"
            />
          </div>

          {/* Index: positions and fades are written every frame from the eased position. */}
          <div className="relative col-span-4 overflow-hidden [mask-image:linear-gradient(transparent,black_25%,black_75%,transparent)]">
            <ol ref={listRef} className="absolute inset-x-0 top-1/2 will-change-transform">
              {items.map((item, index) => (
                <li key={item.slug} style={{ height: ROW }}>
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={index === active ? "true" : undefined}
                    className="flex h-full w-full flex-col justify-center text-left outline-none transition-transform duration-300 hover:translate-x-1.5 focus-visible:underline motion-reduce:transition-none"
                  >
                    <span className="font-display text-[1.75rem] font-bold leading-tight">{item.title}</span>
                    <span className="label-mono text-muted-foreground">{item.discipline}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Mobile: plain stack */}
      <section aria-label={labels.selected} className="space-y-12 px-5 py-12 md:hidden">
        {items.map((item, index) => (
          <Link key={item.slug} href={`/${locale}/work/${item.slug}`} className="block outline-none">
            <ProjectVisual cover={item.cover} screen={item.screen} sizes="100vw" className="aspect-[4/3]" />
            <p className="label-mono mt-4 text-muted-foreground">
              {pad(index + 1)} / {item.discipline}
            </p>
            <p className="font-display mt-1 text-2xl font-bold">{item.title}</p>
            <p className="mt-1 text-muted-foreground">{item.teaser}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
