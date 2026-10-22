import type { L } from "@/lib/i18n";

/**
 * Every piece of interface chrome, in both languages. The Indonesian is
 * written, not translated: it is how the sentence would be said out loud,
 * not the English mapped word for word.
 */
export const ui = {
  nav: {
    themeToggle: { id: "Ganti tema terang atau gelap", en: "Switch light or dark theme" },
    menu: { id: "Menu", en: "Menu" },
    audio: { id: "Audio", en: "Audio" },
    audioOn: { id: "Nyala", en: "On" },
    audioOff: { id: "Mati", en: "Off" },
  },

  work: {
    eyebrow: { id: "Pilihan kerjaan", en: "Selected work" },
    heading: {
      id: "Produk yang dipakai orang dari pagi sampai tutup",
      en: "Products people run their day on",
    },
    readMore: { id: "Baca studi kasusnya", en: "Read the case study" },
    seeAll: { id: "Lihat semua kerjaan", en: "See all the work" },
    indexHeading: { id: "Semua kerjaan", en: "All the work" },
    indexEyebrow: { id: "Indeks", en: "Index" },
    filterAll: { id: "Semua", en: "All" },
    categoryProduct: { id: "Produk", en: "Product" },
    categoryStrategy: { id: "Strategi", en: "Strategy" },
    categoryBrand: { id: "Brand", en: "Brand" },
    categoryType: { id: "Font", en: "Type" },
    roleProduct: { id: "Product Designer", en: "Product Designer" },
    roleWeb: { id: "Web Designer", en: "Web Designer" },
    roleBrand: { id: "Brand & Graphic Designer", en: "Brand & Graphic Designer" },
    roleType: { id: "Font Designer", en: "Font Designer" },
    roleMarketing: { id: "Strategi Marketing", en: "Marketing Strategy" },
  },

  experience: {
    eyebrow: { id: "Pengalaman", en: "Experience" },
    heading: { id: "Di mana saja saya kerja", en: "Where the work happened" },
    software: { id: "Software", en: "Software" },
    expertise: { id: "Keahlian", en: "Expertise" },
    education: { id: "Pendidikan", en: "Education" },
    seeAll: { id: "Lihat semua pengalaman", en: "See all experience" },
    allHeading: { id: "Semua pengalaman", en: "All experience" },
    allEyebrow: { id: "Riwayat kerja", en: "Work history" },
    scope: { id: "Ruang lingkup", en: "Scope of work" },
    dayToDay: { id: "Sehari-hari", en: "Day to day" },
    brands: { id: "Brand dan produk", en: "Brands and products" },
    notRecorded: { id: "Belum tercatat", en: "Not recorded yet" },
  },

  caseStudy: {
    back: { id: "Semua kerjaan", en: "All work" },
    role: { id: "Peran", en: "Role" },
    client: { id: "Klien", en: "Client" },
    industry: { id: "Industri", en: "Industry" },
    duration: { id: "Lama project", en: "Duration" },
    discipline: { id: "Bidang", en: "Discipline" },
    visit: { id: "Buka situsnya", en: "Visit the live site" },
    typography: { id: "Tipografi", en: "Typography" },
    palette: { id: "Warna", en: "Palette" },
    problem: { id: "Masalahnya", en: "The problem" },
    constraints: { id: "Batasannya", en: "Constraints" },
    approach: { id: "Pengerjaannya", en: "The work" },
    results: { id: "Hasilnya", en: "Results" },
    galleryHeading: { id: "Isi projectnya", en: "Inside the project" },
    plates: { id: "halaman", en: "plates" },
    next: { id: "Project berikutnya", en: "Next project" },
    solution: { id: "Solusinya", en: "The solution" },
    impact: { id: "Dampaknya", en: "The impact" },
    jumpWork: { id: "Lihat pengerjaannya", en: "See the work" },
    jumpImpact: { id: "Langsung ke hasil", en: "Jump to impact" },
    story: { id: "Ceritanya", en: "The story" },
    overview: { id: "Ringkasan", en: "Overview" },
    viewCase: { id: "Lihat studi kasus", en: "View case study" },
    about: { id: "Tentang", en: "About" },
    year: { id: "Tahun", en: "Year" },
    scroll: { id: "Gulir", en: "Scroll" },
    allSelected: { id: "Semua kerjaan", en: "All the work" },
  },

  specimen: {
    heading: { id: "Coba fontnya", en: "Try the typeface" },
    tryIt: { id: "Ketik di sini", en: "Type here" },
    glyphs: { id: "karakter", en: "glyphs" },
    styles: { id: "gaya", en: "styles" },
    characterSet: { id: "Set karakter", en: "Character set" },
  },

  testimonials: {
    eyebrow: { id: "Kata mereka", en: "In their words" },
    heading: {
      id: "Orang yang pernah kerja bareng saya",
      en: "People who have worked with me",
    },
  },

  notFound: {
    code: { id: "404", en: "404" },
    heading: { id: "Halamannya tidak ada", en: "That page does not exist" },
    body: {
      id: "Mungkin tautannya sudah berubah, atau alamatnya salah ketik. Dua pintu ini masih terbuka.",
      en: "The link may have moved, or the address has a typo. These two doors are still open.",
    },
    work: { id: "Lihat kerjaan", en: "See the work" },
    experience: { id: "Lihat pengalaman", en: "See the experience" },
  },

  reach: {
    whatsappNote: { id: "Paling cepat. Biasanya saya balas di hari yang sama.", en: "Fastest. I usually reply the same day." },
    instagramNote: { id: "Kirim DM, lihat juga kerjaan yang belum masuk sini.", en: "Send a DM, and see work that is not on this site yet." },
    emailNote: { id: "Untuk brief, file, atau yang butuh jejak tertulis.", en: "For briefs, files, or anything that needs a paper trail." },
    copy: { id: "Salin alamat", en: "Copy address" },
    copied: { id: "Tersalin", en: "Copied" },
    brief: { id: "Atau kirim brief singkat di sini", en: "Or send a short brief here" },
    fab: { id: "Chat WhatsApp", en: "Chat on WhatsApp" },
    resume: { id: "Resume", en: "Resume" },
    cv: { id: "Unduh CV", en: "Download CV" },
  },

  form: {
    name: { id: "Nama", en: "Name" },
    namePlaceholder: { id: "Nadia Prameswari", en: "Nadia Prameswari" },
    email: { id: "Email", en: "Email" },
    emailPlaceholder: { id: "nadia@warungnusa.id", en: "nadia@warungnusa.id" },
    message: { id: "Usahanya apa, dan macetnya di mana", en: "The business, and the bottleneck" },
    messagePlaceholder: {
      id: "Kami punya empat outlet kopi. Stok dihitung manual tiap malam dan angkanya tidak pernah cocok sama kasir.",
      en: "We run four coffee outlets. Stock counts are done on paper every night and never match the register.",
    },
    helper: {
      id: "Satu paragraf sudah cukup. Kisaran budget membantu, tapi tidak wajib.",
      en: "One paragraph is enough. Budget range helps, but is optional.",
    },
    sending: { id: "Mengirim", en: "Sending" },
    successTitle: { id: "Pesannya masuk.", en: "Message received." },
    successBody: {
      id: "Saya balas paling lama dua hari kerja. Kalau buru-buru, WhatsApp lebih cepat.",
      en: "I reply within two working days. If it is urgent, WhatsApp is faster.",
    },
    sendAnother: { id: "Kirim lagi", en: "Send another" },
    orEmail: { id: "Atau email ke", en: "Or email" },
    honeypotLabel: { id: "Perusahaan", en: "Company" },
    errors: {
      required: {
        id: "Nama, email, dan pesannya wajib diisi.",
        en: "Name, email, and message are all required.",
      },
      email: {
        id: "Alamat emailnya kelihatannya belum benar.",
        en: "That email address does not look right.",
      },
      short: {
        id: "Ceritakan sedikit lagi, minimal satu dua kalimat.",
        en: "Tell me a bit more, at least a sentence or two.",
      },
      offline: {
        id: "Formulirnya belum tersambung. Email saya langsung saja.",
        en: "The form is not connected yet. Email me directly instead.",
      },
      failed: {
        id: "Gagal terkirim. Email saya langsung saja.",
        en: "Could not send that. Email me directly instead.",
      },
      rate: {
        id: "Terlalu banyak pesan dalam waktu singkat. Tunggu sebentar, atau WhatsApp saja.",
        en: "Too many messages in a short time. Wait a few minutes, or WhatsApp me.",
      },
      network: {
        id: "Koneksinya putus. Coba lagi, atau email saya langsung.",
        en: "Network dropped. Try again, or email me directly.",
      },
      unknown: {
        id: "Ada yang salah. Coba lewat email saja.",
        en: "Something went wrong. Try email instead.",
      },
    },
  },
} satisfies Record<string, unknown>;

export type ErrorCode = keyof typeof ui.form.errors;

export const errorMessage = (code: string): L =>
  ui.form.errors[code as ErrorCode] ?? ui.form.errors.unknown;
