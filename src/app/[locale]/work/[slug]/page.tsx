import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { CaseStudyGallery } from "@/components/site/case-study-gallery";
import { PageSheet } from "@/components/site/page-sheet";
import { Button } from "@/components/ui/button";
import { StableLabel } from "@/components/ui/stable-label";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { person, primaryCta, whatsappCta } from "@/content/site";
import { ui } from "@/content/ui";
import { isLocale, locales, t } from "@/lib/i18n";
import { accentAt } from "@/lib/accents";

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

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((entry) => entry.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const links =
    study.links ??
    (study.link
      ? [{ href: study.link, label: study.linkLabel ?? t(ui.caseStudy.visit, locale) }]
      : []);

  const facts = [
    { label: t(ui.caseStudy.industry, locale), value: t(study.industry, locale) },
    { label: t(ui.caseStudy.role, locale), value: t(study.role, locale) },
    { label: t(ui.caseStudy.duration, locale), value: t(study.duration, locale) },
    { label: t(ui.caseStudy.client, locale), value: t(study.client, locale) },
  ];

  return (
    <article className="flex flex-col gap-4 sm:gap-6">
      <PageSheet>
      <header className="relative overflow-hidden px-6 pb-14 pt-10 sm:px-10 sm:pt-14">
        <div className="relative mx-auto max-w-4xl">
          <Link
            href={`/${locale}#work`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t(ui.caseStudy.back, locale)}
          </Link>

          <p className="label-mono mt-10 text-muted-foreground">
            / {t(study.discipline, locale)}
          </p>
          <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-balance md:text-6xl">
            {study.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-foreground/75 md:text-lg">
            {t(study.summary, locale)}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label-mono text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {links.length ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {links.map((entry) => (
                <li key={entry.href}>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium outline-none transition-colors hover:bg-foreground hover:text-background focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {entry.label}
                    <ArrowUpRight className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>
      </PageSheet>

      <PageSheet>
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
        <div className="space-y-14">
          {study.sections.map((section) => (
            <section key={t(section.heading, "en")}>
              <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                {t(section.heading, locale)}
              </h2>
              <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-foreground/75">
                {t(section.body, locale)}
              </p>
              {section.bullets ? (
                <ul className="mt-5 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={t(bullet, "en")}
                      className="flex gap-3 text-base leading-relaxed text-foreground/75"
                    >
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--coral)" }}
                      />
                      {t(bullet, locale)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {study.typefaces || study.palette ? (
          <section className="mt-16 grid gap-6 md:grid-cols-2">
            {study.typefaces ? (
              <div
                className="rule-left"
                style={{ "--rule": accentAt(0) } as React.CSSProperties}
              >
                <h3 className="label-mono text-muted-foreground">
                  {t(ui.caseStudy.typography, locale)}
                </h3>
                <ul className="mt-4 space-y-2">
                  {study.typefaces.map((face) => (
                    <li key={t(face, "en")} className="font-display text-xl tracking-tight">
                      {t(face, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {study.palette ? (
              <div
                className="rule-left"
                style={{ "--rule": accentAt(1) } as React.CSSProperties}
              >
                <h3 className="label-mono text-muted-foreground">
                  {t(ui.caseStudy.palette, locale)}
                </h3>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {study.palette.map((swatch) => (
                    <li key={swatch.hex + swatch.name}>
                      <span
                        className="block h-14 w-full rounded-none border border-border"
                        style={{ background: swatch.hex }}
                      />
                      <span className="mt-2 block text-xs font-medium">{swatch.name}</span>
                      <span className="block font-mono text-[11px] text-muted-foreground">
                        {swatch.hex}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
      </PageSheet>

      <PageSheet>
        <CaseStudyGallery items={study.gallery} />
      </PageSheet>

      <PageSheet>
      <section className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-mono text-muted-foreground">
              {t(ui.caseStudy.next, locale)}
            </p>
            <Link
              href={`/${locale}/work/${next.slug}`}
              className="font-display mt-1 inline-flex items-center gap-2 text-2xl font-medium tracking-tight outline-none hover:underline focus-visible:underline"
            >
              {next.title}
              <ArrowUpRight className="size-5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-none px-6 text-sm font-medium">
              <Link href={`/${locale}${primaryCta.href}`}>
                <StableLabel value={primaryCta.label} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-none border-border bg-card px-6 text-sm font-medium"
            >
              <a
                href={t(whatsappCta.href, locale)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StableLabel value={whatsappCta.label} />
              </a>
            </Button>
          </div>
        </div>
      </section>
      </PageSheet>
    </article>
  );
}
