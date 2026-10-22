import { caseStudies } from "@/content/case-studies";
import { person } from "@/content/site";
import { t, type L, type Locale } from "@/lib/i18n";

import { DocHeader } from "./doc-header";
import { DocSection, lbl, period, rolesByDate } from "./doc-parts";
import { DocEducation, DocFoot, DocLanguages, DocSkills } from "./doc-skills";

/**
 * Projects worth a recruiter's time, in the order they should read them. The
 * impact line comes from the case study's own results; where a case study has
 * no measured result yet, the line below says what the work did, from the
 * case study text, and never invents a number.
 */
const SELECTED: { slug: string; impact?: L }[] = [
  { slug: "luna-pos" },
  { slug: "laba-id" },
  { slug: "laba-saku" },
  {
    slug: "tokoclippers",
    impact: {
      id: "Satu produk untuk dua pihak yang kebutuhannya berlawanan, creator dan clipper, di atas satu design system.",
      en: "One product for two sides with opposite needs, creators and clippers, on a single design system.",
    },
  },
  { slug: "samase-sports-club" },
  {
    slug: "singapore-scout-association",
    impact: {
      id: "Satu halaman yang melayani orang tua, relawan, dan donatur sekaligus, dengan jalur donasi, relawan, dan Scout Shop di depan.",
      en: "One page serving parents, volunteers, and donors at once, with donation, volunteering, and the Scout Shop up front.",
    },
  },
  {
    slug: "andalusclass",
    impact: {
      id: "Absensi dan aktivitas harian sekolah tetap berjalan online selama kampus tutup karena Covid-19.",
      en: "Kept the school's attendance and daily activity running online while the campus was closed for Covid-19.",
    },
  },
  { slug: "birru-co" },
];

/**
 * The full record across pages. Same hero and ink panel as the resume, but
 * experience and projects run in one column (a page break never splits two
 * columns out of order); only the short skills block at the end sits in two.
 */
export function CvDoc({ locale }: { locale: Locale }) {
  return (
    <article className="cv cv-flow">
      <DocHeader locale={locale} intro={`${t(person.intro, locale)} ${t(person.tagline, locale)}`} />

      <div className="cv-panel">
        <div className="cv-col">
          <DocSection label={lbl("experience", locale)}>
            <ol className="cv-list">
              {rolesByDate.map((role) => (
                <li key={role.slug} className="cv-item">
                  <p className="cv-date">{period(role.period)}</p>
                  <p className="cv-title">
                    {role.title}, <span className="cv-org">{role.company}</span>
                  </p>
                  <p className="cv-org">
                    {t(role.location, locale)} | {t(role.arrangement, locale)}
                  </p>
                  <p className="cv-text">{t(role.summary, locale)}</p>
                  <ul className="cv-bullets">
                    {role.points.map((point) => (
                      <li key={t(point, "en")}>{t(point, locale)}</li>
                    ))}
                  </ul>
                  {role.brands?.length ? (
                    <p className="cv-text">
                      {lbl("products", locale)}: {role.brands.join(", ")}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </DocSection>

          <DocSection label={lbl("selected", locale)}>
            <ul className="cv-list">
              {SELECTED.map(({ slug, impact }) => {
                const study = caseStudies.find((entry) => entry.slug === slug);
                if (!study) return null;
                const result = impact ?? study.results?.[0];
                const live = study.link;
                return (
                  <li key={slug} className="cv-item">
                    <p className="cv-title">
                      {study.title}, <span className="cv-org">{t(study.discipline, locale)}, {period(study.year)}</span>
                    </p>
                    <p className="cv-text">{t(study.teaser, locale)}</p>
                    <p className="cv-text">
                      <span className="cv-key">{lbl("role", locale)}:</span> {t(study.role, locale)}, {t(study.client, locale)}
                    </p>
                    {result ? (
                      <p className="cv-text">
                        <span className="cv-key">{lbl("impact", locale)}:</span> {t(result, locale)}
                      </p>
                    ) : null}
                    <p className="cv-text cv-links">
                      {live ? (
                        <>
                          <span className="cv-key">{lbl("live", locale)}:</span>{" "}
                          <a href={live}>{live.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a>
                          <span className="cv-sep"> | </span>
                        </>
                      ) : null}
                      <span className="cv-key">{lbl("details", locale)}:</span>{" "}
                      <a href={`https://isnul.site/${locale}/work/${slug}`}>isnul.site/{locale}/work/{slug}</a>
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="cv-text cv-more">
              {lbl("moreWork", locale)} <a href={`https://isnul.site/${locale}/work`}>isnul.site/{locale}/work</a>
            </p>
          </DocSection>

          <div className="cv-cols">
            <div className="cv-col">
              <DocSkills locale={locale} />
            </div>
            <div className="cv-col">
              <DocEducation locale={locale} />
              <DocLanguages locale={locale} />
            </div>
          </div>
        </div>
      </div>

      <DocFoot locale={locale} />
    </article>
  );
}
