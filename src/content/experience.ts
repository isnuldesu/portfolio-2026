import type { L } from "@/lib/i18n";

export type ScopeGroup = { heading: L; items: L[] };

export type Role = {
  slug: string;
  title: string;
  company: string;
  /** Brands or products sitting under the company. */
  brands?: string[];
  location: L;
  period: string;
  arrangement: L;
  /** The four that lead the home page. */
  featured?: boolean;
  summary: L;
  /** Short bullets for the card. */
  points: L[];
  /** Scope of work, grouped the way the engagement defines it. */
  scope?: ScopeGroup[];
  dayToDay?: L[];
};

export const roles: Role[] = [
  {
    slug: "lunapos",
    title: "Product Designer",
    company: "IMPACTO, for LUNAPOS",
    brands: [
      "Luna POS",
      "Laba Bisnis",
      "Laba Saku",
      "TokoLUNA",
      "LUNA One",
      "LUNA Owner",
      "LUNA KiosK",
      "LUNA KDS",
      "LUNA Lite",
    ],
    location: { id: "Jakarta Selatan, Indonesia", en: "South Jakarta, Indonesia" },
    period: "Jan 2021 - Present",
    arrangement: { id: "Penuh waktu, onsite", en: "Fulltime, onsite" },
    featured: true,
    summary: {
      id: "Merancang produk untuk sembilan aplikasi yang dipakai merchant Indonesia menjalankan tokonya, dan membangun design system yang menyatukan semuanya.",
      en: "Product design across nine apps Indonesian merchants run their shops on, plus the design system that holds them together.",
    },
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
    scope: [
      {
        heading: { id: "Desain produk", en: "Product design" },
        items: [
          {
            id: "Alur, wireframe, dan antarmuka akhir untuk sembilan aplikasi, dari kasir tablet sampai dashboard back office.",
            en: "Flows, wireframes, and finished interfaces across nine apps, from the tablet till to the back office dashboard.",
          },
          {
            id: "Merancang untuk permukaan yang berbeda tapi satu model data: web merchant, Android tablet dan ponsel, kiosk, dan display dapur.",
            en: "Designing for different surfaces on one data model: merchant web, Android tablet and phone, kiosk, and kitchen display.",
          },
        ],
      },
      {
        heading: { id: "Design system", en: "Design system" },
        items: [
          {
            id: "Menyusun LUNITE: token, komponen, dan pola yang dipakai ulang lintas produk.",
            en: "Built LUNITE: tokens, components, and patterns reused across the products.",
          },
          {
            id: "Menjaga konsistensi supaya merchant yang berpindah antar aplikasi tidak perlu belajar ulang.",
            en: "Keeping it consistent so a merchant moving between apps does not relearn anything.",
          },
        ],
      },
      {
        heading: { id: "Branding", en: "Branding" },
        items: [
          {
            id: "Desain logo untuk aplikasi-aplikasi di dalam ekosistem LUNAPOS.",
            en: "Logo design for the apps inside the LUNAPOS ecosystem.",
          },
        ],
      },
    ],
    dayToDay: [
      {
        id: "Merancang layar baru dan merapikan yang sudah jalan tanpa merusak toko yang sedang buka.",
        en: "Designing new screens and repairing shipped ones without breaking a shop that is open.",
      },
      {
        id: "Menjaga dan menambah komponen di LUNITE saat kebutuhan baru muncul.",
        en: "Maintaining and extending LUNITE as new needs turn up.",
      },
      {
        id: "Bekerja langsung dengan product manager dan tim pengembang sampai desainnya benar-benar terkirim.",
        en: "Working directly with the product manager and the development team until a design actually ships.",
      },
    ],
  },
  {
    slug: "far-group",
    title: "Creative Head",
    company: "FAR Group",
    brands: ["Fitquarters", "MindWorks", "Indonesian Fitness Founders"],
    location: { id: "Indonesia", en: "Indonesia" },
    period: "—",
    arrangement: { id: "Creative agency", en: "Creative agency" },
    featured: true,
    summary: {
      id: "Memimpin arah kreatif FAR Group, agensi yang menaungi Fitquarters, MindWorks, dan Indonesian Fitness Founders.",
      en: "Leading the creative direction at FAR Group, the agency behind Fitquarters, MindWorks, and Indonesian Fitness Founders.",
    },
    points: [
      {
        id: "Memimpin arah kreatif untuk tiga brand di bawah satu agensi.",
        en: "Creative direction across three brands under one agency.",
      },
    ],
  },
  {
    slug: "adonai",
    title: "Web & Creative Designer",
    company: "Adonai MediaTech Solutions",
    brands: ["Ascend Eye Clinic", "The Singapore Scout Association"],
    location: { id: "Punggol, Singapura", en: "Punggol, Singapore" },
    period: "Dec 2022 - Mar 2024",
    arrangement: { id: "Freelance, remote", en: "Freelance, remote" },
    featured: true,
    summary: {
      id: "Menggarap landing page untuk klien Adonai di Singapura, dari klinik mata sampai gerakan kepemudaan tertua di sana.",
      en: "Landing pages for Adonai's Singapore clients, from an eye clinic to the country's oldest youth movement.",
    },
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
    scope: [
      {
        heading: { id: "Desain web", en: "Web design" },
        items: [
          {
            id: "Merancang halaman dari struktur sampai visual akhir, termasuk sistem warna dan skala huruf yang dipakai seterusnya.",
            en: "Page design from structure to finished visuals, including the colour system and type scale that stayed in use.",
          },
          {
            id: "Menangani beberapa pembaca sekaligus di satu halaman: calon anggota, relawan, donatur, dan toko.",
            en: "Carrying several audiences on one page: prospective members, volunteers, donors, and the shop.",
          },
        ],
      },
    ],
    dayToDay: [
      {
        id: "Bekerja remote dengan tim Adonai di Singapura, kirim revisi per fase halaman.",
        en: "Working remotely with the Adonai team in Singapore, shipping revisions page phase by phase.",
      },
    ],
  },
  {
    slug: "samase-sports-club",
    title: "Head of Marketing Strategy",
    company: "SAMASE Sports Club",
    brands: ["SAMASE Fitspace", "SAMASE Physio", "SAMASE Padel"],
    location: { id: "Indonesia", en: "Indonesia" },
    period: "Apr 2025 - Aug 2025",
    arrangement: { id: "Freelance, berbasis output", en: "Freelance, output based" },
    featured: true,
    summary: {
      id: "Memegang strategi marketing SAMASE Sports Club dari pre-launch sampai grand opening, mencakup Fitspace, Physio, dan Padel.",
      en: "Owned the marketing strategy at SAMASE Sports Club from pre-launch through grand opening, covering Fitspace, Physio, and Padel.",
    },
    points: [
      {
        id: "Menyusun strategi pre-launch sampai grand opening: positioning, messaging, dan funnel.",
        en: "Set the pre-launch to grand opening strategy: positioning, messaging, and funnel.",
      },
      {
        id: "Mengelola funnel dari awareness, lead generation, segmentasi, sampai closing.",
        en: "Ran the funnel from awareness and lead generation through segmentation to closing.",
      },
      {
        id: "Mengarahkan tim marketing, produksi konten, paid ads, dan event offline.",
        en: "Directed the marketing team, content production, paid ads, and offline events.",
      },
    ],
    scope: [
      {
        heading: {
          id: "Strategi dan arah campaign",
          en: "Strategy and campaign direction",
        },
        items: [
          {
            id: "Menyusun dan mengelola strategi marketing dari pre-launch hingga grand opening.",
            en: "Building and running the marketing strategy from pre-launch to grand opening.",
          },
          {
            id: "Menentukan positioning, messaging, dan funnel marketing secara menyeluruh.",
            en: "Setting positioning, messaging, and the marketing funnel end to end.",
          },
          {
            id: "Market research dan rekomendasi penyesuaian strategi untuk mencapai product-market fit.",
            en: "Market research and strategy adjustments to reach product-market fit.",
          },
        ],
      },
      {
        heading: { id: "Sistem funnel", en: "Funnel system" },
        items: [
          {
            id: "Mengelola awareness, lead generation, lead management dan segmentasi, sampai conversion dan closing.",
            en: "Running awareness, lead generation, lead management and segmentation, then conversion and closing.",
          },
          {
            id: "Memastikan tiap tahap funnel berjalan tanpa bottleneck.",
            en: "Keeping every funnel stage clear of bottlenecks.",
          },
        ],
      },
      {
        heading: {
          id: "Pengawasan aktivitas marketing",
          en: "Oversight of marketing activity",
        },
        items: [
          {
            id: "Mengarahkan paid advertising di Meta Ads, TikTok Ads, dan channel lain. Eksekusi ads buying dan kontrol budget dipegang pihak lain yang ditunjuk; arahan strategis, evaluasi performa, dan koordinasinya di sini.",
            en: "Directing paid advertising on Meta Ads, TikTok Ads, and other channels. Ads buying and budget control sat with an appointed party; strategy, performance review, and coordination sat here.",
          },
          {
            id: "Produksi dan distribusi konten, social media management, dan marketing offline termasuk event dan exhibition.",
            en: "Content production and distribution, social media management, and offline marketing including events and exhibitions.",
          },
        ],
      },
      {
        heading: { id: "Monitoring dan optimasi", en: "Monitoring and optimisation" },
        items: [
          {
            id: "Memantau performa campaign berkala, menganalisis data terhadap KPI, dan mengoptimasi terus-menerus.",
            en: "Tracking campaign performance, reading the data against KPI, and optimising continuously.",
          },
          {
            id: "Target performa: minimal 50% occupancy rate pada masa pre-launch, diukur dari Founding Member yang sudah membayar sebelum grand opening.",
            en: "Performance target: at least 50% occupancy during pre-launch, measured by Founding Members paid up before grand opening.",
          },
        ],
      },
      {
        heading: { id: "Tim dan timeline", en: "Team and timeline" },
        items: [
          {
            id: "Mengarahkan dan mengawasi tim marketing, serta membangun alur koordinasi yang jalan.",
            en: "Directing and overseeing the marketing team, and building a coordination flow that works.",
          },
          {
            id: "Menjaga timeline campaign dari awal sampai grand opening, dan menangani hambatan sebelum mengganggu momentum.",
            en: "Holding the campaign timeline to grand opening, and clearing obstacles before they cost momentum.",
          },
        ],
      },
      {
        heading: { id: "Produksi konten", en: "Content production" },
        items: [
          {
            id: "Mengerjakan dan mengelola konten kompleksitas rendah sampai menengah: desain grafis feed dan carousel, editing reels dan video pendek, konten rutin.",
            en: "Making and managing low to medium complexity content: feed and carousel design, reels and short-form editing, routine posts.",
          },
          {
            id: "Menjaga sebagian besar kebutuhan konten bisa diselesaikan internal, dan mengajukan vendor hanya untuk produksi berskala besar.",
            en: "Keeping most content solvable in house, and bringing in vendors only for large productions.",
          },
        ],
      },
      {
        heading: { id: "Event offline", en: "Offline events" },
        items: [
          {
            id: "Menyusun konsep event, mengkoordinasikan materi promosi dan alur pengumpulan leads, sampai integrasinya ke funnel.",
            en: "Event concepts, promotional material, the lead capture flow, and how it feeds the funnel.",
          },
          {
            id: "Hadir langsung saat event bila diperlukan, lalu evaluasi pasca-event atas leads, performa tim, dan potensi optimasi.",
            en: "Attending in person where needed, then reviewing leads, team performance, and what to improve.",
          },
        ],
      },
    ],
    dayToDay: [
      {
        id: "Kerja berbasis output, tanpa jam kerja tetap, tapi responsif untuk keputusan strategis dan kebutuhan operasional.",
        en: "Output based rather than fixed hours, but responsive on strategic calls and operational needs.",
      },
      {
        id: "Memantau iklan, leads, dan funnel secara aktif, lalu mengoptimasi tanpa menunda.",
        en: "Watching ads, leads, and the funnel actively, then optimising without waiting.",
      },
      {
        id: "Meeting online maupun offline untuk evaluasi performa, keputusan strategis, dan koordinasi tim.",
        en: "Meetings online and offline for performance review, strategic calls, and team coordination.",
      },
    ],
  },
  {
    slug: "birru-co",
    title: "Brand & Graphic Designer",
    company: "Birru.co",
    location: { id: "Lampung, Indonesia", en: "Lampung, Indonesia" },
    period: "Dec 2023 - Dec 2025",
    arrangement: { id: "Freelance, remote", en: "Freelance, remote" },
    summary: {
      id: "Rebranding penuh untuk Birru.co, rumah terapi wicara anak, sampai typeface-nya sendiri.",
      en: "A full rebrand for Birru.co, a speech therapy house for children, down to its own typeface.",
    },
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
    scope: [
      {
        heading: { id: "Identitas", en: "Identity" },
        items: [
          {
            id: "Sistem logo lengkap: logogram, logotype, brandmark vertikal dan horizontal, plus kunci penuhnya.",
            en: "A full logo system: logogram, logotype, vertical and horizontal brandmarks, and the full lockup.",
          },
          {
            id: "Birru Sans, typeface dua belas gaya yang digambar khusus untuk brandnya.",
            en: "Birru Sans, a twelve style typeface drawn for the brand.",
          },
          {
            id: "Palet warna, aset pola, dan brand guidelines sebagai acuan tim.",
            en: "Colour palette, pattern assets, and the brand guidelines the team works from.",
          },
        ],
      },
    ],
  },
  {
    slug: "backslash-creative",
    title: "Brand Designer",
    company: "Backslash Creative Nusantara",
    brands: ["Vjatre"],
    location: { id: "Jakarta Selatan, Indonesia", en: "South Jakarta, Indonesia" },
    period: "Jan 2022 - Apr 2022",
    arrangement: { id: "Freelance, remote", en: "Freelance, remote" },
    summary: {
      id: "Identitas untuk studionya sendiri dan untuk Vjatre, brand skincare baru.",
      en: "Identity for the studio itself and for Vjatre, a new skincare brand.",
    },
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
    slug: "nusalab-studios",
    title: "Graphic Designer & Illustrator",
    company: "Nusalab Studios",
    brands: ["Altravel Solutions", "CV Karya Multi Bersama"],
    location: { id: "Tangerang, Indonesia", en: "Tangerang, Indonesia" },
    period: "Nov 2019 - Jun 2024",
    arrangement: {
      id: "Penuh waktu dan freelance, remote",
      en: "Fulltime and freelance, remote",
    },
    summary: {
      id: "Lima tahun mengerjakan identitas, konten, dan ilustrasi untuk Nusalab dan kliennya.",
      en: "Five years of identity, content, and illustration for Nusalab and its clients.",
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

export const featuredRoles = roles.filter((role) => role.featured);
export const getRole = (slug: string) => roles.find((role) => role.slug === slug);

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
