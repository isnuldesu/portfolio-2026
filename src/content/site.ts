/**
 * Single source of truth for every visible string on the site.
 * Project cards are derived from case-studies.ts so a card and its detail page
 * can never disagree about a title, a year, or a link.
 */

import { caseStudies } from "@/content/case-studies";
import type { L, Locale } from "@/lib/i18n";

export const person = {
  name: "Muhammad Isnul",
  handle: "isnuldesu",
  /** Job titles stay in English in both locales, the way people write them. */
  role: "Product Designer (UX/UI)",
  secondaryRole: "Creative Director & Designer",
  /** How the CV signs itself. */
  shortName: "MUH.ISNUL",
  email: "isnulmuhammad@gmail.com",
  whatsapp: "6282255845751",
  whatsappLabel: "0822 5584 5751",
  portrait: "/portrait.webp",
  location: {
    id: "Indonesia, kerja remote",
    en: "Indonesia, working remote",
  } as L,
  tagline: {
    id: "Design engineer yang menggarap software kasir, akuntansi, dan operasional sekolah, berikut brand dan sistem tipografinya.",
    en: "Design engineer working on point of sale, accounting, and school operations software, plus the brand and type systems around them.",
  } as L,
  intro: {
    id: "Enam tahun menggarap produk yang dipakai orang seharian penuh. Saya ambil satu permukaan dari hulu ke hilir: design system, brand, antarmuka, sampai front end yang benar-benar dikirim.",
    en: "Six years on products people sit inside all day. I take a surface end to end: design system, brand, interface, and the front end that ships it.",
  } as L,
} as const;

export const availability = {
  open: true,
  label: {
    id: "Terbuka untuk 2 project kuartal ini",
    en: "Open for 2 projects this quarter",
  } as L,
} as const;

export const hero = {
  subtext: {
    id: "Kasir, akuntansi, operasional sekolah. Design system, brand, dan front end yang mengirimnya.",
    en: "Point of sale, accounting, school operations. Design systems, brand, and the front end that ships them.",
  } as L,
  secondaryCta: {
    label: { id: "Lihat kerjaan", en: "View work" } as L,
    href: "#work",
  },
} as const;

export type Project = {
  slug: string;
  title: string;
  description: L;
  year: string;
  image: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = caseStudies
  .filter((study) => study.category === "product" || study.category === "strategy")
  .map((study) => ({
    slug: study.slug,
    title: study.title,
    description: study.teaser,
    year: study.year,
    image: study.cover,
    tags: study.tags,
    link: study.link,
    linkLabel: study.linkLabel,
  }));

export type BrandProject = {
  slug: string;
  title: string;
  discipline: L;
  description: L;
  year?: string;
  image: string;
  size: "large" | "small";
};

export const brandProjects: BrandProject[] = caseStudies
  .filter((study) => study.category === "brand")
  .map((study) => ({
    slug: study.slug,
    title: study.title,
    discipline: study.discipline,
    description: study.teaser,
    year: study.year,
    image: study.cover,
    size: study.gridSize,
  }));

export type Typeface = {
  slug: string;
  name: string;
  note: L;
  year?: string;
  image: string;
  /** The registered CSS family, so the rail can set each name in itself. */
  family: string;
};

export const typefaces: Typeface[] = [
  {
    slug: "birru-co",
    name: "Birru Sans",
    note: {
      id: "Sans display yang digambar khusus untuk identitas Birru.co. Dua belas gaya.",
      en: "Display sans drawn for the Birru.co identity. Twelve styles.",
    },
    year: "2024",
    image: "/work/type-birrusans.webp",
    family: "Birru Sans",
  },
  {
    slug: "abahchan",
    name: "Abahchan",
    note: {
      id: "Display bersudut tumpul, 74 karakter.",
      en: "Rounded display face, 74 glyphs.",
    },
    year: "2020",
    image: "/work/type-abahchan.webp",
    family: "Abahchan",
  },
  {
    slug: "beembo",
    name: "BeemBO",
    note: {
      id: "Latin lengkap sampai diakritik, 197 karakter.",
      en: "Full Latin with diacritics, 197 glyphs.",
    },
    year: "2020",
    image: "/work/type-beembo.webp",
    family: "BeemBO",
  },
  {
    slug: "jablo",
    name: "Jablo",
    note: { id: "Display rapat, 100 karakter.", en: "Condensed display, 100 glyphs." },
    year: "2020",
    image: "/work/type-jablo.webp",
    family: "Jablo",
  },
  {
    slug: "geoleo",
    name: "Geoleo",
    note: { id: "Geometris, satu berat Bold.", en: "Geometric, one Bold weight." },
    image: "/work/type-geoleo.webp",
    family: "Geoleo",
  },
];

export type Highlight = { title: L; description: L };

export const highlights: Highlight[] = [
  {
    title: { id: "Cara kerja", en: "How I work" },
    description: {
      id: "Langsung ke pemilik atau product lead-nya. Rilis tiap minggu, bukan enam minggu desain dulu baru ada yang jalan.",
      en: "Direct with the owner or the product lead. Weekly shipping, no six week design phase before anything runs.",
    },
  },
  {
    title: { id: "Sekarang", en: "Currently" },
    description: {
      id: "Product design di Luna POS dan Laba.id, dua SaaS yang dipakai merchant dan UMKM Indonesia.",
      en: "Product design at Luna POS and Laba.id, two SaaS products serving Indonesian merchants and MSMEs.",
    },
  },
  {
    title: { id: "Ketersediaan", en: "Availability" },
    description: {
      id: "Terbuka untuk 2 project kuartal ini. Remote, jam kerja Asia Tenggara dan Eropa sama-sama jalan.",
      en: "Open for 2 projects this quarter. Remote, comfortable across SEA and EU hours.",
    },
  },
];

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: "siGithub" | "siLinkedin" | "siX" | "siInstagram" | "siWhatsapp" | "mail";
};

