import { caseStudies } from "@/content/case-studies";
import { person } from "@/content/site";
import { t, type Locale } from "@/lib/i18n";

import { DocHeader } from "./doc-header";
import { DocSection, lbl, period, rolesByDate } from "./doc-parts";
import { DocEducation, DocFoot, DocLanguages, DocSkills } from "./doc-skills";

const SELECTED = ["luna-pos", "laba-id", "tokoclippers", "birru-co"];

/**
 * One A4 page: hero card, then the ink panel with every role newest first on
 * the left and projects, skills, tools, education, and languages on the
 * right. The left column comes first in the document, so a parser reads the
 * experience in full before the sidebar.
 */
export function ResumeDoc({ locale }: { locale: Locale }) {
  const work = SELECTED.map((slug) => caseStudies.find((s) => s.slug === slug)).filter(Boolean) as typeof caseStudies;
  return (
    <article className="cv">
      <DocHeader locale={locale} intro={t(person.intro, locale)} />

      <div className="cv-panel">
        <div className="cv-cols">
          <div className="cv-col">
            <DocSection label={lbl("experience", locale)}>
              <ol className="cv-list">
                {rolesByDate.map((role) => (
                  <li key={role.slug} className="cv-item">
                    <p className="cv-date">{period(role.period)}</p>
                    <p className="cv-title">
                      {role.title}, <span className="cv-org">{role.company}</span>
                    </p>
                    <p className="cv-text">{t(role.summary, locale)}</p>
                  </li>
                ))}
              </ol>
            </DocSection>
            <DocEducation locale={locale} />
          </div>

          <div className="cv-col">
            <DocSection label={lbl("selected", locale)}>
              <ul className="cv-list">
                {work.map((study) => (
                  <li key={study.slug} className="cv-item">
                    <p className="cv-title">
                      {study.title}, <span className="cv-org">{t(study.discipline, locale)}, {period(study.year)}</span>
                    </p>
                    <p className="cv-text">{t(study.results?.[0] ?? study.teaser, locale)}</p>
                  </li>
                ))}
              </ul>
            </DocSection>
            <DocSkills locale={locale} compact />
            <DocLanguages locale={locale} />
          </div>
        </div>
      </div>

      <DocFoot locale={locale} />
    </article>
  );
}
