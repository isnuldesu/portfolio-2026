/**
 * Single source of truth for every visible string on the site.
 * Edit this file to make the portfolio yours. Nothing else needs to change.
 */

export const person = {
  name: "Muhammad Isnul",
  handle: "isnuldesu",
  role: "Design Engineer",
  secondaryRole: "Product Builder",
  location: "Indonesia, working remote",
  email: "isnulmuhammad@gmail.com",
  // Pulled from the GitHub profile. Swap /public/portrait.jpg for a higher
  // resolution shot when you have one; 900x900 or larger is ideal.
  portrait: "/portrait.jpg",
  tagline:
    "I build the software small businesses actually run on: point of sale, rentals, inventory, and the boring plumbing behind them.",
  intro:
    "Five products shipped end to end, from schema to checkout screen. I work directly with owners and operators, not through a spec handed down three levels.",
} as const;

export const availability = {
  open: true,
  label: "Open for 2 projects this quarter",
} as const;

export type Project = {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "OBARA OS",
    description: "Rental ERP: assets, contracts, returns, and billing in one system.",
    year: "2026",
    link: "#contact",
    image: "https://picsum.photos/seed/obara-os-rental-erp/840/540",
  },
  {
    title: "LunaPOS",
    description: "Offline-first point of sale for cafes and retail counters.",
    year: "2025",
    link: "#contact",
    image: "https://picsum.photos/seed/lunapos-retail-counter/840/540",
  },
  {
    title: "Netara",
    description: "Internal tooling and knowledge base for a distributed ops team.",
    year: "2025",
    link: "#contact",
    image: "https://picsum.photos/seed/netara-ops-tooling/840/540",
  },
  {
    title: "Portal Global Market",
    description: "Multi-vendor marketplace with settlement and payout flows.",
    year: "2024",
    link: "#contact",
    image: "https://picsum.photos/seed/portal-global-market/840/540",
  },
];

export type Capability = {
  title: string;
  body: string;
  image?: string;
  span?: "wide" | "tall" | "normal";
};

export const capabilities: Capability[] = [
  {
    title: "Product engineering",
    body: "Next.js, TypeScript, Postgres. One person from data model to shipped screen, so nothing gets lost in a handoff.",
    span: "wide",
    image: "https://picsum.photos/seed/product-engineering-desk/1200/700",
  },
  {
    title: "Operations software",
    body: "Point of sale, rentals, inventory, payouts. Systems that stay correct when the shop is busy and the wifi is not.",
  },
  {
    title: "Design that survives contact",
    body: "Interfaces built for people who use them forty hours a week, not for a screenshot.",
  },
  {
    title: "Supabase and Postgres",
    body: "Row level security, migrations, realtime. The database is the product; I treat it that way.",
    image: "https://picsum.photos/seed/database-schema-lines/900/900",
  },
];

export type Highlight = { title: string; description: string };

export const highlights: Highlight[] = [
  {
    title: "How I work",
    description:
      "Direct with the owner. Weekly shipping, no discovery theatre, no six week design phase before anything runs.",
  },
  {
    title: "Currently",
    description:
      "Building OBARA OS, a rental operating system covering assets, contracts, and billing.",
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
  /** simple-icons export name, or "mail" for the generic mail glyph */
  icon: "siGithub" | "siLinkedin" | "siX" | "siInstagram" | "siWhatsapp" | "mail";
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    handle: "@isnuldesu",
    href: "https://github.com/isnuldesu",
    icon: "siGithub",
  },
  {
    label: "LinkedIn",
    handle: "in/isnul",
    href: "https://www.linkedin.com/in/isnul/",
    icon: "siLinkedin",
  },
  {
    label: "Email",
    handle: person.email,
    href: `mailto:${person.email}`,
    icon: "mail",
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
] as const;

/** One label per intent. Used in nav, hero, and footer alike. */
export const primaryCta = {
  label: "Start a project",
  href: "#contact",
} as const;

export const hero = {
  headline: ["Software for the shops,", "not for the slide deck."],
  subtext:
    "I build point of sale, rental, and inventory systems for operators who need them working today.",
  secondaryCta: { label: "View work", href: "#work" },
} as const;

export const contact = {
  heading: "Have something that needs building?",
  body: "Send one paragraph about the business and the bottleneck. You get a scope, a timeline, and a price back, not a discovery call.",
} as const;
