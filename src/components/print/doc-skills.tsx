/* eslint-disable @next/next/no-img-element -- print sheets load every image eagerly for the PDF render */
import { education, toolkit } from "@/content/experience";
import { t, type Locale } from "@/lib/i18n";

import { contacts } from "./doc-header";
import { DocSection, coreSkills, lbl } from "./doc-parts";

/**
 * Skills as stickers and tools as chips.
 * `compact` (the one-page resume) leaves out the practice line.
 */
export function DocSkills({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return (
    <>
      <DocSection label={lbl("skills", locale)}>
        <ul className="cv-stickers">
          {coreSkills[locale].map((skill) => (
            <li key={skill} className="cv-sticker">
              {skill}
            </li>
          ))}
        </ul>
        {compact ? null : (
          <p className="cv-text cv-practice">{toolkit.expertise.map((item) => t(item, locale)).join(", ")}</p>
        )}
      </DocSection>

      <DocSection label={lbl("tools", locale)}>
        <ul className="cv-tools">
          {toolkit.software.map((tool) => (
            <li key={tool} className="cv-tool">
              {tool}
            </li>
          ))}
        </ul>
      </DocSection>
    </>
  );
}

/** Education. */
export function DocEducation({ locale }: { locale: Locale }) {
  return (
    <>
      <DocSection label={lbl("education", locale)}>
        <ul className="cv-list">
          <li className="cv-item">
            <p className="cv-date">{education.graduated}</p>
            <p className="cv-title">{education.school}</p>
            <p className="cv-org">{t(education.programme, locale)}</p>
          </li>
        </ul>
      </DocSection>

    </>
  );
}

/** Languages spoken. */
export function DocLanguages({ locale }: { locale: Locale }) {
  return (
    <DocSection label={lbl("languages", locale)}>
      <p className="cv-text">{lbl("languageList", locale)}</p>
    </DocSection>
  );
}

/** The closing strip: contact chip and the mascot saying thanks. */
export function DocFoot({ locale }: { locale: Locale }) {
  const [email, whatsapp, , site] = contacts(locale);
  return (
    <footer className="cv-foot">
      <div className="cv-foot-contact">
        <p className="cv-foot-chip">{locale === "id" ? "Hubungi saya" : "Contact me"}</p>
        <p>
          <a href={whatsapp.href}>{whatsapp.label}</a>
          <span className="cv-sep"> | </span>
          <a href={email.href}>{email.label}</a>
          <span className="cv-sep"> | </span>
          <a href={`${site.href}/work`}>
            {site.label}/{locale}/work
          </a>
        </p>
      </div>
      <div className="cv-foot-thanks">
        <p>{locale === "id" ? "Terima kasih!" : "Thank you!"}</p>
        <img src="/mascot/v3/pose-laugh.webp" alt="" aria-hidden="true" loading="eager" />
      </div>
    </footer>
  );
}
