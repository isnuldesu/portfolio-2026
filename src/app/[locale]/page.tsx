import { notFound } from "next/navigation";

import { Contact } from "@/components/site/contact";
import { Experience } from "@/components/site/experience";
import { HomeShowcase, type ShowcaseItem } from "@/components/site/home-showcase";
import { IntroLoader } from "@/components/site/intro-loader";
import { MotionProvider } from "@/components/site/motion-provider";
import { PageSheet } from "@/components/site/page-sheet";
import { SiteFooter } from "@/components/site/site-footer";
import { Testimonials } from "@/components/site/testimonials";
import { caseStudies } from "@/content/case-studies";
import { person } from "@/content/site";
import { ui } from "@/content/ui";
import { isLocale, t } from "@/lib/i18n";

/**
 * Home: the name intro, a short introduction, then every project on one pinned
 * stage (Huy Phan's structure, Square's components, the CV's colours). The
 * brand, type, and product grids the old home carried are all inside the
 * stage now, so they are not repeated below it.
 */
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const items: ShowcaseItem[] = caseStudies.map((study) => ({
    slug: study.slug,
    title: study.title,
    cover: study.cover,
    screen: study.screen,
    role: t(study.role, locale),
    year: study.year,
    discipline: t(study.discipline, locale),
    teaser: t(study.teaser, locale),
    result: study.results?.[0] ? t(study.results[0], locale) : undefined,
  }));

  return (
    <>
      <IntroLoader name={person.shortName} />

      <div className="flex flex-1 flex-col">
        <section className="mx-auto grid w-full max-w-[90rem] gap-6 px-5 pb-10 pt-14 sm:px-8 md:grid-cols-12 md:pb-16 md:pt-20">
          <div className="md:col-span-3">
            <p className="label-mono text-muted-foreground">{person.role}</p>
          </div>
          <h1 className="font-display text-balance text-[clamp(2rem,4.2vw,4rem)] font-bold leading-[1.05] md:col-span-9">
            {t(person.intro, locale)}
          </h1>
        </section>

        <HomeShowcase
          items={items}
          locale={locale}
          labels={{
            role: t(ui.caseStudy.role, locale),
            year: t(ui.caseStudy.duration, locale),
            result: t(ui.caseStudy.impact, locale),
            view: t(ui.caseStudy.viewCase, locale),
            selected: t(ui.work.eyebrow, locale),
          }}
        />

        <div className="flex flex-col">
          <MotionProvider>
            <PageSheet className="border-t border-border">
              <Experience />
            </PageSheet>
            <Testimonials />
            <PageSheet className="border-t border-border">
              <Contact />
            </PageSheet>
          </MotionProvider>
          <PageSheet className="border-t border-border !py-10">
            <SiteFooter />
          </PageSheet>
        </div>
      </div>
    </>
  );
}
