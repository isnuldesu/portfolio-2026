"use client";

import { useId, useState } from "react";

import { useLocale } from "@/components/site/locale-provider";
import { ui } from "@/content/ui";
import { t, type L } from "@/lib/i18n";

export type SpecimenStyle = { label: string; weight: number; italic?: boolean };

export type Specimen = {
  /** The CSS family name registered in fonts.css. */
  family: string;
  styles: SpecimenStyle[];
  /** Code points the face actually covers, read from its cmap table. */
  glyphs: number;
  characters: string[];
  sample: L;
};

const SIZES = [96, 64, 44, 30, 22, 17];

export function FontSpecimen({ specimen }: { specimen: Specimen }) {
  const locale = useLocale();
  const inputId = useId();
  const sizeId = useId();
  const [text, setText] = useState("");
  const [size, setSize] = useState(72);

  const face = { fontFamily: `"${specimen.family}"` };
  const sample = t(specimen.sample, locale);
  const typed = text.trim() ? text : sample;

  return (
    <section className="mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-border pb-4">
        <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
          {t(ui.specimen.heading, locale)}
        </h2>
        <p className="label-mono text-muted-foreground">
          {specimen.glyphs} {t(ui.specimen.glyphs, locale)} ·{" "}
          {specimen.styles.length} {t(ui.specimen.styles, locale)}
        </p>
      </div>

      {/* Type something and watch it set in the real face. */}
      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-4 border-y-2 border-border py-4">
          <label htmlFor={inputId} className="label-mono text-muted-foreground">
            {t(ui.specimen.tryIt, locale)}
          </label>
          <input
            id={inputId}
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={sample}
            className="min-w-0 flex-1 border-b-2 border-border bg-transparent px-1 py-2 text-sm outline-none focus-visible:border-foreground focus-visible:ring-0"
          />
          <label htmlFor={sizeId} className="label-mono text-muted-foreground">
            {size}px
          </label>
          <input
            id={sizeId}
            type="range"
            min={16}
            max={140}
            step={2}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
            className="w-36 accent-[var(--coral-block)]"
          />
        </div>

        <p
          className="overflow-hidden py-8 leading-[1.15] break-words"
          style={{ ...face, fontSize: `${size}px` }}
        >
          {typed}
        </p>
      </div>

      {/* Size ladder. */}
      <div className="mt-10 border-t-2 border-border">
        {SIZES.map((step) => (
          <p
            key={step}
            className="overflow-hidden border-b-2 border-border py-3 leading-[1.2] break-words"
            style={{ ...face, fontSize: `${step}px` }}
          >
            {sample}
          </p>
        ))}
      </div>

      {/* Every style in the family, set in itself. */}
      {specimen.styles.length > 1 ? (
        <ul className="mt-10 border-t-2 border-border">
          {specimen.styles.map((style) => (
            <li
              key={style.label}
              className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-border py-4"
            >
              <span
                className="text-3xl leading-none"
                style={{
                  ...face,
                  fontWeight: style.weight,
                  fontStyle: style.italic ? "italic" : "normal",
                }}
              >
                {sample}
              </span>
              <span className="label-mono text-muted-foreground">{style.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Character set, read off the font's own cmap. */}
      <div className="mt-10">
        <p className="label-mono text-muted-foreground">
          {t(ui.specimen.characterSet, locale)}
        </p>
        <ul className="mt-4 -ml-0.5 flex flex-wrap border-t-2 border-border pt-0.5">
          {specimen.characters.map((glyph) => (
            <li
              key={glyph}
              className="ml-0.5 mt-0.5 flex size-12 items-center justify-center border-b-2 border-r-2 border-border text-xl sm:size-14 sm:text-2xl"
              style={face}
            >
              {glyph}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
