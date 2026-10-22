/* eslint-disable @next/next/no-img-element -- print sheets load every image eagerly for the PDF render */
import { person } from "@/content/site";
import { t, type Locale } from "@/lib/i18n";

export const phone = `+${person.whatsapp.replace(/^62/, "62 ").replace(/(\d{3})(\d{4})(\d{4})$/, "$1 $2 $3")}`;

export const contacts = (locale: Locale) => [
  { label: person.email, href: `mailto:${person.email}` },
  { label: phone, href: `https://wa.me/${person.whatsapp}` },
  { label: "linkedin.com/in/isnul", href: "https://www.linkedin.com/in/isnul/" },
  { label: "isnul.site", href: `https://isnul.site/${locale}` },
];

/**
 * The hero card shared by the resume and the CV: portrait on a coral tile,
 * "Hello, I'm", the name, the role pill, a short intro, and the contact line.
 * The name is the first text in the document and the contacts are plain body
 * text, which is where ATS parsers look for both.
 */
export function DocHeader({ locale, intro }: { locale: Locale; intro: string }) {
  return (
    <header className="cv-hero">
      <div className="cv-art" aria-hidden="true">
        <span className="cv-art-mark" />
        <img src="/portrait-cutout.webp" alt="" loading="eager" />
      </div>
      <div>
        <p>
          <span className="cv-logo" aria-hidden="true" />
          <span className="cv-hello">{locale === "id" ? "Halo, saya" : "Hello, I'm"}</span>
        </p>
        <h1 className="cv-name">{person.name}</h1>
        <p>
          <span className="cv-role">{person.role}</span>
          <span className="cv-cursor" aria-hidden="true" />
        </p>
        <p className="cv-secondary">{person.secondaryRole}</p>
        <p className="cv-intro">{intro}</p>
        <p className="cv-contacts">
          {contacts(locale).map((contact, index) => (
            <span key={contact.href}>
              {index ? <span className="cv-sep"> | </span> : null}
              <a href={contact.href}>{contact.label}</a>
            </span>
          ))}
          <span className="cv-sep"> | </span>
          {t(person.location, locale)}
        </p>
      </div>
    </header>
  );
}
