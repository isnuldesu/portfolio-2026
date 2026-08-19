import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { CaseStudyGallery } from "@/components/site/case-study-gallery";
import { Button } from "@/components/ui/button";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { person, primaryCta, whatsappCta } from "@/content/site";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: `${study.title}, ${study.discipline.toLowerCase()}`,
    description: study.teaser,
    openGraph: {
      title: `${study.title} - ${person.name}`,
      description: study.teaser,
      images: [{ url: study.cover }],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((entry) => entry.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const facts = [
    { label: "Role", value: study.role },
    { label: "Client", value: study.client },
    { label: "Year", value: study.year },
    { label: "Discipline", value: study.discipline },
  ];

  return (
    <article className="px-3 pb-24 pt-3 sm:px-4 sm:pt-4">
      <header className="surface relative overflow-hidden rounded-[28px] px-6 pb-14 pt-10 sm:rounded-[36px] sm:px-10 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{
            background:
              "radial-gradient(80% 100% at 50% 0%, var(--lime-soft) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
            All work
          </Link>

          <p className="font-serif-display mt-10 text-base text-foreground/50">
            / {study.discipline}
          </p>
          <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-balance md:text-6xl">
            {study.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-foreground/75 md:text-lg">
            {study.summary}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {study.link ? (
            <a
              href={study.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium outline-none transition-shadow hover:shadow-[0_10px_28px_rgba(23,24,28,0.1)] focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {study.linkLabel ?? "Visit the live site"}
              <ArrowUpRight className="size-4" strokeWidth={2} />
            </a>
          ) : null}
        </div>
      </header>

      <div className="mx-auto mt-16 max-w-4xl px-3 sm:px-6">
        <div className="space-y-14">
          {study.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                {section.heading}
              </h2>
              <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-foreground/75">
                {section.body}
              </p>
              {section.bullets ? (
                <ul className="mt-5 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-base leading-relaxed text-foreground/75"
                    >
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--lime-ink)" }}
                      />
                      {bullet}
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
              <div className="surface rounded-3xl p-7">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Typography
                </h3>
                <ul className="mt-4 space-y-2">
                  {study.typefaces.map((face) => (
                    <li key={face} className="font-display text-xl tracking-tight">
                      {face}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {study.palette ? (
              <div className="surface rounded-3xl p-7">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Palette
                </h3>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {study.palette.map((swatch) => (
                    <li key={swatch.hex + swatch.name}>
                      <span
                        className="block h-14 w-full rounded-xl border border-border"
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

      <CaseStudyGallery items={study.gallery} />

      <section className="mx-auto mt-8 max-w-4xl px-3 sm:px-6">
        <div className="surface flex flex-col gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Next project</p>
            <Link
              href={`/work/${next.slug}`}
              className="font-display mt-1 inline-flex items-center gap-2 text-2xl font-medium tracking-tight outline-none hover:underline focus-visible:underline"
            >
              {next.title}
              <ArrowUpRight className="size-5" strokeWidth={2} />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-full px-6 text-sm font-medium">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-border bg-card px-6 text-sm font-medium"
            >
              <a href={whatsappCta.href} target="_blank" rel="noopener noreferrer">
                {whatsappCta.label}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