export const socialLinks: SocialLink[] = [
  {
    label: "WhatsApp",
    handle: person.whatsappLabel,
    href: `https://wa.me/${person.whatsapp}`,
    icon: "siWhatsapp",
  },
  {
    label: "LinkedIn",
    handle: "in/isnul",
    href: "https://www.linkedin.com/in/isnul/",
    icon: "siLinkedin",
  },
  {
    label: "GitHub",
    handle: "@isnuldesu",
    href: "https://github.com/isnuldesu",
    icon: "siGithub",
  },
  {
    label: "Email",
    handle: person.email,
    href: `mailto:${person.email}`,
    icon: "mail",
  },
];

export const nav: { label: L; href: string }[] = [
  { label: { id: "Kerjaan", en: "Work" }, href: "#work" },
  { label: { id: "Brand", en: "Brand" }, href: "#brand" },
  { label: { id: "Font", en: "Type" }, href: "#type" },
  { label: { id: "Pengalaman", en: "Experience" }, href: "#experience" },
  { label: { id: "Tentang", en: "About" }, href: "#about" },
];

/** One label per intent. Used in nav, hero, about, and the contact form alike. */
export const primaryCta = {
  label: { id: "Mulai project", en: "Start a project" } as L,
  href: "#contact",
} as const;

export const whatsappCta = {
  label: { id: "Chat WhatsApp", en: "Chat on WhatsApp" } as L,
  href: {
    id: `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(
      "Halo Isnul, saya lihat portofolio kamu dan ada project yang mau saya bahas.",
    )}`,
    en: `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(
      "Hi Isnul, I saw your portfolio and I have a project in mind.",
    )}`,
  } as L,
} as const;

export const contact = {
  heading: {
    id: "Ada yang perlu dibangun?",
    en: "Have something that needs building?",
  } as L,
  body: {
    id: "Kirim satu paragraf soal usahanya dan macetnya di mana. Yang balik ke kamu scope, timeline, dan harga, bukan ajakan meeting kenalan.",
    en: "Send one paragraph about the business and the bottleneck. You get a scope, a timeline, and a price back, not a discovery call.",
  } as L,
} as const;

/** Floating tags around the statement, mirroring the reference composition. */
export const disciplines: L[] = [
  { id: "Product Design", en: "Product Design" },
  { id: "UX Design", en: "UX Design" },
  { id: "Riset Pengguna", en: "User Research" },
  { id: "Design System", en: "Design Systems" },
  { id: "Identitas Brand", en: "Brand Identity" },
  { id: "Desain Font", en: "Type Design" },
];

export const statement = {
  eyebrow: { id: "Halo!", en: "Hallo!" } as L,
  /** Two plain lines, then two rows of colour blocks. Four lines in total,
      broken by hand so the sentence lands the same way in both languages. */
  leadLines: {
    id: [
      "Kerjanya menggabungkan strategi yang jelas,",
      "garapan yang teliti, dan empati ke pengguna",
    ],
    en: [
      "My focus is blending clear strategy,",
      "careful craft, and real user empathy",
    ],
  } as Record<Locale, string[]>,
  blockRows: {
    id: [["supaya usaha kecil", "punya software"], ["yang benar-benar bisa dipakai."]],
    en: [["to build software", "small businesses"], ["can actually run on."]],
  } as Record<Locale, string[][]>,
} as const;
