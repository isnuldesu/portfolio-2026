import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageSheet } from "@/components/site/page-sheet";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { person } from "@/content/site";
import { ui } from "@/content/ui";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: t(ui.work.indexHeading, locale),
    description: t(person.tagline, locale),
    alternates: {
      canonical: `/${locale}/work`,
      languages: { id: "/id/work", en: "/en/work" },
    },
  };
}

const GROUPS: { key: CaseStudy["category"]; label: keyof typeof ui.work }[] = [
  { key: "product", label: "categoryProduct" },
  { key: "strategy", label: "categoryStrategy" },
  { key: "brand", label: "categoryBrand" },
  { key: "type", label: "categoryType" },
];

function Card({ study, locale }: { study: CaseStudy; locale: Locale }) {
  return (
    <article className="group border-b-2 border-border sm:odd:border-r-2">
      <Link
        href={`/${locale}/work/${study.slug}`}
        className="block outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={study.cover}
            alt={`${study.title} title card`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 564px"
            quality={90}
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </div>

        <div className="p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-lg font-medium tracking-tight">
              {study.title}
            </h3>
            <span className="label-mono shrink-0 text-muted-foreground">{study.year}</span>
          </div>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
            {t(study.teaser, locale)}
          </p>
          <p className="label-mono mt-4 text-muted-foreground">
            {t(study.discipline, locale)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default async function WorkIndex({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <article className="flex flex-col gap-4 sm:gap-6">
      <PageSheet>
        <p className="label-mono text-muted-foreground">
          {t(ui.work.indexEyebrow, locale)}
        </p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-6xl">
          {t(ui.work.indexHeading, locale)}
        </h1>

        {/* Anchors rather than a filter widget: every group stays reachable
            without JavaScript, and a link to one can be shared. */}
        <nav className="mt-10 flex flex-wrap border-t-2 border-border">
          {GROUPS.map((group) => (
            <a
              key={group.key}
              href={`#${group.key}`}
              className="label-mono border-b-2 border-border py-3 pr-6 text-foreground underline-offset-4 hover:underline"
            >
              {t(ui.work[group.label], locale)}{" "}
              <span className="text-muted-foreground">
                {caseStudies.filter((s) => s.category === group.key).length}
              </span>
            </a>
          ))}
        </nav>
      </PageSheet>

      {GROUPS.map((group) => {
        const studies = caseStudies.filter((study) => study.category === group.key);
        if (!studies.length) return null;

        return (
          <PageSheet key={group.key}>
            <section id={group.key} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
                {t(ui.work[group.label], locale)}
              </h2>
              <div className="mt-10 grid border-t-2 border-border sm:grid-cols-2">
                {studies.map((study) => (
                  <Card key={study.slug} study={study} locale={locale} />
                ))}
              </div>
            </section>
          </PageSheet>
        );
      })}
    </article>
  );
}
