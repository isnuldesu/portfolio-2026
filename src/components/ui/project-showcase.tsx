"use client";

import type React from "react";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

import { projects as defaultProjects, type Project } from "@/content/site";

/**
 * Hover-preview work list.
 *
 * The cursor-following preview is driven by motion values plus a spring, not by
 * React state on every pointer frame. State per frame re-renders the whole list
 * and collapses on mid-range devices.
 */
export function ProjectShowcase({
  items = defaultProjects,
  eyebrow = "Selected work",
}: {
  items?: Project[];
  eyebrow?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 220, damping: 28, mass: 0.6 });
  const y = useSpring(pointerY, { stiffness: 220, damping: 28, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent) => {
    pointerX.set(e.clientX + 24);
    pointerY.set(e.clientY - 96);
  };

  const isVisible = hoveredIndex !== null;

  return (
    <section
      id="work"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32"
    >
      <h2 className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        {eyebrow}
      </h2>

      {/* Cursor preview. Hidden below lg where there is no hover pointer. */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden overflow-hidden rounded-2xl shadow-2xl lg:block"
      >
        <div className="relative h-[190px] w-[300px] overflow-hidden rounded-2xl bg-secondary">
          {items.map((project, index) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={project.title}
              src={project.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transform: hoveredIndex === index ? "scale(1)" : "scale(1.08)",
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        </div>
      </motion.div>

      <ul className="border-t border-border">
        {items.map((project, index) => {
          const active = hoveredIndex === index;
          return (
            <li key={project.title}>
              <a
                href={project.link}
                className="group block rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
              >
                <div className="relative border-b border-border py-6">
                  <div
                    className={`absolute inset-0 -mx-4 rounded-2xl bg-secondary/40 transition-opacity duration-300 ease-out ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="relative flex items-start justify-between gap-6 px-1">
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-2">
                        <h3 className="text-lg font-medium tracking-tight text-foreground md:text-xl">
                          <span className="relative">
                            {project.title}
                            <span
                              className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 ease-out ${
                                active ? "w-full" : "w-0"
                              }`}
                            />
                          </span>
                        </h3>
                        <ArrowUpRight
                          strokeWidth={1.5}
                          className={`size-4 text-primary transition-all duration-300 ease-out ${
                            active
                              ? "translate-x-0 translate-y-0 opacity-100"
                              : "-translate-x-2 translate-y-2 opacity-0"
                          } ${reduceMotion ? "transition-none" : ""}`}
                        />
                      </div>

                      <p
                        className={`mt-1.5 max-w-[52ch] text-sm leading-relaxed transition-colors duration-300 ease-out ${
                          active ? "text-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {project.description}
                      </p>
                    </div>

                    <span
                      className={`font-mono text-xs tabular-nums transition-colors duration-300 ease-out ${
                        active ? "text-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {project.year}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
