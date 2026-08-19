"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";

import { MotionProvider } from "@/components/site/motion-provider";
import type { GalleryItem } from "@/content/case-studies";
import { useLocale } from "@/components/site/locale-provider";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

/**
 * Plates run down the right; each one's number and note stick alongside on the
 * left until the next plate arrives. A rail threads the numbers together and
 * fills as you read, driven by a motion value rather than scroll state.
 */
export function CaseStudyGallery({ items }: { items: GalleryItem[] }) {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 60%", "end 80%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="">
      <div className="flex items-baseline justify-between gap-6 border-b border-border pb-5">
        <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
          {t(ui.caseStudy.galleryHeading, locale)}
        </h2>
        <p className="font-mono text-xs text-muted-foreground">
          {String(items.length).padStart(2, "0")} {t(ui.caseStudy.plates, locale)}
        </p>
      </div>

      <MotionProvider>
        <div ref={railRef} className="relative mt-12">
          {/* Rail: a static track with a filling line on top of it. */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 hidden w-px bg-border lg:block"
            style={{ bottom: "0.5rem" }}
          />
          <m.span
            aria-hidden="true"
            className="absolute left-[7px] top-2 hidden w-px origin-top lg:block"
            style={{
              bottom: "0.5rem",
              background: "var(--coral)",
              scaleY: reduceMotion ? 1 : progress,
            }}
          />

          <ol className="space-y-16 lg:space-y-24 lg:pl-14">
            {items.map((item, index) => (
              <li
                key={item.src}
                className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] lg:gap-12"
              >
                <div className="lg:sticky lg:top-24 lg:self-start">
                  {/* Node on the rail, aligned with the number. */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-14 top-1.5 hidden size-4 items-center justify-center rounded-none border border-border bg-card lg:flex"
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: "var(--coral)" }}
                    />
                  </span>

                  <p className="font-display text-4xl font-medium leading-none text-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 max-w-[30ch] text-base leading-relaxed text-foreground/75">
                    {t(item.caption, locale)}
                  </p>
                </div>

                <m.figure
                  {...(reduceMotion
                    ? {}
                    : {
                        initial: { opacity: 0, y: 26 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.15 },
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
                      })}
                  className="surface overflow-hidden rounded-none"
                >
                  <Image
                    src={item.src}
                    alt={t(item.caption, locale)}
                    width={item.width}
                    height={item.height}
                    priority={index === 0}
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="h-auto w-full"
                  />
                </m.figure>
              </li>
            ))}
          </ol>
        </div>
      </MotionProvider>
    </section>
  );
}
