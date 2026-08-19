/**
 * Long-form project records. Everything here is transcribed from the 2025
 * Product Design and Graphic Design portfolio decks, including the type and
 * colour specifications each project shipped with. The home page cards in
 * site.ts are derived from this file, so the two can never drift apart.
 */

export type Swatch = { name: string; hex: string };
export type GalleryItem = {
  src: string;
  caption: string;
  /** Intrinsic pixels, so next/image can reserve the box and build a srcset. */
  width: number;
  height: number;
};
export type CaseSection = { heading: string; body: string; bullets?: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  category: "product" | "brand";
  discipline: string;
  year: string;
  role: string;
  client: string;
  link?: string;
  linkLabel?: string;
  /** One line for the home page card. */
  teaser: string;
  /** Opening paragraph on the detail page. */
  summary: string;
  cover: string;
  tags: string[];
  /** Controls the tile footprint in the brand grid. */
  gridSize: "large" | "small";
  sections: CaseSection[];
  typefaces?: string[];
  palette?: Swatch[];
  gallery: GalleryItem[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "luna-pos",
    title: "Luna POS",
    category: "product",
    discipline: "Product design",
    year: "2021 - Present",
    role: "Product Designer",
    client: "Luna POS",
    link: "https://lunapos.id",
    linkLabel: "lunapos.id",
    teaser:
      "Point of sale SaaS spanning five apps. Merchants grew from 1,000+ to 4,500+ during my time on the product.",
    summary:
      "Luna POS is software as a service for Indonesian business owners: sales monitoring, product stock, accounting, and customer relations in one account. I joined after launch, with more than a thousand merchants already depending on it, which meant every change had to land without breaking a working shop.",
    cover: "/work/lunapos.webp",
    tags: ["SaaS", "Product Design", "Design System"],
    gridSize: "large",
    sections: [
      {
        heading: "One account, five surfaces",
        body: "The product is not a single app. A merchant touches whichever surface fits the counter they are standing at, and all of them share one data model and one design language.",
        bullets: [
          "Luna POS Back Office, the web merchant dashboard",
          "Luna POS app for Android tablet and phone",
          "Luna One, omni channel payment",
          "TokoLUNA, an online store for merchants",
          "Luna Owner app and Luna Self Order kiosk, both in progress",
        ],
      },
      {
        heading: "Why TokoLUNA exists",
        body: "Third party food delivery service charges in Indonesia, GoFood, GrabFood, and ShopeeFood, are steep for an MSME. TokoLUNA lets a merchant run their own online store and take orders directly, so online sales stop depending on a platform that takes a cut. It doubles as an eMENU and self order system, kiosk and order at table, for food, beverage, and retail.",
      },
      {
        heading: "What changed",
        body: "Merchant count went from 1,000+ when I joined to 4,500+ active merchants. Growth came from the surfaces above shipping one at a time rather than a single relaunch.",
      },
    ],
    typefaces: ["Source Sans Pro", "Inter"],
    palette: [
      { name: "Gigas", hex: "#53387D" },
      { name: "Conifer", hex: "#ABD94A" },
      { name: "Trout", hex: "#4D4F5C" },
      { name: "Burnt Sienna", hex: "#EA5757" },
      { name: "Black", hex: "#1A1423" },
      { name: "White", hex: "#FFFFFF" },
    ],
    gallery: [
      { src: "/work/gallery/lunapos-overview.webp", caption: "Product overview and the five surfaces", width: 2048, height: 1449 },
      { src: "/work/lunapos.webp", caption: "Back office, the web merchant dashboard", width: 2048, height: 1449 },
      { src: "/work/gallery/lunapos-app.webp", caption: "Tablet and phone point of sale", width: 2048, height: 1449 },
      { src: "/work/gallery/lunapos-tokoluna.webp", caption: "TokoLUNA, the merchant online store", width: 2048, height: 1449 },
    ],
  },
  {
    slug: "laba-id",
    title: "Laba.id",
    category: "product",
    discipline: "Product design",
    year: "2021 - Present",
    role: "First Product Designer",
    client: "Laba.id",
    link: "https://laba.id",
    linkLabel: "laba.id",
    teaser:
      "Accounting app for Indonesian MSMEs, designed from zero as the first designer on the team.",
    summary:
      "Laba.id is a financial companion for micro, small, and medium businesses: record transactions accurately without needing to understand accounting first. The idea started in September 2020 during the pandemic, development began in early 2021, and I was the first designer on it.",
    cover: "/work/laba.webp",
    tags: ["Fintech", "Product Design", "Mobile"],
    gridSize: "small",
    sections: [
      {
        heading: "Founding the design side",
        body: "Almost every design decision in the product traces back to this project: colour, icons, sizing, type, components, the design system, and the app logo itself. Ideas came from the product manager and the development team; the design work was mine to own.",
      },
      {
        heading: "Two products, one system",
        body: "Laba Bisnis is the web app for running the books. Laba Saku is the mobile app for recording as it happens. They share tokens and components so a business owner moving between phone and desk does not have to relearn anything.",
        bullets: [
          "Laba Bisnis, web, at app.laba.id",
          "Laba Saku, Android, on Google Play",
        ],
      },
      {
        heading: "Shipped",
        body: "Released 23 December 2022 and still in active development.",
      },
    ],
    typefaces: ["MuseoModerno, adjusted for the logotype", "Lato"],
    palette: [
      { name: "Science Blue", hex: "#0163C8" },
      { name: "Malachite", hex: "#04BA27" },
      { name: "Blaze Orange", hex: "#FF7202" },
      { name: "Red", hex: "#ED0019" },
      { name: "Silver Chalice", hex: "#AEAEAE" },
      { name: "Shark", hex: "#212529" },
    ],
    gallery: [
      { src: "/work/gallery/laba-overview.webp", caption: "What the product is for", width: 2048, height: 1449 },
      { src: "/work/gallery/laba-brand.webp", caption: "Logo, type, and colour", width: 2048, height: 1449 },
      { src: "/work/gallery/laba-bisnis.webp", caption: "Laba Bisnis, the web app", width: 2048, height: 1449 },
      { src: "/work/gallery/laba-saku.webp", caption: "Laba Saku, the mobile app", width: 2048, height: 1449 },
    ],
  },
  {
    slug: "singapore-scout-association",
    title: "The Singapore Scout Association",
    category: "product",
    discipline: "Web design",
    year: "2023",
    role: "Designer, landing page team",
    client: "The Singapore Scout Association",
    link: "https://scout.sg",
    linkLabel: "scout.sg",
    teaser:
      "Landing page for Singapore's oldest youth movement, a registered charity dating back to 1910.",
    summary:
      "The Singapore Scout Association is one of the oldest youth movements in Singapore, dating back to 1910, and a full member of the World Organisation of the Scout Movement, which counted over 57 million Scouts across 173 national organisations as of 2022. I joined the team building their landing page.",
    cover: "/work/scout.webp",
    tags: ["Non-profit", "Web Design"],
    gridSize: "small",
    sections: [
      {
        heading: "What the page has to do",
        body: "SSA is a registered charity that helps young people learn by doing and by serving others. The page carries several audiences at once: parents deciding whether to enrol, volunteers looking for a way in, donors, and the Scout Shop.",
      },
      {
        heading: "A palette wide enough for a movement",
        body: "Five colour families, each with a five step tint ramp, plus four defined gradient pairings. Enough range to separate regions, programmes, and campaigns without any section leaving the system.",
      },
    ],
    typefaces: ["Galano Grotesque Bold", "Source Sans Pro"],
    palette: [
      { name: "Red 10", hex: "#CE202E" },
      { name: "Purple 10", hex: "#601872" },
      { name: "Green 10", hex: "#41BFB4" },
      { name: "Blue 10", hex: "#004288" },
      { name: "Grey 10", hex: "#434345" },
      { name: "Lux Black", hex: "#212529" },
    ],
    gallery: [
      { src: "/work/gallery/scout-overview.webp", caption: "Who the association is", width: 2048, height: 1449 },
      { src: "/work/gallery/scout-brand.webp", caption: "Type scale and the full colour system", width: 2048, height: 1449 },
      { src: "/work/scout.webp", caption: "The landing page", width: 2048, height: 1449 },
    ],
  },
  {
    slug: "andalusclass",
    title: "AndalusClass",
    category: "product",
    discipline: "UI/UX design",
    year: "2020",
    role: "UI/UX Designer",
    client: "Al-Andalus International Islamic Boarding School",
    teaser:
      "Attendance and scheduling web app built for an Islamic boarding school during learning from home.",
    summary:
      "When Covid-19 closed the campus, Al-Andalus still had to operate as a school. AndalusClass is the internal web app they built to track attendance and daily student activity while students were learning from home. It was also my first project as a UI/UX designer.",
    cover: "/work/andalusclass.webp",
    tags: ["EdTech", "UI/UX Design"],
    gridSize: "small",
    sections: [
      {
        heading: "The constraint",
        body: "A boarding school runs on a fixed daily rhythm. Moving that rhythm into an app meant attendance and activity tracking had to survive being filled in by teachers and students on whatever device was at home, on a connection nobody could guarantee.",
      },
      {
        heading: "First project, full scope",
        body: "Flows, screens, type scale, and the colour system, all of it. Two families of colour: a green for the institution, and a set of functional accents for status, alerts, and activity types.",
      },
    ],
    typefaces: ["Titillium Web", "Roboto"],
    palette: [
      { name: "Jewel", hex: "#137152" },
      { name: "Mountain Meadow", hex: "#1B996E" },
      { name: "Silver Tree", hex: "#5EBF92" },
      { name: "Golden Tainoi", hex: "#FFCE5C" },
      { name: "Atomic Tangerine", hex: "#FFA26B" },
      { name: "Wild Watermelon", hex: "#FF647C" },
      { name: "Azure Radiance", hex: "#0284F4" },
      { name: "Mine Shaft", hex: "#333333" },
    ],
    gallery: [
      { src: "/work/gallery/andalusclass-overview.webp", caption: "Why the school needed it", width: 2048, height: 1449 },
      { src: "/work/gallery/andalusclass-brand.webp", caption: "Type and the colour system", width: 2048, height: 1449 },
      { src: "/work/andalusclass.webp", caption: "Attendance and scheduling screens", width: 2048, height: 1449 },
    ],
  },
  {
    slug: "birru-co",
    title: "Birru.co",
    category: "brand",
    discipline: "Brand identity",
    year: "2024",
    role: "Creative Designer",
    client: "Birru.co",
    teaser:
      "Logo system, brandmark variants, tagline lockups, and a custom typeface drawn for the brand.",
    summary:
      "A full identity for Birru.co, taken from the logogram through to the marketplace collateral. The brand ships with its own typeface rather than a licensed one, which is why the wordmark and the interface type feel like the same voice.",
    cover: "/work/birru.webp",
    tags: ["Branding", "Logo", "Type Design"],
    gridSize: "large",
    sections: [
      {
        heading: "A logo system, not a logo",
        body: "Logogram and icon, logotype, vertical and horizontal brandmarks, and the full lockup. Each one has a job: the icon for an avatar, the horizontal mark for a header, the vertical mark where the space is narrow, the full lockup for print.",
      },
      {
        heading: "Its own typeface",
        body: "Birru Sans was drawn for this identity and pairs with Nunito for running text. Drawing the display face meant the tagline lockups could be spaced by eye rather than fought against a font that was never meant for them.",
      },
      {
        heading: "Into the wild",
        body: "The system was extended to social media and marketplace listing design, which is where most people actually meet the brand.",
      },
    ],
    typefaces: ["Birru Sans, drawn for the brand", "Nunito"],
    gallery: [
      { src: "/work/birru.webp", caption: "Logo and brandmark variants", width: 2048, height: 1536 },
      { src: "/work/gallery/birru-tagline.webp", caption: "Tagline lockups", width: 2048, height: 1536 },
      { src: "/work/gallery/birru-typeface.webp", caption: "Birru Sans against Nunito", width: 2048, height: 1536 },
      { src: "/work/gallery/birru-social.webp", caption: "Social media and marketplace design", width: 2048, height: 1536 },
    ],
  },
  {
    slug: "backslash-creative",
    title: "Backslash Creative",
    category: "brand",
    discipline: "Brand identity",
    year: "2022",
    role: "Graphic Designer",
    client: "Backslash Creative",
    teaser: "Logo variations, palette, pattern system, and marketplace collateral.",
    summary:
      "Identity for a creative studio, built in five parts: logo variations, colour, typography, pattern, and the brand in action. The pattern does most of the heavy lifting, because a studio brand shows up more often as a background than as a logo.",
    cover: "/work/backslash.webp",
    tags: ["Branding", "Logo", "Pattern"],
    gridSize: "small",
    sections: [
      {
        heading: "Four colours, high contrast",
        body: "A single warm red against a deep navy and near black, with an off white ground. Small palette on purpose: it forces the pattern and the type to carry the personality.",
      },
      {
        heading: "Pattern as the real identity",
        body: "The pattern system extends the logo into surfaces where a mark would be too literal, and it is what makes a post recognisable at thumbnail size.",
      },
    ],
    palette: [
      { name: "Carnation", hex: "#EF5354" },
      { name: "Rhino", hex: "#2A455E" },
      { name: "Cod Gray", hex: "#0A0A0A" },
      { name: "Wild Sand", hex: "#F5F5F5" },
    ],
    gallery: [
      { src: "/work/gallery/backslash-logo.webp", caption: "Logo variations", width: 2048, height: 1536 },
      { src: "/work/gallery/backslash-colors.webp", caption: "Brand colours", width: 2048, height: 1536 },
      { src: "/work/gallery/backslash-pattern.webp", caption: "Pattern design", width: 2048, height: 1536 },
      { src: "/work/backslash.webp", caption: "Brand in action", width: 2048, height: 5073 },
    ],
  },
  {
    slug: "vjatre-skincare",
    title: "VJatre Skincare",
    category: "brand",
    discipline: "Brand and social",
    year: "2022",
    role: "Graphic Designer",
    client: "VJatre",
    teaser: "Identity, pattern language, and a social media system for a skincare label.",
    summary:
      "A skincare brand needs to look consistent on a shelf, on a phone, and in a feed. VJatre got a primary and secondary logo plus two alternates, a matching icon set, a pattern, and a social template system built on the same four colours.",
    cover: "/work/vjatre.webp",
    tags: ["Branding", "Social", "Packaging"],
    gridSize: "small",
    sections: [
      {
        heading: "Four marks, four icons",
        body: "Primary, secondary, and two alternates, each with a matching single letter icon. The alternates exist so the brand never has to be squeezed or recoloured badly to fit a placement.",
      },
      {
        heading: "Green and gold",
        body: "A deep muted green as the base with a warm amber accent, kept away from the fresh mint palette every other skincare label reaches for.",
      },
    ],
    palette: [
      { name: "Heavy Metal", hex: "#2F3F2C" },
      { name: "Sun", hex: "#FDB117" },
      { name: "Dune", hex: "#362F2E" },
      { name: "Cod Gray", hex: "#0A0A0A" },
    ],
    gallery: [
      { src: "/work/gallery/vjatre-logo.webp", caption: "Logo and icon variants", width: 2048, height: 1536 },
      { src: "/work/gallery/vjatre-colors.webp", caption: "Brand colour", width: 2048, height: 1536 },
      { src: "/work/gallery/vjatre-pattern.webp", caption: "Pattern design", width: 2048, height: 1536 },
      { src: "/work/gallery/vjatre-social.webp", caption: "Social media posts", width: 2048, height: 1536 },
      { src: "/work/vjatre.webp", caption: "Brand in action", width: 2048, height: 2954 },
    ],
  },
  {
    slug: "probe",
    title: "ProBe",
    category: "brand",
    discipline: "Product art direction",
    year: "2022",
    role: "Graphic Designer",
    client: "ProBe",
    teaser:
      "Store thumbnails, promo design, and UI state illustration for a discount and promo app.",
    summary:
      "ProBe is a mobile app that collects discounts and promos in Indonesia in one place, so nobody has to trawl five brand sites and five brand feeds to find them. I handled the promotional design and the illustration layer inside the app.",
    cover: "/work/probe.webp",
    tags: ["App Store", "Illustration", "Promo"],
    gridSize: "large",
    sections: [
      {
        heading: "Winning the thumbnail",
        body: "A promo app lives or dies on the Google Play listing. The store thumbnails had to read the offer at the size of a fingernail, which set the whole visual language: heavy type, one colour block, one idea per frame.",
      },
      {
        heading: "Illustration as an interface state",
        body: "Each in-app illustration went sketch, then mobile app composition, then final result, drawn to sit inside the screen rather than float on it.",
      },
    ],
    gallery: [
      { src: "/work/gallery/probe-cover.webp", caption: "What the app is for", width: 2048, height: 1536 },
      { src: "/work/probe.webp", caption: "Promo design and store thumbnails", width: 2048, height: 1536 },
      { src: "/work/gallery/probe-illustration.webp", caption: "Sketch to final illustration", width: 2048, height: 1536 },
      { src: "/work/gallery/probe-preview.webp", caption: "In app preview", width: 2048, height: 1536 },
    ],
  },
  {
    slug: "rt-pintar",
    title: "RT Pintar",
    category: "brand",
    discipline: "Icons and illustration",
    year: "2022",
    role: "Self-directed",
    client: "Personal project",
    teaser:
      "Self-directed redesign: a twelve icon category set, empty states, and social templates.",
    summary:
      "A personal redesign of RT Pintar, a neighbourhood administration app. No brief and no client, which made it the right place to work out an icon set and a full set of empty states properly.",
    cover: "/work/rtpintar.webp",
    tags: ["Icons", "Illustration", "Redesign"],
    gridSize: "small",
    sections: [
      {
        heading: "Twelve category icons",
        body: "Polling, broadcast, bill, report, mail, history, voucher, e-money, electricity, financial, panic, and mobile data. One grid, one stroke weight, so a row of them reads as a set rather than twelve separate drawings.",
      },
      {
        heading: "States nobody designs",
        body: "No task, inbox empty, and no internet. The three screens a user hits when something is missing, and the three most products leave as a grey box with a sentence in it.",
      },
    ],
    gallery: [
      { src: "/work/rtpintar.webp", caption: "Category icon set", width: 2048, height: 1536 },
      { src: "/work/gallery/rtpintar-states.webp", caption: "Empty and error states", width: 2048, height: 1536 },
      { src: "/work/gallery/rtpintar-social.webp", caption: "Social media templates", width: 2048, height: 1536 },
      { src: "/work/gallery/rtpintar-highlight.webp", caption: "Instagram highlight icons", width: 2048, height: 1536 },
    ],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);
