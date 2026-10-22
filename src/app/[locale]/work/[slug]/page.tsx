import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { CaseCurtain } from "@/components/site/case-curtain";
import { CaseReel, type ReelEntry } from "@/components/site/case-reel";
import { FontSpecimen } from "@/components/site/font-specimen";
import { Button } from "@/components/ui/button";
import { StableLabel } from "@/components/ui/stable-label";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { coverSizes } from "@/content/cover-sizes";
import { person, primaryCta, whatsappCta } from "@/content/site";
import { ui } from "@/content/ui";
import { isLocale, locales, t } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((study) => ({ locale, slug: study.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study || !isLocale(locale)) return {};

  const description = t(study.teaser, locale);

  return {
    title: `${study.title}, ${t(study.discipline, locale).toLowerCase()}`,
    description,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: { id: `/id/work/${slug}`, en: `/en/work/${slug}` },
    },
    openGraph: {
      title: `${study.title} - ${person.name}`,
      description,
      images: [{ url: study.cover }],
    },
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Case study, after huyml.co: an ink curtain with the project name opens the
 * page; a meta column (about, role, year, client, impact, links) holds still
 * on the left; every plate of the project runs down the middle with the
 * process notes between them; a thumbnail rail tracks the plates on the
 * right; the next project closes the page in display type. Visual language
 * stays Square: flat fills, hairlines, pill actions.
 */
export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const study = getCaseStudy(slug);
  if (!study) notFound();

  // Cycle within the same category: a reader on a typeface should not be
  // handed a point of sale product as the obvious next step.
  const siblings = caseStudies.filter((entry) => entry.category === study.category);
  const index = siblings.findIndex((entry) => entry.slug === study.slug);
  const next = siblings[(index + 1) % siblings.length];
  const number = caseStudies.findIndex((entry) => entry.slug === study.slug) + 1;

  const links =
    study.links ??
    (study.link
      ? [{ href: study.link, label: study.linkLabel ?? t(ui.caseStudy.visit, locale) }]
      : []);

  // Plates: cover first, then the raw interface shot, then the gallery, no repeats.
  const [coverW, coverH] = coverSizes[study.cover] ?? [2048, 1449];
  const plates: Extract<ReelEntry, { kind: "image" }>[] = [
    { kind: "image" as const, src: study.cover, width: coverW, height: coverH, alt: study.title },
    ...study.gallery.map((item) => ({
      kind: "image" as const,
      src: item.src,
      width: item.width,
      height: item.height,
      alt: t(item.caption, locale),
      caption: t(item.caption, locale),
    })),
  ].filter((plate, i, all) => all.findIndex((other) => other.src === plate.src) === i);

  // Notes: the problem and constraints first, then each process section.
  const notes: Extract<ReelEntry, { kind: "text" }>[] = [
    { kind: "text", label: t(ui.caseStudy.overview, locale).toUpperCase(), body: t(study.summary, locale) },
  ];
  if (study.problem) {
    notes.push({
      kind: "text",
      label: t(ui.caseStudy.problem, locale).toUpperCase(),
      body: t(study.problem, locale),
      bullets: study.constraints?.map((item) => t(item, locale)),
    });
  }
  study.sections.forEach((section, i) =>
    notes.push({
      kind: "text",
      label: `${pad(i + 1)} / ${t(section.heading, locale).toUpperCase()}`,
      heading: t(section.heading, locale),
      body: t(section.body, locale),
      bullets: section.bullets?.map((item) => t(item, locale)),
    }),
  );

  // Interleave: a plate, then a note, until either runs out.
  const entries: ReelEntry[] = [];
  for (let i = 0; i < Math.max(plates.length, notes.length); i++) {
    if (plates[i]) entries.push(plates[i]);
    if (notes[i]) entries.push(notes[i]);
  }

  return (
    <div className="theme-square">
      <CaseCurtain key={study.slug} title={study.title} />

      <article className="mx-auto w-full max-w-[90rem] px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-[17rem_minmax(0,1fr)_4.5rem] lg:gap-12">
          {/* Meta column */}
          <aside data-lenis-prevent className="pt-10 pb-10 lg:sticky lg:top-16 lg:flex lg:h-[calc(100dvh-4rem)] lg:flex-col lg:justify-between lg:self-start lg:overflow-y-auto lg:pb-8 [scrollbar-width:none]">
            <div>
              <Link
                href={`/${locale}/work`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-secondary pl-3 pr-4 text-sm font-medium outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring"
              >
                <ArrowLeft className="size-4" />
                {t(ui.caseStudy.back, locale)}
              </Link>

              <p className="label-mono mt-8 text-muted-foreground">
                {pad(number)} / {t(study.discipline, locale).toUpperCase()}
              </p>
              <h1 className="font-display mt-2 text-3xl font-bold leading-tight lg:hidden">{study.title}</h1>

              <dl className="mt-6 grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-5 text-sm">
                <dt className="text-muted-foreground">{t(ui.caseStudy.about, locale)}</dt>
                <dd className="leading-relaxed">{t(study.teaser, locale)}</dd>

                <dt className="text-muted-foreground">{t(ui.caseStudy.role, locale)}</dt>
                <dd>{t(study.role, locale)}</dd>

                <dt className="text-muted-foreground">{t(ui.caseStudy.year, locale)}</dt>
                <dd>{study.year}</dd>

                <dt className="text-muted-foreground">{t(ui.caseStudy.client, locale)}</dt>
                <dd>{t(study.client, locale)}</dd>

                {study.results?.length ? (
                  <>
                    <dt className="text-muted-foreground">{t(ui.caseStudy.impact, locale)}</dt>
                    <dd>
                      <ul className="space-y-1.5">
                        {study.results.slice(0, 2).map((item) => (
                          <li key={t(item, "en")}>{t(item, locale)}</li>
                        ))}
                      </ul>
                    </dd>
                  </>
                ) : null}
              </dl>

              {links.length ? (
                <ul className="mt-6 space-y-1">
                  {links.map((entry) => (
                    <li key={entry.href}>
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-base font-medium underline underline-offset-4 outline-none hover:no-underline focus-visible:ring-3 focus-visible:ring-ring"
                      >
                        {entry.label}
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <p className="label-mono mt-8 hidden text-muted-foreground lg:block">
              {t(ui.caseStudy.scroll, locale)}
            </p>
          </aside>

          <CaseReel entries={entries} title={study.title} />
        </div>

        {study.typefaces || study.palette ? (
          <section className="grid gap-3 md:grid-cols-2 lg:ml-[19rem] lg:mr-[7.5rem]">
            {study.typefaces ? (
              <div className="rounded-2xl bg-muted p-6">
                <h3 className="label-mono text-muted-foreground">{t(ui.caseStudy.typography, locale)}</h3>
                <ul className="mt-4 space-y-1">
                  {study.typefaces.map((face) => (
                    <li key={t(face, "en")} className="text-xl font-semibold tracking-tight">
                      {t(face, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {study.palette ? (
              <div className="rounded-2xl bg-muted p-6">
                <h3 className="label-mono text-muted-foreground">{t(ui.caseStudy.palette, locale)}</h3>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {study.palette.map((swatch) => (
                    <li key={swatch.hex + swatch.name}>
                      <span className="block h-14 w-full rounded-[10px]" style={{ background: swatch.hex }} />
                      <span className="mt-2 block text-xs font-medium">{swatch.name}</span>
                      <span className="label-mono block text-muted-foreground">{swatch.hex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        {study.specimen ? (
          <div className="mt-16 lg:ml-[19rem] lg:mr-[7.5rem]">
            <FontSpecimen specimen={study.specimen} />
          </div>
        ) : null}

        {/* Next project, set in display type the way the reel's title is. */}
        <section className="flex flex-col items-center py-28 text-center md:py-40">
          <p className="text-sm text-muted-foreground">{t(ui.caseStudy.next, locale)}</p>
          <Link
            href={`/${locale}/work/${next.slug}`}
            className="font-display group mt-3 text-[clamp(3rem,10vw,9rem)] font-bold leading-none tracking-tight text-[var(--coral)] outline-none transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:underline"
          >
            {next.title}
          </Link>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            <Button asChild variant="sq-primary" size="sq-sm">
              <Link href={`/${locale}${primaryCta.href}`}>
                <StableLabel value={primaryCta.label} />
              </Link>
            </Button>
            <Button asChild variant="sq-secondary" size="sq-sm">
              <a href={t(whatsappCta.href, locale)} target="_blank" rel="noopener noreferrer">
                <StableLabel value={whatsappCta.label} />
              </a>
            </Button>
          </div>
        </section>
      </article>
    </div>
  );
}
