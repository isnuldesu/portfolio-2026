import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

import { MotionProvider } from "@/components/site/motion-provider";
import { PageSheet } from "@/components/site/page-sheet";
import { RoleEntry } from "@/components/site/role-entry";
import { education, roles, toolkit } from "@/content/experience";
import { person } from "@/content/site";
import { ui } from "@/content/ui";
import { accentAt } from "@/lib/accents";
import { isLocale, locales, t } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experience">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: t(ui.experience.allHeading, locale),
    description: t(person.tagline, locale),
    alternates: {
      canonical: `/${locale}/experience`,
      languages: { id: "/id/experience", en: "/en/experience" },
    },
  };
}

export default async function ExperiencePage({
  params,
}: PageProps<"/[locale]/experience">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <article className="flex flex-col gap-4 sm:gap-6">
      <PageSheet>
        <Link
          href={`/${locale}#experience`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t(ui.caseStudy.back, locale)}
        </Link>

        <p className="label-mono mt-10 text-muted-foreground">
          {t(ui.experience.allEyebrow, locale)}
        </p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-6xl">
          {t(ui.experience.allHeading, locale)}
        </h1>
      </PageSheet>

      <MotionProvider>
        {roles.map((role, index) => (
          <PageSheet key={role.slug}>
            <RoleEntry role={role} accent={accentAt(index)} detail />
          </PageSheet>
        ))}
      </MotionProvider>

      <PageSheet>
        <div className="grid md:grid-cols-3">
          <div className="rule-left" style={{ "--rule": accentAt(1) } as React.CSSProperties}>
            <p className="label-mono text-muted-foreground">
              {t(ui.experience.software, locale)}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
              {toolkit.software.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rule-left" style={{ "--rule": accentAt(0) } as React.CSSProperties}>
            <p className="label-mono text-muted-foreground">
              {t(ui.experience.expertise, locale)}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
              {toolkit.expertise.map((item) => (
                <li key={t(item, "en")}>{t(item, locale)}</li>
              ))}
            </ul>
          </div>

          <div className="rule-left" style={{ "--rule": accentAt(3) } as React.CSSProperties}>
            <p className="label-mono text-muted-foreground">
              {t(ui.experience.education, locale)}
            </p>
            <p className="mt-3 text-sm text-foreground/80">
              {t(education.programme, locale)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{education.school}</p>
            <p className="label-mono mt-1 text-muted-foreground">{education.graduated}</p>
          </div>
        </div>
      </PageSheet>
    </article>
  );
}
