import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { ProjectVisual } from "@/components/site/project-visual";
import { caseStudies, roleGroups, type CaseStudy, type RoleGroup } from "@/content/case-studies";
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

// Grouped by the role the work was done in, not by medium.
const ROLE_LABEL: Record<RoleGroup, keyof typeof ui.work> = {
  product: "roleProduct",
  web: "roleWeb",
  brand: "roleBrand",
  type: "roleType",
  marketing: "roleMarketing",
};
const GROUPS = roleGroups.map((key) => ({ key, label: ROLE_LABEL[key] }));

/**
 * One project, told the way a case study opens: the preview carries the eye,
 * the copy beside it says who, when, what was at stake, and the one number
 * worth remembering. The whole card is a single link.
 */
function ProjectCard({
  study,
  locale,
  index,
}: {
  study: CaseStudy;
  locale: Locale;
  index: number;
}) {
  const result = study.results?.[0];
  const flip = index % 2 === 1;

  return (
    <article className="group relative grid items-center gap-8 py-12 md:grid-cols-12 md:gap-12 md:py-16">
      <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <ProjectVisual
          cover={study.cover}
          screen={study.screen}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
        />
      </div>

      <div className="md:col-span-5">
        <div className="flex items-center gap-3">
          <span className="sq-tile text-sm font-semibold" aria-hidden="true">
            {study.title.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">{t(study.client, locale)}</p>
            <p className="sq-mono text-muted-foreground">{study.year}</p>
          </div>
        </div>

        <p className="mt-8 font-medium">
          {study.title}
          <span className="text-muted-foreground"> · {t(study.role, locale)}</span>
        </p>
        <h3 className="sq-h2 mt-2 text-balance">
          <Link
            href={`/${locale}/work/${study.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline"
          >
            {t(study.teaser, locale)}
          </Link>
        </h3>
        <p className="mt-3 text-muted-foreground">{t(study.industry, locale)}</p>

        {result ? (
          <div className="mt-6 border-t border-border pt-5">
            <p className="text-base font-medium">{t(result, locale)}</p>
          </div>
        ) : null}

        <span className="mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-secondary px-4 text-sm font-medium transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {t(ui.caseStudy.viewCase, locale)}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export default async function WorkIndex({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="theme-square">
      <div className="mx-auto w-full max-w-[76rem] px-5 pb-24 pt-16 sm:px-8 md:pt-24">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="sq-mono text-muted-foreground">{t(ui.work.indexEyebrow, locale)}</p>
            <h1 className="sq-h1 mt-3">{t(ui.work.indexHeading, locale)}</h1>
            <p className="sq-body mt-4 max-w-[52ch]">{t(person.tagline, locale)}</p>
          </div>

          {/* Anchors, not a filter: every group stays reachable without
              JavaScript, and a link to one can be shared. */}
          <nav className="flex flex-wrap gap-2 md:col-span-4 md:justify-end">
            {GROUPS.map((group) => {
              const count = caseStudies.filter((s) => s.roleGroup === group.key).length;
              if (!count) return null;
              return (
                <a
                  key={group.key}
                  href={`#${group.key}`}
                  className="press inline-flex h-10 items-center gap-2 rounded-full bg-secondary px-4 text-sm font-medium outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring"
                >
                  {t(ui.work[group.label], locale)}
                  <span className="sq-mono opacity-60">{count}</span>
                </a>
              );
            })}
          </nav>
        </header>

        {GROUPS.map((group) => {
          const studies = caseStudies.filter((study) => study.roleGroup === group.key);
          if (!studies.length) return null;

          return (
            <section key={group.key} id={group.key} className="mt-20 scroll-mt-24">
              <div className="flex items-baseline justify-between border-b border-border pb-4">
                <h2 className="sq-h3">{t(ui.work[group.label], locale)}</h2>
                <span className="sq-mono text-muted-foreground">
                  {String(studies.length).padStart(2, "0")}
                </span>
              </div>
              <div className="divide-y divide-border">
                {studies.map((study, index) => (
                  <ProjectCard key={study.slug} study={study} locale={locale} index={index} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
