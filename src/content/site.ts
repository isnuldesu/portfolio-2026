/**
 * Single source of truth for every visible string on the site.
 * Project cards are derived from case-studies.ts so a card and its detail page
 * can never disagree about a title, a year, or a link.
 */

import { caseStudies } from "@/content/case-studies";

export const person = {
  name: "Muhammad Isnul",
  handle: "isnuldesu",
  role: "Design Engineer",
  secondaryRole: "Product Designer",
  location: "Indonesia, working remote",
  email: "isnulmuhammad@gmail.com",
  whatsapp: "6282255845751",
  whatsappLabel: "0822 5584 5751",
  portrait: "/portrait.webp",
  tagline:
    "Design engineer working on point of sale, accounting, and school operations software, plus the brand and type systems around them.",
  intro:
    "Six years on products people sit inside all day. I take a surface end to end: design system, brand, interface, and the front end that ships it.",
} as const;

export const availability = {
  open: true,
  label: "Open for 2 projects this quarter",
} as const;

export const hero = {
  headline: ["Design for the products", "people work in all day."],
  subtext:
    "Point of sale, accounting, school operations. Design systems, brand, and the front end that ships them.",
  secondaryCta: { label: "View work", href: "#work" },
} as const;

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  image: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = caseStudies
  .filter((study) => study.category === "product")
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
  discipline: string;
  description: string;
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
  name: string;
  note: string;
  year?: string;
  image: string;
};

export const typefaces: Typeface[] = [
  {
    name: "Birru Sans",
    note: "Display sans drawn for the Birru.co identity.",
    year: "2024",
    image: "/work/type-birrusans.webp",
  },
  {
    name: "Abahchan",
    note: "Rounded display face, personal project.",
    year: "2020",
    image: "/work/type-abahchan.webp",
  },
  {
    name: "BeemBO",
    note: "Full Latin set with extended diacritics.",
    year: "2020",
    image: "/work/type-beembo.webp",
  },
  {
    name: "Jablo",
    note: "Condensed display face, personal project.",
    image: "/work/type-jablo.webp",
  },
];

export type Highlight = { title: string; description: string };

export const highlights: Highlight[] = [
  {
    title: "How I work",
    description:
      "Direct with the owner or the product lead. Weekly shipping, no six week design phase before anything runs.",
  },
  {
    title: "Currently",
    description:
      "Product design at Luna POS and Laba.id, two SaaS products serving Indonesian merchants and MSMEs.",
  },
  {
    title: "Availability",
    description: availability.label + ". Remote, comfortable across SEA and EU hours.",
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

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Brand", href: "/#brand" },
  { label: "Type", href: "/#type" },
  { label: "About", href: "/#about" },
] as const;

/** One label per intent. Used in nav, hero, about, and the contact form alike. */
export const primaryCta = {
  label: "Start a project",
  href: "/#contact",
} as const;

export const whatsappCta = {
  label: "Chat on WhatsApp",
  href: `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(
    "Hi Isnul, I saw your portfolio and I have a project in mind.",
  )}`,
} as const;

export const contact = {
  heading: "Have something that needs building?",
  body: "Send one paragraph about the business and the bottleneck. You get a scope, a timeline, and a price back, not a discovery call.",
} as const;

/** Floating tags around the statement, mirroring the reference composition. */
export const disciplines = [
  "Product Design",
  "UX Design",
  "User Research",
  "Design Systems",
  "Brand Identity",
  "Type Design",
] as const;

export const statement = {
  eyebrow: "Hallo!",
  lead: "My focus is blending clear strategy, careful craft, and real user empathy",
  tail: "to build software small businesses can actually run on.",
} as const;

export type ProcessStep = { number: string; title: string; body: string };

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    body: "Sit with the operators. Watch the shift, read the spreadsheet they secretly rely on, find where the process actually breaks.",
  },
  {
    number: "02",
    title: "Design",
    body: "Flows, then screens, then a design system that holds. Decisions get made in the file, not in a deck.",
  },
  {
    number: "03",
    title: "Deliver",
    body: "Front end built and handed over working. Tested against the messy real data, not the happy path.",
  },
];
