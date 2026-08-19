import type { L } from "@/lib/i18n";

/** Transcribed from the 2026 CV. */
export type Role = {
  title: string;
  company: string;
  location: L;
  period: string;
  arrangement: L;
  points: L[];
};

export const roles: Role[] = [
  {
    title: "Product Designer",
    company: "IMPACTO, for LUNAPOS",
    location: { id: "Jakarta Selatan, Indonesia", en: "South Jakarta, Indonesia" },
    period: "Jan 2021 - Present",
    arrangement: { id: "Penuh waktu, onsite", en: "Fulltime, onsite" },
    points: [
      {
        id: "Merancang dan merilis aplikasi web dan mobile: Laba Bisnis, Laba Saku, Luna POS, TokoLUNA, LUNA Owner, LUNA KiosK, LUNA KDS, LUNA Lite, dan LUNA One.",
        en: "Designed and launched web and mobile apps: Laba Bisnis, Laba Saku, Luna POS, TokoLUNA, LUNA Owner, LUNA KiosK, LUNA KDS, LUNA Lite, and LUNA One.",
      },
      {
        id: "Membangun LUNITE, design system LUNAPOS, supaya alur kerja UI/UX tidak diulang dari nol tiap produk.",
        en: "Built LUNITE, the LUNAPOS design system, so UI/UX work stopped restarting from scratch on every product.",
      },
      {
        id: "Ikut menggarap sisi branding lewat desain logo untuk berbagai aplikasinya.",
        en: "Contributed to branding through logo design across the apps.",
      },
    ],
  },
  {
    title: "Brand & Graphic Designer",
    company: "Birru.co",
    location: { id: "Lampung, Indonesia", en: "Lampung, Indonesia" },
    period: "Dec 2023 - Dec 2025",
    arrangement: { id: "Freelance, remote", en: "Freelance, remote" },
    points: [
      {
        id: "Memimpin rebranding Birru.co, rumah terapi wicara untuk anak.",
        en: "Led the rebranding of Birru.co, a speech therapy house for children.",
      },
      {
        id: "Menyusun identitas baru: redesain logo, tagline, palet warna, aset pola, sampai brand guidelines yang dipakai seterusnya.",
        en: "Built the new identity: logo redesigns, tagline, colour palette, pattern assets, and the brand guidelines the team works from.",
      },
    ],
  },
  {
    title: "Web Designer",
    company: "Adonai MediaTech Solutions",
    location: { id: "Punggol, Singapura", en: "Punggol, Singapore" },
    period: "Dec 2022 - Mar 2024",
    arrangement: { id: "Freelance, remote", en: "Freelance, remote" },
    points: [
      {
        id: "Membuat landing page untuk Ascend Eye Clinic di Singapura.",
        en: "Built the landing page for Ascend Eye Clinic in Singapore.",
      },
      {
        id: "Merombak landing page The Singapore Scout Association.",
        en: "Revamped The Singapore Scout Association's landing page.",
      },
    ],
  },
  {
    title: "Brand Designer",
    company: "Backslash Creative Nusantara",
    location: { id: "Jakarta Selatan, Indonesia", en: "South Jakarta, Indonesia" },
    period: "Jan 2022 - Apr 2022",
    arrangement: { id: "Freelance, remote", en: "Freelance, remote" },
    points: [
      {
        id: "Membuat logo untuk Backslash sendiri dan untuk Vjatre, brand skincare baru.",
        en: "Made the logo for Backslash itself and for Vjatre, a new skincare brand.",
      },
      {
        id: "Untuk Vjatre: logo, brand guidelines, tagline, template media sosial, dan bantuan desain kemasan.",
        en: "For Vjatre: logo, brand guidelines, tagline, social media templates, and packaging design support.",
      },
    ],
  },
  {
    title: "Graphic Designer & Illustrator",
    company: "Nusalab Studios",
    location: { id: "Tangerang, Indonesia", en: "Tangerang, Indonesia" },
    period: "Nov 2019 - Jun 2024",
    arrangement: {
      id: "Penuh waktu dan freelance, remote",
      en: "Fulltime and freelance, remote",
    },
    points: [
      {
        id: "Merancang logo Nusalab, membuat template media sosial, dan merebrand logo perusahaannya.",
        en: "Designed Nusalab's logo, built social media templates, and rebranded the company mark.",
      },
      {
        id: "Menggarap katalog daftar harga Altravel Solutions, membantu rebranding CV Karya Multi Bersama, dan mengisi platform microstock.",
        en: "Produced the Altravel Solutions price catalogue, supported the CV Karya Multi Bersama rebrand, and contributed to microstock platforms.",
      },
    ],
  },
];

export const education = {
  programme: {
    id: "Teknik Komputer dan Jaringan",
    en: "Computer and Networking Engineering",
  } as L,
  school: "SMK Negeri 2 Tarakan",
  graduated: "2018",
};

export const toolkit = {
  software: ["Figma & Figjam", "Adobe Creative Suite", "Affinity", "Blender"],
  expertise: [
    { id: "Menggambar, tradisional dan digital", en: "Drawing, traditional and digital" },
    { id: "Prototyping lanjutan di Figma", en: "Advanced prototyping in Figma" },
    { id: "Membangun design system", en: "Design system builder" },
    { id: "Desain branding", en: "Branding design" },
    { id: "Product design ops", en: "Product design ops" },
  ] as L[],
};
