/**
 * Single source of truth for every visible string on the site.
 */

import type { L } from "@/lib/i18n";

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

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: "siGithub" | "siLinkedin" | "siX" | "siInstagram" | "siWhatsapp" | "mail";
};

export const instagram = {
  handle: "@_isnul",
  href: "https://www.instagram.com/_isnul/",
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: "WhatsApp",
    handle: person.whatsappLabel,
    href: `https://wa.me/${person.whatsapp}`,
    icon: "siWhatsapp",
  },
  {
    label: "Instagram",
    handle: instagram.handle,
    href: instagram.href,
    icon: "siInstagram",
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
  { label: { id: "Kerjaan", en: "Work" }, href: "/work" },
  { label: { id: "Pengalaman", en: "Experience" }, href: "/experience" },
  { label: { id: "Kontak", en: "Contact" }, href: "/#contact" },
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
