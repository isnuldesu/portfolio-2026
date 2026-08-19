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
  },

  hero: {
    eyebrow: { id: "Portofolio 2026", en: "Portfolio 2026" },
    greeting: { id: "Halo, saya Isnul", en: "Hi, I'm Isnul" },
  },

  work: {
    eyebrow: { id: "/ Pilihan kerjaan", en: "/ Selected work" },
    heading: {
      id: "Produk yang dipakai orang dari pagi sampai tutup",
      en: "Products people run their day on",
    },
    readMore: { id: "Baca studi kasusnya", en: "Read the case study" },
  },

  brand: {
    heading: {
      id: "Identitas brand, sebelum ada produknya.",
      en: "Brand systems, before there is a product to design.",
    },
    body: {
      id: "Logo, pola, dan ilustrasi untuk label skincare, studio kreatif, dan aplikasi konsumen.",
      en: "Identity, pattern, and illustration work for skincare labels, creative studios, and consumer apps.",
    },
  },

  type: {
    heading: {
      id: "Empat typeface, digambar huruf per huruf.",
      en: "Four typefaces, drawn character by character.",
    },
    body: {
      id: "Bikin font mulanya cuma kebiasaan sejak 2020. Sekarang malah jadi bahan buat kerjaan brand. Geser barisnya.",
      en: "Type design started as a habit in 2020 and now feeds the brand work. Drag or scroll the row.",
    },
  },

  timeline: {
    eyebrow: { id: "/ Enam tahun, berurutan", en: "/ Six years, in order" },
    heading: { id: "Urutan kerjaannya", en: "How the work stacked up" },
  },

  process: {
    eyebrow: { id: "/ Cara kerjanya", en: "/ How the work runs" },
    heading: { id: "Begini jalannya", en: "Here is how it works" },
  },

  about: {
    badge: { id: "Tentang", en: "About" },
    contactLine: {
      id: "Sekali chat langsung sampai, dan yang saya balas rencana kerja, bukan company profile.",
      en: "Reachable in one message, and I answer with a plan rather than a brochure.",
    },
  },

  caseStudy: {
    back: { id: "Semua kerjaan", en: "All work" },
    role: { id: "Peran", en: "Role" },
    client: { id: "Klien", en: "Client" },
    year: { id: "Tahun", en: "Year" },
    discipline: { id: "Bidang", en: "Discipline" },
    visit: { id: "Buka situsnya", en: "Visit the live site" },
    typography: { id: "Tipografi", en: "Typography" },
    palette: { id: "Warna", en: "Palette" },
    galleryHeading: { id: "Isi projectnya", en: "Inside the project" },
    plates: { id: "halaman", en: "plates" },
    next: { id: "Project berikutnya", en: "Next project" },
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
