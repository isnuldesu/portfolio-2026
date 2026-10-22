import { roles, type Role } from "@/content/experience";
import type { Locale } from "@/lib/i18n";

export const docLabels = {
  summary: { id: "Ringkasan", en: "Summary" },
  experience: { id: "Pengalaman Kerja", en: "Work Experience" },
  selected: { id: "Project Pilihan", en: "Selected Projects" },
  projects: { id: "Project", en: "Projects" },
  skills: { id: "Keahlian", en: "Skills" },
  core: { id: "Inti", en: "Core" },
  tools: { id: "Software", en: "Tools" },
  education: { id: "Pendidikan", en: "Education" },
  languages: { id: "Bahasa", en: "Languages" },
  languageList: { id: "Indonesia (bahasa ibu), Inggris (profesional)", en: "Indonesian (native), English (professional)" },
  products: { id: "Produk", en: "Products" },
  portfolio: { id: "Portofolio lengkap", en: "Full portfolio" },
  role: { id: "Peran", en: "Role" },
  impact: { id: "Dampak", en: "Impact" },
  live: { id: "Link", en: "Live" },
  details: { id: "Studi kasus", en: "Case study" },
  moreWork: { id: "Semua project dan detailnya ada di", en: "Every project, in full, at" },
} as const;

export const lbl = (key: keyof typeof docLabels, locale: Locale) => docLabels[key][locale];

/**
 * Skills worded the way recruiters and ATS keyword searches phrase them.
 * Every line is backed by a case study on the site.
 */
export const coreSkills = {
  en: [
    "Product design (UX/UI)",
    "Design systems",
    "Interaction design and prototyping",
    "Web and mobile app design",
    "Brand identity",
    "Type design",
    "Illustration",
    "Creative direction",
  ],
  id: [
    "Product design (UX/UI)",
    "Design system",
    "Interaction design dan prototyping",
    "Desain aplikasi web dan mobile",
    "Identitas brand",
    "Desain huruf",
    "Ilustrasi",
    "Creative direction",
  ],
} as const;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const toIndex = (part: string) => {
  if (/present/i.test(part)) return Infinity;
  const [month, year] = part.trim().split(" ");
  return Number(year) * 12 + MONTHS.indexOf(month);
};

/** Reverse chronological, the order ATS parsers and recruiters expect: current role first, then by end date. */
export const rolesByDate: Role[] = [...roles].sort((a, b) => {
  const [aStart, aEnd] = a.period.split(" - ");
  const [bStart, bEnd] = b.period.split(" - ");
  return toIndex(bEnd) - toIndex(aEnd) || toIndex(bStart) - toIndex(aStart);
});

/** "Jan 2021 - Present" with a proper en dash. */
export const period = (value: string) => value.replace(" - ", " – ");

/** A section: white pill heading on the ink panel. A real h2 so parsers find it. */
export function DocSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="cv-h">{label}</h2>
      {children}
    </section>
  );
}
