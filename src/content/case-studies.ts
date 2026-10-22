/**
 * Long-form project records, in both languages. Everything here is transcribed
 * from the 2025 Product Design and Graphic Design portfolio decks, including
 * the type and colour specifications each project shipped with. The home page
 * cards in site.ts are derived from this file, so the two cannot drift apart.
 */

import type { Specimen } from "@/components/site/font-specimen";
import type { L } from "@/lib/i18n";

export type Swatch = { name: string; hex: string };
export type GalleryItem = {
  src: string;
  caption: L;
  /** Intrinsic pixels, so next/image can reserve the box and build a srcset. */
  width: number;
  height: number;
};
export type CaseSection = { heading: L; body: L; bullets?: L[] };

/**
 * The eight-plate series for a project, generated in Gemini (Nano Banana Pro)
 * from the original deck slides and cut to 2048 by 1449. Plate 01 is the
 * cover; this returns plates 02 to 08 with their captions, in order.
 */
const shots = (slug: string, captions: (L & { file?: string })[]): GalleryItem[] =>
  captions.map(({ file, ...caption }, index) => ({
    // A replaced plate gets a new file name (`file`), so no cached copy of
    // the old picture can be served in its place.
    src: `/work/shots/${slug}/${file ?? String(index + 2).padStart(2, "0")}.webp`,
    caption,
    width: 2048,
    height: 1449,
  }));

const shotCover = (slug: string) => `/work/shots/${slug}/01.webp`;

export type RoleGroup = "product" | "web" | "brand" | "type" | "marketing";

/** Work index groups, in the order they are shown. */
export const roleGroups: RoleGroup[] = ["product", "web", "brand", "type", "marketing"];

export type CaseStudy = {
  slug: string;
  title: string;
  category: "product" | "brand" | "type" | "strategy";
  /** The role this was done in, which is how the work index is grouped. */
  roleGroup: RoleGroup;
  discipline: L;
  /** The sector the client operates in, not the design discipline. */
  industry: L;
  year: string;
  /** How long the engagement ran, in the words the CV uses. */
  duration: L;
  role: L;
  client: L;
  link?: string;
  linkLabel?: string;
  /** Every public address the project lives at, primary first. */
  links?: { href: string; label: string }[];
  /** One line for the home page card. */
  teaser: L;
  /** Opening paragraph on the detail page. */
  summary: L;
  cover: string;
  /**
   * A raw interface screenshot, when one exists. Shown inside a browser frame
   * on the project stage, the way the cover cannot be (covers are finished
   * presentation slides).
   */
  screen?: string;
  tags: string[];
  /** Controls the tile footprint in the brand grid. */
  gridSize: "large" | "small";
  /** Why the work existed. */
  problem?: L;
  /** What the engagement had to work around. */
  constraints?: L[];
  /** Process and what shipped. */
  sections: CaseSection[];
  /** Only ever facts. Left empty where no number is known. */
  results?: L[];
  typefaces?: L[];
  palette?: Swatch[];
  /** Drives the live specimen block on the detail page. */
  specimen?: Specimen;
  gallery: GalleryItem[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "luna-pos",
    title: "Luna POS",
    category: "product",
    roleGroup: "product",
    discipline: { id: "Product design", en: "Product design" },
    industry: { id: "Teknologi ritel, SaaS kasir", en: "Retail technology, point of sale SaaS" },
    year: "2021 - Present",
    duration: { id: "Jan 2021 - sekarang", en: "Jan 2021 - present" },
    role: { id: "Product Designer", en: "Product Designer" },
    client: { id: "IMPACTO, untuk LUNAPOS", en: "IMPACTO, for LUNAPOS" },
    link: "https://lunapos.id",
    linkLabel: "lunapos.id",
    teaser: {
      id: "SaaS kasir yang terdiri dari lima aplikasi. Merchant naik dari 1.000+ ke 4.500+ selama saya di produknya.",
      en: "Point of sale SaaS spanning five apps. Merchants grew from 1,000+ to 4,500+ during my time on the product.",
    },
    summary: {
      id: "Luna POS itu software as a service untuk pemilik usaha di Indonesia: pantau penjualan, stok barang, akuntansi, dan hubungan pelanggan dari satu akun. Saya masuk setelah produknya rilis, waktu lebih dari seribu merchant sudah bergantung padanya. Artinya setiap perubahan harus mendarat tanpa merusak toko yang sedang buka.",
      en: "Luna POS is software as a service for Indonesian business owners: sales monitoring, product stock, accounting, and customer relations in one account. I joined after launch, with more than a thousand merchants already depending on it, which meant every change had to land without breaking a working shop.",
    },
    cover: shotCover("luna-pos"),
    tags: ["SaaS", "Product Design", "Design System"],
    gridSize: "large",
    problem: { id: "Merchant sudah lebih dari seribu waktu saya masuk, dan mereka menjalankan toko dari permukaan yang berbeda-beda: kasir tablet, dashboard web, kiosk, layar dapur. Tiap permukaan tumbuh sendiri-sendiri. Sementara itu penjualan online mereka bergantung pada platform food delivery pihak ketiga yang potongannya berat untuk UMKM.", en: "More than a thousand merchants were already running on it, across surfaces that had grown up separately: tablet till, web dashboard, kiosk, kitchen display. Meanwhile their online sales depended on third party delivery platforms whose service charges are steep for an MSME." },
    constraints: [
      { id: "Setiap perubahan mendarat di toko yang sedang buka. Tidak ada jendela untuk merombak.", en: "Every change lands in a shop that is open. There is no window for a rebuild." },
      { id: "Sembilan aplikasi berbagi satu model data, jadi keputusan di satu layar berlaku ke delapan lainnya.", en: "Nine apps share one data model, so a decision on one screen carries to the other eight." },
    ],
    results: [
      { id: "Merchant aktif naik dari 1.000+ ke 4.500+ selama saya di produknya.", en: "Active merchants went from 1,000+ to 4,500+ over my time on the product." },
      { id: "Sembilan aplikasi dirilis satu per satu, bukan satu peluncuran ulang besar.", en: "Nine apps shipped one at a time rather than as a single relaunch." },
      { id: "LUNITE dipakai lintas produk, jadi kerja UI/UX berhenti diulang dari nol.", en: "LUNITE is used across the products, so UI/UX work stopped restarting from scratch." },
    ],
    sections: [
      {
        heading: { id: "Satu akun, lima permukaan", en: "One account, five surfaces" },
        body: {
          id: "Produknya bukan satu aplikasi. Merchant pakai permukaan mana pun yang cocok dengan meja kasir yang sedang mereka hadapi, dan semuanya berbagi satu model data dan satu bahasa desain.",
          en: "The product is not a single app. A merchant touches whichever surface fits the counter they are standing at, and all of them share one data model and one design language.",
        },
        bullets: [
          {
            id: "Luna POS Back Office, dashboard web merchant",
            en: "Luna POS Back Office, the web merchant dashboard",
          },
          {
            id: "Luna POS app untuk tablet dan ponsel Android",
            en: "Luna POS app for Android tablet and phone",
          },
          { id: "Luna One, pembayaran omni channel", en: "Luna One, omni channel payment" },
          { id: "TokoLUNA, toko online untuk merchant", en: "TokoLUNA, an online store for merchants" },
          {
            id: "Luna Owner app dan Luna Self Order kiosk, keduanya masih digarap",
            en: "Luna Owner app and Luna Self Order kiosk, both in progress",
          },
        ],
      },
      {
        heading: { id: "Kenapa TokoLUNA ada", en: "Why TokoLUNA exists" },
        body: {
          id: "Biaya layanan food delivery pihak ketiga di Indonesia, GoFood, GrabFood, dan ShopeeFood, berat untuk UMKM. Lewat TokoLUNA merchant punya toko online sendiri dan menerima pesanan langsung, jadi penjualan online tidak lagi menyetor potongan ke platform. Fungsinya juga jadi eMENU dan sistem self order, kiosk maupun pesan di meja, untuk makanan, minuman, dan retail.",
          en: "Third party food delivery service charges in Indonesia, GoFood, GrabFood, and ShopeeFood, are steep for an MSME. TokoLUNA lets a merchant run their own online store and take orders directly, so online sales stop depending on a platform that takes a cut. It doubles as an eMENU and self order system, kiosk and order at table, for food, beverage, and retail.",
        },
      },
      {
        heading: { id: "Yang berubah", en: "What changed" },
        body: {
          id: "Jumlah merchant naik dari 1.000+ waktu saya masuk jadi 4.500+ merchant aktif. Kenaikannya datang dari permukaan di atas yang dirilis satu per satu, bukan dari satu peluncuran ulang besar.",
          en: "Merchant count went from 1,000+ when I joined to 4,500+ active merchants. Growth came from the surfaces above shipping one at a time rather than a single relaunch.",
        },
      },
    ],
    typefaces: [
      { id: "Source Sans Pro", en: "Source Sans Pro" },
      { id: "Inter", en: "Inter" },
    ],
    palette: [
      { name: "Gigas", hex: "#53387D" },
      { name: "Conifer", hex: "#ABD94A" },
      { name: "Trout", hex: "#4D4F5C" },
      { name: "Burnt Sienna", hex: "#EA5757" },
      { name: "Black", hex: "#1A1423" },
      { name: "White", hex: "#FFFFFF" },
    ],
    gallery: shots("luna-pos", [
      { id: "Back office: detail pelanggan, poin, dan kupon", en: "Back office: customer detail, points, and coupons", file: "02" },
      { id: "Kasir tablet di meja kedai kopi", en: "The tablet till on a coffee shop counter", file: "03" },
      { id: "Pembayaran QRIS di ponsel", en: "QRIS payment on the phone", file: "04" },
      { id: "Masuk, laporan harian, dan metode pembayaran", en: "Sign in, daily report, and payment methods", file: "05" },
      { id: "Kasir tablet, QRIS, dan struk, dari atas", en: "The tablet till, QRIS, and a receipt, from above", file: "06-flat" },
      { id: "Dipakai di toko: kasir dan pembeli", en: "In a shop: the till and the customer", file: "07" },
      { id: "Satu ekosistem: TokoLUNA dan kasir Luna POS", en: "One ecosystem: TokoLUNA and the Luna POS till", file: "08" },
    ]),
  },
  {
    slug: "laba-id",
    title: "Laba.id",
    category: "product",
    roleGroup: "product",
    discipline: { id: "Product design", en: "Product design" },
    industry: { id: "Fintech, akuntansi UMKM", en: "Fintech, MSME accounting" },
    year: "2021 - Present",
    duration: { id: "Jan 2021 - sekarang", en: "Jan 2021 - present" },
    role: { id: "Product Designer pertama", en: "First Product Designer" },
    client: { id: "IMPACTO, untuk Laba.id", en: "IMPACTO, for Laba.id" },
    link: "https://laba.id",
    linkLabel: "laba.id",
    links: [
      { href: "https://laba.id", label: "laba.id" },
      { href: "https://labasaku.com", label: "labasaku.com" },
    ],
    teaser: {
      id: "Aplikasi akuntansi untuk UMKM Indonesia, dirancang dari nol sebagai desainer pertama di timnya.",
      en: "Accounting app for Indonesian MSMEs, designed from zero as the first designer on the team.",
    },
    summary: {
      id: "Laba.id itu teman keuangan untuk usaha mikro, kecil, dan menengah: catat transaksi dengan benar tanpa harus paham akuntansi lebih dulu. Idenya muncul September 2020 waktu pandemi, pengembangannya mulai awal 2021, dan saya desainer pertama yang mengerjakannya.",
      en: "Laba.id is a financial companion for micro, small, and medium businesses: record transactions accurately without needing to understand accounting first. The idea started in September 2020 during the pandemic, development began in early 2021, and I was the first designer on it.",
    },
    cover: shotCover("laba-id"),
    tags: ["Fintech", "Product Design", "Mobile"],
    gridSize: "small",
    problem: { id: "Pemilik UMKM harus mencatat transaksi dengan benar tanpa pernah belajar akuntansi. Aplikasi pembukuan yang ada menuntut pemahaman debit dan kredit sebelum baris pertama bisa diisi.", en: "MSME owners have to record transactions correctly without ever having studied accounting. Existing bookkeeping apps ask you to understand debits and credits before the first line can be entered." },
    constraints: [
      { id: "Belum ada desainer sebelumnya. Warna, ikon, ukuran, huruf, komponen, design system, dan logo semuanya belum ada.", en: "There was no designer before this. Colour, icons, sizing, type, components, the design system, and the logo did not exist yet." },
      { id: "Dua produk sekaligus: web untuk pembukuan, mobile untuk mencatat saat kejadian.", en: "Two products at once: web for the books, mobile for recording as it happens." },
    ],
    results: [
      { id: "Rilis 23 Desember 2022 dan sampai sekarang masih dikembangkan.", en: "Released 23 December 2022 and still in active development." },
      { id: "Laba Bisnis dan Laba Saku berbagi token dan komponen yang sama.", en: "Laba Bisnis and Laba Saku share the same tokens and components." },
    ],
    sections: [
      {
        heading: { id: "Membangun sisi desainnya", en: "Founding the design side" },
        body: {
          id: "Hampir semua keputusan desain di produk ini berawal dari sini: warna, ikon, ukuran, jenis huruf, komponen, design system, sampai logo aplikasinya. Idenya datang dari product manager dan tim pengembang; garapan desainnya jadi tanggung jawab saya.",
          en: "Almost every design decision in the product traces back to this project: colour, icons, sizing, type, components, the design system, and the app logo itself. Ideas came from the product manager and the development team; the design work was mine to own.",
        },
      },
      {
        heading: { id: "Dua produk, satu sistem", en: "Two products, one system" },
        body: {
          id: "Laba Bisnis aplikasi web untuk mengurus pembukuan. Laba Saku aplikasi mobile untuk mencatat saat kejadian. Keduanya berbagi token dan komponen yang sama, jadi pemilik usaha yang berpindah dari ponsel ke meja kerja tidak perlu belajar ulang.",
          en: "Laba Bisnis is the web app for running the books. Laba Saku is the mobile app for recording as it happens. They share tokens and components so a business owner moving between phone and desk does not have to relearn anything.",
        },
        bullets: [
          { id: "Laba Bisnis, web, di app.laba.id", en: "Laba Bisnis, web, at app.laba.id" },
          {
            id: "Laba Saku, di labasaku.com dan di Google Play untuk Android",
            en: "Laba Saku, at labasaku.com and on Google Play for Android",
          },
        ],
      },
      {
        heading: { id: "Sudah rilis", en: "Shipped" },
        body: {
          id: "Rilis 23 Desember 2022 dan sampai sekarang masih dikembangkan.",
          en: "Released 23 December 2022 and still in active development.",
        },
      },
    ],
    typefaces: [
      {
        id: "MuseoModerno, disesuaikan untuk logotype",
        en: "MuseoModerno, adjusted for the logotype",
      },
      { id: "Lato", en: "Lato" },
    ],
    palette: [
      { name: "Science Blue", hex: "#0163C8" },
      { name: "Malachite", hex: "#04BA27" },
      { name: "Blaze Orange", hex: "#FF7202" },
      { name: "Red", hex: "#ED0019" },
      { name: "Silver Chalice", hex: "#AEAEAE" },
      { name: "Shark", hex: "#212529" },
    ],
    gallery: shots("laba-id", [
      { id: "Laba Bisnis di web: daftar penjualan dan detail invoice", en: "Laba Bisnis on the web: the sales list and an invoice" },
      { id: "Dipakai di meja warung", en: "On a corner shop counter" },
      { id: "Laporan laba rugi", en: "The profit and loss report" },
      { id: "Logo, warna, dan huruf Laba.id", en: "Laba.id logo, colour, and type" },
      { id: "Dashboard, invoice, dan kalkulator di meja", en: "The dashboard, an invoice, and a calculator on the desk", file: "06-flat" },
      { id: "Pemilik usaha mengecek pembukuannya", en: "An owner going over the books" },
      { id: "Satu sistem: Laba Bisnis dan Laba Saku", en: "One system: Laba Bisnis and Laba Saku" },
    ]),
  },
  {
    slug: "laba-saku",
    title: "Laba Saku",
    category: "product",
    roleGroup: "product",
    discipline: { id: "Mobile app design", en: "Mobile app design" },
    industry: { id: "Fintech, pembukuan UMKM", en: "Fintech, MSME bookkeeping" },
    year: "2021 - Present",
    duration: { id: "Jan 2021 - sekarang", en: "Jan 2021 - present" },
    role: { id: "Product Designer", en: "Product Designer" },
    client: { id: "IMPACTO, untuk Laba.id", en: "IMPACTO, for Laba.id" },
    link: "https://play.google.com/store/apps/details?id=com.impacto.kakutor",
    linkLabel: "Google Play",
    links: [
      { href: "https://play.google.com/store/apps/details?id=com.impacto.kakutor", label: "Google Play" },
      { href: "https://labasaku.com", label: "labasaku.com" },
    ],
    teaser: {
      id: "Aplikasi pembukuan Laba.id di Android: catat penjualan, terima QRIS, cetak struk, semuanya dari ponsel. 10 rb+ download, rating 4,5 di Google Play.",
      en: "Laba.id's bookkeeping app for Android: record a sale, take QRIS, print the receipt, all from the phone. 10K+ downloads, rated 4.5 on Google Play.",
    },
    summary: {
      id: "Laba Saku itu separuh mobile dari Laba.id. Aplikasinya menjawab tiga pertanyaan pemilik usaha setiap hari: berapa omzet hari ini, berapa pengeluarannya, dan berapa untung sebenarnya. Pemakainya menjalankan toko dari ponsel, di depan pelanggan, jadi setiap catatan harus selesai dalam hitungan detik.",
      en: "Laba Saku is the mobile half of Laba.id. It answers the three questions a business owner asks every day: what came in today, what went out, and what the real profit is. Its users run the shop from their phone, in front of a customer, so every entry has to be done in seconds.",
    },
    cover: shotCover("laba-saku"),
    tags: ["Fintech", "Mobile", "Product Design"],
    gridSize: "small",
    problem: {
      id: "Pemilik warung, kafe, laundry, dan konter HP mencatat di meja kasir, bukan di meja kantor. Kalau mencatat butuh paham akuntansi atau butuh laptop, catatannya tidak pernah dibuat, dan laporan keuangannya tidak pernah ada.",
      en: "Owners of corner shops, cafes, laundries, and phone counters record at the till, not at a desk. If recording needs accounting knowledge or a laptop, the entry never gets made, and the financial report never exists.",
    },
    constraints: [
      { id: "Satu design system dengan Laba Bisnis di web: token dan komponennya sama, jadi data dan istilahnya harus terbaca sama di dua layar.", en: "One design system with Laba Bisnis on the web: the same tokens and components, so the data and the words have to read the same on both screens." },
      { id: "Dipakai lintas jenis usaha, dari toko kelontong sampai online shop, dengan alur yang tetap satu.", en: "Used across very different businesses, from corner shops to online sellers, with one flow for all of them." },
    ],
    results: [
      { id: "10 rb+ download dan rating 4,5 dari 59 ulasan di Google Play (Oktober 2026).", en: "10K+ downloads and a 4.5 rating from 59 reviews on Google Play (October 2026)." },
      { id: "Masih dikembangkan: pembaruan terakhir 20 Juni 2026.", en: "Still in active development: last updated 20 June 2026." },
    ],
    sections: [
      {
        heading: { id: "Isi aplikasinya", en: "What is in it" },
        body: {
          id: "Dari mencatat transaksi sampai laporan keuangan, semuanya ada di satu aplikasi, dan setiap fitur menulis ke catatan yang sama.",
          en: "From recording a sale to the financial statements, all in one app, and every feature writes to the same books.",
        },
        bullets: [
          { id: "LabaPay: terima pembayaran QRIS yang langsung tercatat di pembukuan", en: "LabaPay: QRIS payments that land straight in the books" },
          { id: "Catat penjualan, pembelian, dan biaya operasional dalam hitungan detik", en: "Sales, purchases, and running costs recorded in seconds" },
          { id: "Cetak struk langsung dari ponsel", en: "Receipts printed straight from the phone" },
          { id: "Produk dan stok, aset usaha, kas dan bank, kontak pelanggan dan supplier", en: "Products and stock, business assets, cash and bank, customer and supplier contacts" },
          { id: "Laporan laba rugi, posisi keuangan, dan arus kas otomatis", en: "Automatic profit and loss, balance sheet, and cash flow reports" },
        ],
      },
      {
        heading: { id: "Dibangun di atas sistem Laba", en: "Built on the Laba system" },
        body: {
          id: "Laba Saku lahir bareng Laba Bisnis, dari design system yang saya bangun untuk Laba.id. Komponen, warna, dan istilahnya sama, jadi pemilik usaha yang mencatat di ponsel siang hari dan membuka laporan di laptop malamnya tidak perlu belajar dua kali.",
          en: "Laba Saku was designed alongside Laba Bisnis, on the design system I built for Laba.id. Same components, colours, and wording, so an owner who records on the phone at noon and opens the report on a laptop at night never learns anything twice.",
        },
      },
      {
        heading: { id: "Untuk usaha yang mana", en: "Who it is for" },
        body: {
          id: "Tampilannya dibuat sederhana supaya bisa dipakai tanpa paham akuntansi, untuk usaha apa pun yang mencatat di depan pelanggan.",
          en: "Kept simple enough to use without knowing accounting, for any business that records in front of its customers.",
        },
        bullets: [
          { id: "Toko kelontong dan retail", en: "Corner shops and retail" },
          { id: "Kafe, restoran, dan usaha F&B", en: "Cafes, restaurants, and F&B" },
          { id: "Usaha jasa dan laundry", en: "Services and laundries" },
          { id: "Konter HP dan online shop", en: "Phone counters and online shops" },
        ],
      },
    ],
    typefaces: [
      {
        id: "MuseoModerno, disesuaikan untuk logotype",
        en: "MuseoModerno, adjusted for the logotype",
      },
      { id: "Lato", en: "Lato" },
    ],
    palette: [
      { name: "Science Blue", hex: "#0163C8" },
      { name: "Malachite", hex: "#04BA27" },
      { name: "Blaze Orange", hex: "#FF7202" },
      { name: "Red", hex: "#ED0019" },
      { name: "Shark", hex: "#212529" },
    ],
    gallery: shots("laba-saku", [
      { id: "Mencatat transaksi baru dalam hitungan detik", en: "A new transaction in seconds" },
      { id: "Beranda, riwayat transaksi, dan form tambah transaksi", en: "Home, transaction history, and the new transaction form" },
      { id: "LabaPay: pembayaran QRIS", en: "LabaPay: QRIS payments" },
      { id: "Kas & Bank dan laporan, dari atas", en: "Cash & Bank and the reports, from above", file: "05-flat" },
      { id: "Aset usaha dan kontak", en: "Business assets and contacts" },
      { id: "Cetak struk dari ponsel di warung", en: "Printing a receipt from the phone at the counter" },
      { id: "Laporan keuangan, siap dibuka di mana saja", en: "Financial reports, ready wherever the owner is" },
    ]),
  },
  {
    slug: "singapore-scout-association",
    title: "The Singapore Scout Association",
    category: "product",
    roleGroup: "web",
    discipline: { id: "Desain web", en: "Web design" },
    industry: { id: "Nirlaba, gerakan kepemudaan", en: "Non-profit, youth movement" },
    year: "2023",
    duration: { id: "2023", en: "2023" },
    role: { id: "Web Designer", en: "Web Designer" },
    client: {
      id: "Adonai MediaTech Solutions, untuk The Singapore Scout Association",
      en: "Adonai MediaTech Solutions, for The Singapore Scout Association",
    },
    link: "https://scout.sg",
    linkLabel: "scout.sg",
    teaser: {
      id: "Landing page untuk gerakan kepemudaan tertua di Singapura, sebuah lembaga amal terdaftar yang berdiri sejak 1910.",
      en: "Landing page for Singapore's oldest youth movement, a registered charity dating back to 1910.",
    },
    summary: {
      id: "The Singapore Scout Association salah satu gerakan kepemudaan tertua di Singapura, berdiri sejak 1910, dan anggota penuh World Organisation of the Scout Movement yang per 2022 menghitung lebih dari 57 juta Pramuka di 173 organisasi nasional. Saya bergabung dengan tim yang membangun landing page mereka.",
      en: "The Singapore Scout Association is one of the oldest youth movements in Singapore, dating back to 1910, and a full member of the World Organisation of the Scout Movement, which counted over 57 million Scouts across 173 national organisations as of 2022. I joined the team building their landing page.",
    },
    cover: shotCover("singapore-scout-association"),
    tags: ["Non-profit", "Web Design"],
    gridSize: "small",
    problem: { id: "Satu halaman harus menanggung beberapa pembaca yang tujuannya berbeda: orang tua yang menimbang mendaftarkan anaknya, relawan yang mencari pintu masuk, donatur, dan Scout Shop. Semuanya untuk lembaga yang berdiri sejak 1910 dan berstatus lembaga amal terdaftar.", en: "One page has to carry several audiences with different intents: parents weighing enrolment, volunteers looking for a way in, donors, and the Scout Shop. All for an institution founded in 1910 and registered as a charity." },
    constraints: [
      { id: "Warna harus cukup lebar untuk memisahkan wilayah, program, dan kampanye tanpa keluar dari satu sistem.", en: "The palette had to separate regions, programmes, and campaigns without any of it leaving one system." },
    ],
    sections: [
      {
        heading: { id: "Tugas halamannya", en: "What the page has to do" },
        body: {
          id: "SSA lembaga amal terdaftar yang membantu anak muda belajar lewat praktik dan lewat melayani orang lain. Satu halaman ini menanggung beberapa pembaca sekaligus: orang tua yang menimbang mendaftarkan anaknya, relawan yang mencari pintu masuk, donatur, dan Scout Shop.",
          en: "SSA is a registered charity that helps young people learn by doing and by serving others. The page carries several audiences at once: parents deciding whether to enrol, volunteers looking for a way in, donors, and the Scout Shop.",
        },
      },
      {
        heading: { id: "Palet seluas gerakannya", en: "A palette wide enough for a movement" },
        body: {
          id: "Lima keluarga warna, masing-masing dengan lima tingkat tint, ditambah empat pasangan gradasi yang sudah ditentukan. Cukup lebar untuk memisahkan wilayah, program, dan kampanye tanpa ada satu bagian pun yang keluar dari sistemnya.",
          en: "Five colour families, each with a five step tint ramp, plus four defined gradient pairings. Enough range to separate regions, programmes, and campaigns without any section leaving the system.",
        },
      },
    ],
    typefaces: [
      { id: "Galano Grotesque Bold", en: "Galano Grotesque Bold" },
      { id: "Source Sans Pro", en: "Source Sans Pro" },
    ],
    palette: [
      { name: "Red 10", hex: "#CE202E" },
      { name: "Purple 10", hex: "#601872" },
      { name: "Green 10", hex: "#41BFB4" },
      { name: "Blue 10", hex: "#004288" },
      { name: "Grey 10", hex: "#434345" },
      { name: "Lux Black", hex: "#212529" },
    ],
    gallery: shots("singapore-scout-association", [
      { id: "Donasi dan relawan, di layar penuh", en: "Donations and volunteering, full screen" },
      { id: "Di aula pramuka", en: "In a scout hall" },
      { id: "Scout Shop dan donasi di ponsel", en: "The Scout Shop and donations on the phone" },
      { id: "Hero, relawan, dan footer di mobile", en: "Hero, volunteering, and the footer on mobile" },
      { id: "Halaman di laptop dan ponsel, dari atas", en: "The page on laptop and phone, from above", file: "06-flat" },
      { id: "Orang tua dan anak mendaftar", en: "A parent and child signing up" },
      { id: "Logo, huruf, warna, dan komponen", en: "Logo, type, colour, and components" },
    ]),
  },
  {
    slug: "andalusclass",
    title: "AndalusClass",
    category: "product",
    roleGroup: "product",
    discipline: { id: "Desain UI/UX", en: "UI/UX design" },
    industry: { id: "Pendidikan, pesantren", en: "Education, boarding school" },
    year: "2020",
    duration: { id: "2020", en: "2020" },
    role: { id: "UI/UX Designer", en: "UI/UX Designer" },
    client: {
      id: "Pesantren Internasional Al-Andalus",
      en: "Al-Andalus International Islamic Boarding School",
    },
    teaser: {
      id: "Aplikasi web absensi dan penjadwalan untuk pesantren, dibangun saat belajar dari rumah.",
      en: "Attendance and scheduling web app built for an Islamic boarding school during learning from home.",
    },
    summary: {
      id: "Waktu Covid-19 menutup asrama, Al-Andalus tetap harus berjalan sebagai sekolah. AndalusClass aplikasi web internal yang mereka bangun untuk mencatat kehadiran dan kegiatan harian santri selama belajar dari rumah. Ini juga project pertama saya sebagai UI/UX designer.",
      en: "When Covid-19 closed the campus, Al-Andalus still had to operate as a school. AndalusClass is the internal web app they built to track attendance and daily student activity while students were learning from home. It was also my first project as a UI/UX designer.",
    },
    cover: shotCover("andalusclass"),
    tags: ["EdTech", "UI/UX Design"],
    gridSize: "small",
    problem: { id: "Covid-19 menutup asrama, tapi sekolah tetap harus berjalan. Kehadiran dan kegiatan harian santri yang biasanya terpantau di lingkungan pesantren tiba-tiba tersebar di rumah masing-masing.", en: "Covid-19 closed the campus, but the school still had to operate. Attendance and daily student activity, normally visible inside the boarding environment, were suddenly spread across homes." },
    constraints: [
      { id: "Diisi guru dan santri dari perangkat apa pun yang ada di rumah, lewat koneksi yang tidak bisa dijamin.", en: "Filled in by teachers and students on whatever device was at home, over a connection nobody could guarantee." },
      { id: "Project pertama saya sebagai UI/UX designer, jadi alur, layar, huruf, dan warna semuanya digarap sendiri.", en: "My first project as a UI/UX designer, so flows, screens, type, and colour were all mine to work out." },
    ],
    sections: [
      {
        heading: { id: "Batasannya", en: "The constraint" },
        body: {
          id: "Pesantren hidup dari ritme harian yang tetap. Memindahkan ritme itu ke aplikasi berarti pencatatan kehadiran dan kegiatan harus tetap benar meski diisi guru dan santri dari perangkat apa pun yang ada di rumah, lewat koneksi yang tidak bisa dijamin siapa pun.",
          en: "A boarding school runs on a fixed daily rhythm. Moving that rhythm into an app meant attendance and activity tracking had to survive being filled in by teachers and students on whatever device was at home, on a connection nobody could guarantee.",
        },
      },
      {
        heading: { id: "Project pertama, cakupan penuh", en: "First project, full scope" },
        body: {
          id: "Alur, layar, skala huruf, dan sistem warnanya, semuanya. Dua keluarga warna: hijau untuk lembaganya, dan sekumpulan aksen fungsional untuk status, peringatan, dan jenis kegiatan.",
          en: "Flows, screens, type scale, and the colour system, all of it. Two families of colour: a green for the institution, and a set of functional accents for status, alerts, and activity types.",
        },
      },
    ],
    typefaces: [
      { id: "Titillium Web", en: "Titillium Web" },
      { id: "Roboto", en: "Roboto" },
    ],
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
    gallery: shots("andalusclass", [
      { id: "Web app di tablet: masuk dan aktivitas harian", en: "The web app on a tablet: sign in and daily activity" },
      { id: "Di meja kelas", en: "On a classroom desk" },
      { id: "Aktivitas harian kelas di ponsel", en: "A class's daily activity on the phone" },
      { id: "Masuk, absensi, dan aktivitas harian", en: "Sign in, attendance, and daily activity" },
      { id: "Absensi dan aktivitas harian, dari atas", en: "Attendance and daily activity, from above", file: "06-flat" },
      { id: "Guru mengabsen kelas", en: "A teacher taking attendance" },
      { id: "Logo, huruf, warna, dan komponen", en: "Logo, type, colour, and components" },
    ]),
  },
  {
    slug: "birru-co",
    title: "Birru.co",
    category: "brand",
    roleGroup: "brand",
    discipline: { id: "Identitas brand", en: "Brand identity" },
    industry: { id: "Kesehatan anak, terapi wicara", en: "Children's health, speech therapy" },
    year: "2023 - 2025",
    duration: { id: "Des 2023 - Des 2025, 2 tahun", en: "Dec 2023 - Dec 2025, 2 years" },
    role: { id: "Brand & Graphic Designer", en: "Brand & Graphic Designer" },
    client: { id: "Birru.co", en: "Birru.co" },
    teaser: {
      id: "Sistem logo, varian brandmark, kunci tagline, dan satu typeface yang digambar khusus untuk brandnya.",
      en: "Logo system, brandmark variants, tagline lockups, and a custom typeface drawn for the brand.",
    },
    summary: {
      id: "Identitas lengkap untuk Birru.co, rumah terapi wicara untuk anak, dari logogram sampai materi marketplace. Brandnya jalan dengan typeface sendiri, bukan font berlisensi, dan itu sebabnya wordmark dan huruf di antarmukanya terdengar seperti satu suara.",
      en: "A full identity for Birru.co, a speech therapy house for children, taken from the logogram through to the marketplace collateral. The brand ships with its own typeface rather than a licensed one, which is why the wordmark and the interface type feel like the same voice.",
    },
    cover: shotCover("birru-co"),
    tags: ["Branding", "Logo", "Type Design"],
    gridSize: "large",
    problem: { id: "Birru.co rumah terapi wicara untuk anak, dan yang membaca materinya orang tua yang sedang mencari pertolongan untuk anaknya. Ini rebranding, jadi sudah ada identitas yang berjalan sebelumnya dan harus diganti tanpa membuat brandnya terasa asing.", en: "Birru.co is a speech therapy house for children, and the people reading its material are parents looking for help for their child. This was a rebrand, so an identity was already running and had to be replaced without making the brand feel like a stranger." },
    constraints: [
      { id: "Brandnya muncul paling sering bukan sebagai logo, tapi sebagai post sosial dan listing marketplace.", en: "The brand shows up far more often as a social post and a marketplace listing than as a logo." },
      { id: "Tagline dan kunci logonya butuh huruf yang bisa disetel dengan mata, bukan font lisensi yang harus dilawan.", en: "The tagline and lockups needed type that could be spaced by eye, not a licensed font to fight against." },
    ],
    results: [
      { id: "Birru Sans dirilis dalam dua belas gaya, enam berat dengan italic masing-masing.", en: "Birru Sans shipped in twelve styles, six weights each with an italic." },
      { id: "Brand guidelines diserahkan sebagai acuan tim, bukan hanya file logo.", en: "Brand guidelines were handed over as something the team works from, not just a logo file." },
      { id: "Sistemnya diteruskan ke media sosial dan listing marketplace, tempat brandnya paling sering ditemui.", en: "The system carried into social media and marketplace listings, where the brand is actually met." },
    ],
    sections: [
      {
        heading: { id: "Sistem logo, bukan satu logo", en: "A logo system, not a logo" },
        body: {
          id: "Logogram dan ikon, logotype, brandmark vertikal dan horizontal, lalu kunci penuhnya. Masing-masing punya tugas: ikon untuk avatar, mark horizontal untuk header, mark vertikal untuk ruang sempit, kunci penuh untuk cetak.",
          en: "Logogram and icon, logotype, vertical and horizontal brandmarks, and the full lockup. Each one has a job: the icon for an avatar, the horizontal mark for a header, the vertical mark where the space is narrow, the full lockup for print.",
        },
      },
      {
        heading: { id: "Typeface sendiri", en: "Its own typeface" },
        body: {
          id: "Birru Sans digambar untuk identitas ini dan berpasangan dengan Nunito untuk teks berjalan. Karena hurufnya digambar sendiri, jarak di kunci tagline bisa disetel dengan mata, bukan dilawan dari font yang memang tidak dibuat untuk itu.",
          en: "Birru Sans was drawn for this identity and pairs with Nunito for running text. Drawing the display face meant the tagline lockups could be spaced by eye rather than fought against a font that was never meant for them.",
        },
      },
      {
        heading: { id: "Turun ke lapangan", en: "Into the wild" },
        body: {
          id: "Sistemnya diteruskan ke desain media sosial dan listing marketplace, dan justru di situlah kebanyakan orang bertemu brandnya.",
          en: "The system was extended to social media and marketplace listing design, which is where most people actually meet the brand.",
        },
      },
    ],
    typefaces: [
      { id: "Birru Sans, digambar untuk brandnya", en: "Birru Sans, drawn for the brand" },
      { id: "Nunito", en: "Nunito" },
    ],
    specimen: {
      family: "Birru Sans",
      glyphs: 108,
      sample: { id: "Bicara lebih jelas", en: "Speak a little clearer" },
      styles: [{"label": "ExtraLight", "weight": 200}, {"label": "ExtraLight Italic", "weight": 200, "italic": true}, {"label": "Light", "weight": 300}, {"label": "Light Italic", "weight": 300, "italic": true}, {"label": "Regular", "weight": 400}, {"label": "Regular Italic", "weight": 400, "italic": true}, {"label": "SemiBold", "weight": 600}, {"label": "SemiBold Italic", "weight": 600, "italic": true}, {"label": "Bold", "weight": 700}, {"label": "Bold Italic", "weight": 700, "italic": true}, {"label": "ExtraBold", "weight": 800}, {"label": "ExtraBold Italic", "weight": 800, "italic": true}],
      characters: ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "©", "®", "°", "±", "×", "÷"],
    },
    gallery: shots("birru-co", [
      { id: "Logo, logogram, dan varian brandmark", en: "The logo, the logogram, and the brandmark variants" },
      { id: "Di ruang terapi", en: "In the therapy room" },
      { id: "Instagram Birru", en: "Birru on Instagram" },
      { id: "Post sosial media dan toko marketplace", en: "Social posts and the marketplace shop" },
      { id: "Merchandise dan alat terapi, dari atas", en: "Merchandise and therapy cards, from above" },
      { id: "Tagline: Building Connection, Unlocking Communication", en: "The tagline: Building Connection, Unlocking Communication" },
      { id: "Birru Sans, typeface untuk brandnya", en: "Birru Sans, the brand's own typeface" },
    ]),
  },
  {
    slug: "backslash-creative",
    title: "Backslash Creative",
    category: "brand",
    roleGroup: "brand",
    discipline: { id: "Identitas brand", en: "Brand identity" },
    industry: { id: "Studio kreatif", en: "Creative studio" },
    year: "2022",
    duration: { id: "Jan - Apr 2022, 4 bulan", en: "Jan - Apr 2022, 4 months" },
    role: { id: "Brand Designer", en: "Brand Designer" },
    client: { id: "Backslash Creative Nusantara", en: "Backslash Creative Nusantara" },
    teaser: {
      id: "Varian logo, palet, sistem pola, dan materi marketplace.",
      en: "Logo variations, palette, pattern system, and marketplace collateral.",
    },
    summary: {
      id: "Identitas untuk sebuah studio kreatif, disusun dalam lima bagian: varian logo, warna, tipografi, pola, dan brandnya saat dipakai. Polanya yang paling banyak bekerja, karena brand studio lebih sering muncul sebagai latar ketimbang sebagai logo.",
      en: "Identity for a creative studio, built in five parts: logo variations, colour, typography, pattern, and the brand in action. The pattern does most of the heavy lifting, because a studio brand shows up more often as a background than as a logo.",
    },
    cover: shotCover("backslash-creative"),
    tags: ["Branding", "Logo", "Pattern"],
    gridSize: "small",
    problem: { id: "Brand studio kreatif lebih sering muncul sebagai latar ketimbang sebagai logo. Yang dibutuhkan bukan mark yang bagus saja, tapi sesuatu yang tetap dikenali di ukuran thumbnail.", en: "A creative studio's brand shows up as a background far more often than as a logo. What it needs is not just a good mark but something still recognisable at thumbnail size." },
    sections: [
      {
        heading: { id: "Empat warna, kontras tinggi", en: "Four colours, high contrast" },
        body: {
          id: "Satu merah hangat melawan navy pekat dan hitam nyaris murni, di atas dasar putih tulang. Paletnya sengaja sedikit: itu memaksa pola dan hurufnya yang membawa karakter.",
          en: "A single warm red against a deep navy and near black, with an off white ground. Small palette on purpose: it forces the pattern and the type to carry the personality.",
        },
      },
      {
        heading: { id: "Pola sebagai identitas sebenarnya", en: "Pattern as the real identity" },
        body: {
          id: "Sistem polanya memperluas logo ke permukaan yang kalau dipasangi mark akan terasa terlalu harfiah, dan itu yang bikin sebuah post masih dikenali di ukuran thumbnail.",
          en: "The pattern system extends the logo into surfaces where a mark would be too literal, and it is what makes a post recognisable at thumbnail size.",
        },
      },
    ],
    palette: [
      { name: "Carnation", hex: "#EF5354" },
      { name: "Rhino", hex: "#2A455E" },
      { name: "Cod Gray", hex: "#0A0A0A" },
      { name: "Wild Sand", hex: "#F5F5F5" },
    ],
    gallery: shots("backslash-creative", [
      { id: "Varian logo", en: "Logo variations" },
      { id: "Mural pola di pintu masuk studio", en: "The pattern as a mural at the studio entrance" },
      { id: "Post Instagram dengan pola brand", en: "An Instagram post in the brand pattern" },
      { id: "Deck presentasi studio", en: "The studio's pitch deck" },
      { id: "Merchandise studio, dari atas", en: "Studio merchandise, from above" },
      { id: "Brand guidelines yang dipakai tim", en: "The brand guidelines in use" },
      { id: "Warna, pola, dan wordmark", en: "Colour, pattern, and the wordmark" },
    ]),
  },
  {
    slug: "vjatre-skincare",
    title: "VJatre Skincare",
    category: "brand",
    roleGroup: "brand",
    discipline: { id: "Brand dan sosial", en: "Brand and social" },
    industry: { id: "Skincare", en: "Skincare" },
    year: "2022",
    duration: { id: "Jan - Apr 2022, 4 bulan", en: "Jan - Apr 2022, 4 months" },
    role: { id: "Brand Designer", en: "Brand Designer" },
    client: {
      id: "Backslash Creative Nusantara, untuk Vjatre",
      en: "Backslash Creative Nusantara, for Vjatre",
    },
    teaser: {
      id: "Identitas, bahasa pola, dan sistem media sosial untuk sebuah label skincare.",
      en: "Identity, pattern language, and a social media system for a skincare label.",
    },
    summary: {
      id: "Brand skincare harus terlihat konsisten di rak, di layar ponsel, dan di feed. VJatre dapat logo primer dan sekunder plus dua alternatif, set ikon yang menyertainya, satu pola, dan sistem template sosial yang berdiri di atas empat warna yang sama.",
      en: "A skincare brand needs to look consistent on a shelf, on a phone, and in a feed. VJatre got a primary and secondary logo plus two alternates, a matching icon set, a pattern, and a social template system built on the same four colours.",
    },
    cover: shotCover("vjatre-skincare"),
    tags: ["Branding", "Social", "Packaging"],
    gridSize: "small",
    problem: { id: "Brand skincare harus konsisten di tiga tempat sekaligus: rak, layar ponsel, dan feed. Dan hampir semua label skincare berebut palet mint yang sama.", en: "A skincare brand has to hold in three places at once: a shelf, a phone, and a feed. And nearly every skincare label is competing over the same mint palette." },
    sections: [
      {
        heading: { id: "Empat mark, empat ikon", en: "Four marks, four icons" },
        body: {
          id: "Primer, sekunder, dan dua alternatif, masing-masing dengan ikon satu huruf yang menyertainya. Alternatifnya ada supaya brandnya tidak pernah harus dipaksa gepeng atau diwarnai asal demi muat di satu penempatan.",
          en: "Primary, secondary, and two alternates, each with a matching single letter icon. The alternates exist so the brand never has to be squeezed or recoloured badly to fit a placement.",
        },
      },
      {
        heading: { id: "Hijau dan emas", en: "Green and gold" },
        body: {
          id: "Hijau tua yang teredam sebagai dasar dengan aksen amber hangat, sengaja menjauh dari palet mint segar yang dipakai hampir semua label skincare lain.",
          en: "A deep muted green as the base with a warm amber accent, kept away from the fresh mint palette every other skincare label reaches for.",
        },
      },
    ],
    palette: [
      { name: "Heavy Metal", hex: "#2F3F2C" },
      { name: "Sun", hex: "#FDB117" },
      { name: "Dune", hex: "#362F2E" },
      { name: "Cod Gray", hex: "#0A0A0A" },
    ],
    gallery: shots("vjatre-skincare", [
      { id: "Logo dan ikon VJatre", en: "The VJatre logo and icon" },
      { id: "Di meja wastafel", en: "On a bathroom vanity" },
      { id: "Post bahan alami di Instagram", en: "An ingredient post on Instagram" },
      { id: "Sistem konten sosial media", en: "The social media content system" },
      { id: "Produk dan bahan alaminya, dari atas", en: "The products and their ingredients, from above" },
      { id: "Serum saat dipakai", en: "The serum in use" },
      { id: "Warna brand", en: "Brand colours", file: "08-board" },
    ]),
  },
  {
    slug: "probe",
    title: "ProBe",
    category: "brand",
    roleGroup: "brand",
    discipline: { id: "Art direction produk", en: "Product art direction" },
    industry: { id: "Aplikasi diskon dan promo", en: "Discount and promo app" },
    year: "2022",
    duration: { id: "2022", en: "2022" },
    role: { id: "Graphic Designer", en: "Graphic Designer" },
    client: { id: "ProBe", en: "ProBe" },
    teaser: {
      id: "Thumbnail store, desain promo, dan ilustrasi state untuk aplikasi diskon dan promo.",
      en: "Store thumbnails, promo design, and UI state illustration for a discount and promo app.",
    },
    summary: {
      id: "ProBe aplikasi mobile yang mengumpulkan diskon dan promo di Indonesia dalam satu tempat, supaya tidak ada lagi yang harus menyisir lima situs brand dan lima feed brand untuk menemukannya. Saya pegang desain promosinya dan lapisan ilustrasi di dalam aplikasinya.",
      en: "ProBe is a mobile app that collects discounts and promos in Indonesia in one place, so nobody has to trawl five brand sites and five brand feeds to find them. I handled the promotional design and the illustration layer inside the app.",
    },
    cover: shotCover("probe"),
    tags: ["App Store", "Illustration", "Promo"],
    gridSize: "large",
    problem: { id: "Mencari diskon dan promo di Indonesia berarti menyisir situs dan feed lima brand berbeda. ProBe mengumpulkan itu di satu tempat, tapi aplikasinya sendiri harus ditemukan dulu di Google Play.", en: "Finding discounts and promos in Indonesia means trawling five brand sites and five brand feeds. ProBe collects them in one place, but the app itself has to be found on Google Play first." },
    sections: [
      {
        heading: { id: "Menang di thumbnail", en: "Winning the thumbnail" },
        body: {
          id: "Aplikasi promo hidup atau mati di listing Google Play. Thumbnail storenya harus terbaca penawarannya di ukuran sebesar kuku, dan itu yang menentukan seluruh bahasa visualnya: huruf tebal, satu blok warna, satu ide per frame.",
          en: "A promo app lives or dies on the Google Play listing. The store thumbnails had to read the offer at the size of a fingernail, which set the whole visual language: heavy type, one colour block, one idea per frame.",
        },
      },
      {
        heading: { id: "Ilustrasi sebagai state antarmuka", en: "Illustration as an interface state" },
        body: {
          id: "Tiap ilustrasi di dalam aplikasi lewat tiga tahap: sketsa, komposisi di layar aplikasi, lalu hasil akhir, digambar supaya duduk di dalam layarnya, bukan mengambang di atasnya.",
          en: "Each in-app illustration went sketch, then mobile app composition, then final result, drawn to sit inside the screen rather than float on it.",
        },
      },
    ],
    gallery: shots("probe", [
      { id: "Listing Google Play di tangan", en: "The Google Play listing in hand" },
      { id: "Banner promo sebagai kartu cetak", en: "Promo banners as printed cards" },
      { id: "Di meja kafe", en: "On a cafe table" },
      { id: "Tiga state ilustrasi di aplikasi", en: "Three illustrated in-app states" },
      { id: "Dari sketsa ke ilustrasi akhir", en: "Sketch to final illustration" },
      { id: "Mencari promo di mal", en: "Hunting promos at the mall" },
      { id: "Papan brand ProBe", en: "The ProBe brand board" },
    ]),
  },
  {
    slug: "rt-pintar",
    title: "RT Pintar",
    category: "brand",
    roleGroup: "brand",
    discipline: { id: "Ikon dan ilustrasi", en: "Icons and illustration" },
    industry: { id: "Administrasi warga", en: "Neighbourhood administration" },
    year: "2022",
    duration: { id: "2022", en: "2022" },
    role: { id: "Inisiatif sendiri", en: "Self-directed" },
    client: { id: "Project pribadi", en: "Personal project" },
    teaser: {
      id: "Redesain atas inisiatif sendiri: dua belas ikon kategori dan satu set empty state.",
      en: "Self-directed redesign: a twelve icon category set and a full set of empty states.",
    },
    summary: {
      id: "Redesain pribadi untuk RT Pintar, aplikasi administrasi lingkungan. Tidak ada brief, tidak ada klien, dan justru itu yang membuatnya jadi tempat yang pas untuk menggarap satu set ikon dan empty state dengan benar.",
      en: "A personal redesign of RT Pintar, a neighbourhood administration app. No brief and no client, which made it the right place to work out an icon set and a full set of empty states properly.",
    },
    cover: "/work/shots/rt-pintar/01.webp",
    tags: ["Icons", "Illustration", "Redesign"],
    gridSize: "small",
    problem: { id: "Aplikasi administrasi warga penuh dengan layar yang muncul justru saat tidak ada apa-apa: belum ada tugas, kotak masuk kosong, internet putus. Layar-layar itu yang paling sering ditinggalkan sebagai kotak abu-abu berisi satu kalimat.", en: "A neighbourhood administration app is full of screens that appear precisely when there is nothing there: no task yet, empty inbox, no connection. Those are the screens most often left as a grey box with one sentence in it." },
    sections: [
      {
        heading: { id: "Dua belas ikon kategori", en: "Twelve category icons" },
        body: {
          id: "Polling, broadcast, tagihan, laporan, surat, riwayat, voucher, e-money, listrik, keuangan, panik, dan kuota. Satu grid, satu ketebalan garis, jadi satu baris ikon terbaca sebagai satu set, bukan dua belas gambar yang kebetulan bersebelahan.",
          en: "Polling, broadcast, bill, report, mail, history, voucher, e-money, electricity, financial, panic, and mobile data. One grid, one stroke weight, so a row of them reads as a set rather than twelve separate drawings.",
        },
      },
      {
        heading: { id: "State yang jarang didesain", en: "States nobody designs" },
        body: {
          id: "Tidak ada tugas, kotak masuk kosong, dan tidak ada internet. Tiga layar yang muncul justru ketika ada yang hilang, dan tiga layar yang di kebanyakan produk dibiarkan jadi kotak abu-abu dengan satu kalimat di dalamnya.",
          en: "No task, inbox empty, and no internet. The three screens a user hits when something is missing, and the three most products leave as a grey box with a sentence in it.",
        },
      },
    ],
    gallery: [
      {
        src: "/work/shots/rt-pintar/02.webp",
        caption: { id: "Dua belas ikon kategori sebagai stiker", en: "The twelve category icons as stickers" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/covers/rt-pintar.webp",
        caption: { id: "Konsep redesain ikon", en: "The icon redesign concept" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/rtpintar.webp",
        caption: { id: "Set ikon kategori", en: "Category icon set" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/rtpintar-states.webp",
        caption: { id: "Empty state dan error state", en: "Empty and error states" },
        width: 2048,
        height: 1536,
      },
    ],
  },
  {
    slug: "abahchan",
    title: "Abahchan",
    category: "type",
    roleGroup: "type",
    discipline: { id: "Desain font", en: "Type design" },
    industry: { id: "Project pribadi", en: "Personal project" },
    year: "2020",
    duration: { id: "2020", en: "2020" },
    role: { id: "Font Designer", en: "Font Designer" },
    client: { id: "Project pribadi", en: "Personal project" },
    teaser: {
      id: "Display bersudut tumpul, 74 karakter, digambar sendiri dari nol.",
      en: "Rounded display face, 74 glyphs, drawn from scratch.",
    },
    summary: {
      id: "Abahchan huruf display dengan sudut yang ditumpulkan, dibuat sebagai project pribadi di 2020. Isinya cukup untuk judul: huruf besar, huruf kecil, angka, dan sembilan tanda baca. Tidak lebih, karena memang tidak dipakai untuk teks panjang.",
      en: "Abahchan is a rounded display face, drawn as a personal project in 2020. It carries what a headline needs: caps, lowercase, figures, and nine punctuation marks. Nothing more, because it was never meant for running text.",
    },
    cover: "/work/shots/abahchan/00-cover.webp",
    tags: ["Type Design", "Display"],
    gridSize: "small",
    problem: { id: "Huruf display cuma dipakai di judul, tapi banyak project font berhenti di tengah jalan karena penulisnya mengejar set lengkap sejak awal.", en: "A display face only ever sets titles, yet plenty of type projects stall because they chase a complete set from the start." },
    results: [
      { id: "74 karakter: huruf besar, huruf kecil, angka, dan sembilan tanda baca.", en: "74 glyphs: caps, lowercase, figures, and nine punctuation marks." },
    ],
    sections: [
      {
        heading: { id: "Sebatas yang dipakai", en: "Only what gets used" },
        body: {
          id: "74 karakter. Huruf besar, huruf kecil, angka, dan tanda baca seperlunya. Menggambar set lengkap dengan diakritik untuk huruf yang cuma dipakai di judul cuma menunda selesainya.",
          en: "74 glyphs: caps, lowercase, figures, and the punctuation a headline actually reaches for. Drawing a full accented set for a face that only ever sets titles would have delayed finishing it.",
        },
      },
    ],
    specimen: {
      family: "Abahchan",
      glyphs: 74,
      sample: { id: "Halo dunia", en: "Hello world" },
      styles: [{"label": "Regular", "weight": 400}],
      characters: ["!", "\"", "'", ",", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "?", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    },
    gallery: [
      {
        src: "/work/shots/abahchan/tp-01-poster.webp",
        caption: { id: "Abah Chan, dirender dari file font aslinya", en: "Abah Chan, rendered from the font file itself" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/shots/abahchan/tp-02-glyphs.webp",
        caption: { id: "Set karakter", en: "The character set" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/shots/abahchan/tp-03-waterfall.webp",
        caption: { id: "Dari ukuran display sampai teks kecil", en: "From display size down to small text" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/type-abahchan.webp",
        caption: { id: "Set karakter Abahchan", en: "The Abahchan character set" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/shots/abahchan/01.webp",
        caption: { id: "Dipakai di kedai kopi", en: "In use at a coffee shop" },
        width: 2048,
        height: 1449,
      },
    ],
  },
  {
    slug: "beembo",
    title: "BeemBO",
    category: "type",
    roleGroup: "type",
    discipline: { id: "Desain font", en: "Type design" },
    industry: { id: "Project pribadi", en: "Personal project" },
    year: "2020",
    duration: { id: "2020", en: "2020" },
    role: { id: "Font Designer", en: "Font Designer" },
    client: { id: "Project pribadi", en: "Personal project" },
    teaser: {
      id: "197 karakter, Latin lengkap sampai diakritik, project pribadi 2020.",
      en: "197 glyphs, a full Latin set down to the diacritics, personal project from 2020.",
    },
    summary: {
      id: "BeemBO yang paling jauh digarap dari empat font ini: 197 karakter, termasuk 94 karakter beraksen di rentang Latin-1. Artinya bisa menyusun bahasa Eropa Barat, bukan cuma bahasa Inggris.",
      en: "BeemBO is the furthest along of the four: 197 glyphs, including 94 accented characters across the Latin-1 range. That is enough to set Western European languages, not just English.",
    },
    cover: "/work/shots/beembo/00-cover.webp",
    tags: ["Type Design", "Latin Extended"],
    gridSize: "small",
    problem: { id: "Font yang cuma punya A sampai Z hanya bisa dipakai penulisnya sendiri. Begitu ada nama dengan aksen, hurufnya jatuh ke font lain.", en: "A face with only A to Z is usable by its author and nobody else. The moment an accented name appears, the text falls back to another font." },
    results: [
      { id: "197 karakter, termasuk 94 karakter beraksen di rentang Latin-1.", en: "197 glyphs, including 94 accented characters across the Latin-1 range." },
    ],
    sections: [
      {
        heading: { id: "Kenapa diakritiknya digambar", en: "Why the accents got drawn" },
        body: {
          id: "Menggambar A sampai Z itu bagian yang mudah. Yang menentukan sebuah font bisa dipakai orang lain justru aksen: tinggi tanda, jaraknya ke huruf, dan apakah masih rapi waktu ditumpuk di huruf kapital.",
          en: "Drawing A to Z is the easy half. What decides whether a face is usable by anyone else is the accents: how high the marks sit, how far they clear the letter, and whether they still hold on a capital.",
        },
      },
    ],
    specimen: {
      family: "BeemBO",
      glyphs: 197,
      sample: { id: "Halo dunia", en: "Hello world" },
      styles: [{"label": "Regular", "weight": 400}],
      characters: ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"],
    },
    gallery: [
      {
        src: "/work/shots/beembo/tp-01-poster.webp",
        caption: { id: "BeemBO, dirender dari file font aslinya", en: "BeemBO, rendered from the font file itself" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/shots/beembo/tp-02-glyphs.webp",
        caption: { id: "Set karakter", en: "The character set" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/shots/beembo/tp-03-waterfall.webp",
        caption: { id: "Dari ukuran display sampai teks kecil", en: "From display size down to small text" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/type-beembo.webp",
        caption: { id: "Set karakter BeemBO", en: "The BeemBO character set" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/shots/beembo/01.webp",
        caption: { id: "Dipakai di gerobak kebab", en: "In use on a kebab cart" },
        width: 2048,
        height: 1449,
      },
    ],
  },
  {
    slug: "jablo",
    title: "Jablo",
    category: "type",
    roleGroup: "type",
    discipline: { id: "Desain font", en: "Type design" },
    industry: { id: "Project pribadi", en: "Personal project" },
    year: "2020",
    duration: { id: "2020", en: "2020" },
    role: { id: "Font Designer", en: "Font Designer" },
    client: { id: "Project pribadi", en: "Personal project" },
    teaser: {
      id: "Display rapat, 100 karakter, dibuat untuk judul yang harus muat.",
      en: "Condensed display, 100 glyphs, made for headlines that have to fit.",
    },
    summary: {
      id: "Jablo huruf display yang dirapatkan, dengan 100 karakter termasuk satu set tanda baca penuh. Dibuat untuk keadaan yang sering ada di desain: judulnya panjang, kolomnya sempit.",
      en: "Jablo is a condensed display face with 100 glyphs, including a full punctuation set. Drawn for a situation that keeps coming up in layout: the headline is long and the column is not wide.",
    },
    cover: "/work/shots/jablo/00-cover.webp",
    tags: ["Type Design", "Condensed"],
    gridSize: "small",
    problem: { id: "Judul panjang, kolom sempit. Jalan pintasnya menggepengkan huruf lewat transformasi, dan itu merusak tebal batangnya.", en: "Long headline, narrow column. The shortcut is squeezing a face with a transform, and that ruins its stems." },
    results: [
      { id: "100 karakter, termasuk set tanda baca penuh.", en: "100 glyphs, including a full punctuation set." },
    ],
    sections: [
      {
        heading: { id: "Rapat, bukan digepengkan", en: "Condensed, not squashed" },
        body: {
          id: "Menggepengkan huruf lewat transformasi merusak tebal batangnya: garis tegak jadi tipis, garis datar tetap tebal. Jablo digambar sempit sejak awal, jadi tebalnya tetap benar.",
          en: "Squeezing a face with a transform ruins its stems: the uprights go thin while the horizontals stay heavy. Jablo was drawn narrow from the start, so the weight stays true.",
        },
      },
    ],
    specimen: {
      family: "Jablo",
      glyphs: 100,
      sample: { id: "Halo dunia", en: "Hello world" },
      styles: [{"label": "Regular", "weight": 400}],
      characters: ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~"],
    },
    gallery: [
      {
        src: "/work/shots/jablo/tp-01-poster.webp",
        caption: { id: "Jablo, dirender dari file font aslinya", en: "Jablo, rendered from the font file itself" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/shots/jablo/tp-02-glyphs.webp",
        caption: { id: "Set karakter", en: "The character set" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/shots/jablo/tp-03-waterfall.webp",
        caption: { id: "Dari ukuran display sampai teks kecil", en: "From display size down to small text" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/type-jablo.webp",
        caption: { id: "Set karakter Jablo", en: "The Jablo character set" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/shots/jablo/01.webp",
        caption: { id: "Dipakai di tote bag dan buku catatan", en: "In use on a tote bag and a notebook" },
        width: 2048,
        height: 1449,
      },
    ],
  },
  {
    slug: "geoleo",
    title: "Geoleo",
    category: "type",
    roleGroup: "type",
    discipline: { id: "Desain font", en: "Type design" },
    industry: { id: "Project pribadi", en: "Personal project" },
    year: "Undated",
    duration: { id: "Tidak tercatat", en: "Undated" },
    role: { id: "Font Designer", en: "Font Designer" },
    client: { id: "Project pribadi", en: "Personal project" },
    teaser: {
      id: "Display geometris, satu berat Bold, 104 karakter.",
      en: "Geometric display, one Bold weight, 104 glyphs.",
    },
    summary: {
      id: "Geoleo dirilis hanya dalam satu berat, Bold, dengan 104 karakter. Satu berat itu keputusan yang jujur untuk huruf display: kalau cuma dipakai di ukuran besar, berat tipis tidak akan pernah dipanggil.",
      en: "Geoleo ships in one weight, Bold, with 104 glyphs. A single weight is an honest call for a display face: if it only ever sets large, the lighter weights never get reached for.",
    },
    cover: "/work/shots/geoleo/00-cover.webp",
    tags: ["Type Design", "Geometric"],
    gridSize: "small",
    problem: { id: "Keluarga font sering dianggap belum selesai kalau beratnya baru satu, padahal huruf display jarang dipanggil di berat tipis.", en: "A family is often treated as unfinished at one weight, even though a display face is rarely reached for in the light ones." },
    results: [
      { id: "104 karakter dalam satu berat Bold.", en: "104 glyphs in a single Bold weight." },
    ],
    sections: [
      {
        heading: { id: "Satu berat, selesai", en: "One weight, finished" },
        body: {
          id: "Keluarga font tidak selesai karena beratnya banyak. Selesai kalau yang dirilis benar-benar dipakai. Geoleo dirilis Bold saja, dan itu berat yang memang dipanggil huruf display.",
          en: "A family is not finished because it has many weights. It is finished when what shipped gets used. Geoleo shipped Bold, which is the weight a display face is actually reached for.",
        },
      },
    ],
    specimen: {
      family: "Geoleo",
      glyphs: 104,
      sample: { id: "Halo dunia", en: "Hello world" },
      styles: [{"label": "Bold", "weight": 700}],
      characters: ["!", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "}", "~", "£", "¥", "·"],
    },
    gallery: [
      {
        src: "/work/shots/geoleo/tp-01-poster.webp",
        caption: { id: "Geoleo, dirender dari file font aslinya", en: "Geoleo, rendered from the font file itself" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/shots/geoleo/tp-02-glyphs.webp",
        caption: { id: "Set karakter", en: "The character set" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/shots/geoleo/tp-03-waterfall.webp",
        caption: { id: "Dari ukuran display sampai teks kecil", en: "From display size down to small text" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/type-geoleo.webp",
        caption: { id: "Set karakter Geoleo", en: "The Geoleo character set" },
        width: 2048,
        height: 1536,
      },
    ],
  },
  {
    slug: "samase-sports-club",
    title: "SAMASE Sports Club",
    category: "strategy",
    roleGroup: "marketing",
    discipline: { id: "Strategi marketing", en: "Marketing strategy" },
    industry: { id: "Kebugaran dan olahraga", en: "Fitness and sport" },
    year: "2026",
    duration: { id: "Apr - Agu 2026, 4 bulan", en: "Apr - Aug 2026, 4 months" },
    role: { id: "Head of Marketing Strategy", en: "Head of Marketing Strategy" },
    client: { id: "SAMASE Sports Club", en: "SAMASE Sports Club" },
    teaser: {
      id: "Strategi marketing dari pre-launch sampai grand opening, plus landing page dan back office yang menjalankannya.",
      en: "Marketing strategy from pre-launch to grand opening, plus the landing page and the back office that runs it.",
    },
    summary: {
      id: "SAMASE Sports Club buka dengan tiga lini sekaligus: Fitspace, Physio, dan Padel. Saya pegang strategi marketingnya selama empat bulan menjelang pembukaan, dari positioning sampai orang benar-benar membayar keanggotaan.",
      en: "SAMASE Sports Club opened with three lines at once: Fitspace, Physio, and Padel. I ran the marketing strategy for the four months leading to opening, from positioning through to people actually paying for a membership.",
    },
    cover: shotCover("samase-sports-club"),
    link: "https://samasesportsclub.com",
    linkLabel: "samasesportsclub.com",
    tags: ["Marketing Strategy", "Landing Page", "Back Office"],
    gridSize: "large",
    problem: {
      id: "Gym baru tidak punya rekam jejak. Tidak ada anggota lama yang bisa bercerita, tidak ada review, tidak ada bukti bahwa tempatnya layak. Yang ada cuma bangunan yang belum buka dan tanggal grand opening yang tidak bisa digeser. Tiga lini pula, dan tiap lini menarik orang yang berbeda.",
      en: "A new gym has no track record. No existing members to vouch for it, no reviews, no proof the place is worth the money. Just a building that has not opened and a grand opening date that will not move. Three lines, too, each pulling a different kind of person.",
    },
    constraints: [
      {
        id: "Eksekusi ads buying dan kontrol budget dipegang pihak yang ditunjuk klien. Arahan strategis, evaluasi performa, dan koordinasinya tetap di saya.",
        en: "Ads buying and budget control sat with a party the client appointed. Strategy, performance review, and coordination stayed with me.",
      },
      {
        id: "Freelance berbasis output tanpa jam kerja tetap, tapi campaign berjalan setiap hari dan keputusan tidak bisa menunggu.",
        en: "Freelance and output based, no fixed hours, but a campaign runs every day and decisions do not wait.",
      },
      {
        id: "Sebagian besar konten harus selesai di dalam tim supaya kecepatannya terjaga. Vendor hanya untuk produksi besar.",
        en: "Most content had to be solvable in house to keep the pace. Vendors only for the big productions.",
      },
    ],
    results: [
      { id: "Landing page live di samasesportsclub.com, dengan halaman terpisah untuk Fitspace, Physio, dan Padel.", en: "The landing page is live at samasesportsclub.com, with separate pages for Fitspace, Physio, and Padel." },
      { id: "Back office dipakai tim untuk pendaftaran, pipeline lead, agenda, kasir, transaksi, rekonsiliasi, laporan, dan analitik.", en: "The back office runs registration, the lead pipeline, the agenda, cashier, transactions, reconciliation, reporting, and analytics for the team." },
      { id: "Dokumentasi pemakaian ditulis supaya sistemnya bisa diserahkan, bukan bergantung pada saya.", en: "Usage documentation was written so the system could be handed over rather than depend on me." },
    ],
    sections: [
      {
        heading: { id: "Menyusun funnelnya dulu", en: "Building the funnel first" },
        body: {
          id: "Sebelum satu iklan pun jalan, funnelnya dipasang lengkap: awareness, lead generation, lead management dan segmentasi, lalu conversion dan closing. Yang paling sering bocor bukan iklannya, tapi jarak antara orang meninggalkan nomor dan orang membayar. Di back office funnel itu jadi papan pipeline lima kolom, Baru, Follow Up, Trial, Waiting Payment, dan Closing, jadi tim bisa melihat di tahap mana lead menumpuk.",
          en: "Before a single ad ran, the funnel went in whole: awareness, lead generation, lead management and segmentation, then conversion and closing. What leaks is rarely the ad. It is the distance between someone leaving a number and someone paying. In the back office that funnel became a five column pipeline board, New, Follow Up, Trial, Waiting Payment, and Closing, so the team can see where leads pile up.",
        },
      },
      {
        heading: { id: "Satu strategi, banyak channel", en: "One strategy, many channels" },
        body: {
          id: "Paid ads di Meta dan TikTok, produksi konten, social media, dan event offline berjalan bersamaan. Yang saya jaga bukan masing-masing channel, tapi apakah semuanya menunjuk ke arah yang sama. Positioning dan messaging ditentukan lebih dulu supaya tim tidak menebak-nebak tiap kali membuat materi.",
          en: "Paid ads on Meta and TikTok, content production, social media, and offline events all ran at once. What I kept an eye on was not each channel but whether they pointed the same way. Positioning and messaging were settled first so the team was not guessing every time it made something.",
        },
        bullets: [
          { id: "Paid advertising: arahan strategis dan evaluasi, eksekusi buying di pihak yang ditunjuk klien.", en: "Paid advertising: strategy and review here, buying with the client's appointed party." },
          { id: "Konten: desain feed dan carousel, editing reels dan video pendek, materi promosi harian.", en: "Content: feed and carousel design, reels and short-form editing, the daily promotional material." },
          { id: "Offline: konsep event dan exhibition, alur pengumpulan leads di booth, sampai integrasinya kembali ke funnel. Salah satunya booth 3x3 di Rihla Series Halal Fair 2026, JCC Senayan, dengan talk show Longevity Starts with Movement dan postural screening gratis.", en: "Offline: event and exhibition concepts, the lead capture flow at the booth, and how it fed back into the funnel. One of them was a 3x3 booth at the Rihla Series Halal Fair 2026 at JCC Senayan, with a Longevity Starts with Movement talk and free postural screening." },
        ],
      },
      {
        heading: { id: "Satu payung, banyak pintu", en: "One umbrella, many doors" },
        body: {
          id: "SAMASE bukan satu gym, tapi satu payung dengan beberapa sub-brand: Fitspace, Physio by Bebas Cedera, Private Padel, SAMA by SAMASE untuk kafe, dan Kids Academy. Masing-masing punya logo dan warnanya sendiri, tapi tetap harus terbaca sebagai satu klub. Pesan marketing saya susun mengikuti struktur yang sama dengan signage di lokasi: dari gerbang dan pylon di depan, sampai pintu tiap unit di dalam.",
          en: "SAMASE is not one gym but an umbrella over several sub-brands: Fitspace, Physio by Bebas Cedera, Private Padel, SAMA by SAMASE for the cafe, and Kids Academy. Each has its own mark and colours, yet all of it has to read as one club. I built the marketing messages on the same structure as the signage on site: from the gate and the pylon out front to the door of each unit inside.",
        },
      },
      {
        heading: { id: "Landing page-nya saya bangun sendiri", en: "I built the landing page myself" },
        body: {
          id: "Campaign butuh tempat mendarat, dan menunggu vendor berarti kehilangan minggu. Jadi landing page-nya saya kerjakan sendiri: satu halaman payung plus halaman terpisah untuk Fitspace, Physio, dan Padel, karena tiga lini itu menarik orang yang berbeda. Fitspace bicara soal olahraga tanpa tekanan, Physio soal pulih secara privat bersama Klinik Bebas Cedera, Padel soal lapangan yang tertutup dari luar.",
          en: "A campaign needs somewhere to land, and waiting on a vendor costs weeks. So I built the landing page: one umbrella page plus separate pages for Fitspace, Physio, and Padel, because the three lines pull different people. Fitspace talks about training without pressure, Physio about recovering in private with Klinik Bebas Cedera, Padel about a court shut away from the outside.",
        },
        bullets: [
          { id: "Dua bahasa, dan tiap section bisa dimatikan atau dinyalakan tanpa menyentuh kode.", en: "Two languages, and any section can be switched off without touching code." },
          { id: "A/B testing headline langsung dari panelnya, jadi copy diuji bukan diperdebatkan.", en: "Headline A/B testing from the panel, so copy gets tested instead of argued about." },
          { id: "Tombol Early Access di semua halaman mengarah ke satu form pendaftaran yang sama.", en: "An Early Access button on every page leads to the same registration form." },
        ],
      },
      {
        heading: { id: "Founding Member dan harga early bird", en: "Founding Members and early bird pricing" },
        body: {
          id: "Gym yang belum buka tidak bisa menjual pengalaman, jadi yang dijual adalah posisi: menjadi anggota pertama dengan harga yang tidak akan kembali. Halaman pricing menampilkan paket per unit dengan harga coret dan label paling laku, dan logika Founding Member menempel di halaman, bukan ditulis ulang tiap kampanye.",
          en: "A gym that has not opened cannot sell the experience, so what it sells is a position: being among the first members at a price that will not come back. The pricing page lays out packages per unit with struck-through prices and a most-popular tag, and the Founding Member logic lives in the page rather than being rewritten each campaign.",
        },
      },
      {
        heading: { id: "Lalu back office yang menjalankannya", en: "Then the back office that runs it" },
        body: {
          id: "Iklan mengumpulkan lead, tapi lead tidak jadi member sendiri. Ada yang harus mencatat, menjadwalkan trial, menagih, dan menutup. Itu semua ada di back office yang saya bangun, dan halaman berandanya dimulai dari pertanyaan yang paling berguna untuk tim pagi itu: apa yang perlu ditindak hari ini. Transaksi yang belum direkonsiliasi, kredit sesi yang hampir hangus, lead yang jadwal follow-up-nya lewat, dan trial yang belum closing.",
          en: "Ads collect leads, but a lead does not turn itself into a member. Someone has to record it, book the trial, take the money, and close. All of that lives in the back office I built, and its home page opens on the question most useful to the team that morning: what needs acting on today. Unreconciled transactions, session credits about to expire, leads past their follow-up date, and trials that have not closed.",
        },
      },
      {
        heading: { id: "Dari pendaftaran ke follow-up", en: "From registration to follow-up" },
        body: {
          id: "Setiap pengunjung booth dicatat di Pendaftaran: kontak, domisili, sumber, minat per unit, dan suhu lead. Data itu langsung bisa dipilih di kasir, tersinkron ke CRM, dan masuk ke pipeline. Tiap kartu lead menunjukkan sudah berapa jam belum di-follow-up, supaya yang tertinggal kelihatan sebelum dingin.",
          en: "Every booth visitor goes into Registration: contact, area, source, interest per unit, and lead temperature. That record can be picked at the cashier straight away, syncs to the CRM, and lands in the pipeline. Each lead card shows how many hours it has gone without a follow-up, so the ones slipping are visible before they go cold.",
        },
      },
      {
        heading: { id: "Agenda sesi untuk tiga lini", en: "One agenda for three lines" },
        body: {
          id: "PT session, group class, dan sesi physio punya ritme yang berbeda, tapi dipesan dari agenda yang sama. Tampilan hari, minggu, dan bulan, filter per unit, dan klik di jam kosong untuk booking. Padel punya grid court sendiri karena yang dipesan adalah lapangan, bukan pelatih.",
          en: "PT sessions, group classes, and physio sessions run to different rhythms but are booked from one agenda. Day, week, and month views, a filter per unit, and a click on an empty hour to book. Padel gets its own court grid, because what is booked there is a court, not a coach.",
        },
      },
      {
        heading: { id: "Kasir sampai rekonsiliasi", en: "From cashier to reconciliation" },
        body: {
          id: "Penjualan di booth dicatat di kasir: pilih pelanggan yang sudah terdaftar, pilih paket per unit, pasang diskon voucher, bayar dengan QRIS atau transfer. Receipt dikirim lewat WhatsApp atau email sesuai permintaan pelanggan. Di ujungnya, rekonsiliasi mencocokkan transaksi sistem dengan settlement bank lewat upload CSV, jadi selisih ketahuan per unit dan per kanal, bukan di akhir bulan.",
          en: "Sales at the booth go through the cashier: pick a registered customer, pick a package per unit, apply a voucher, pay by QRIS or transfer. The receipt goes out by WhatsApp or email, whichever the customer asks for. At the other end, reconciliation matches system transactions against the bank settlement through a CSV upload, so a gap shows up per unit and per channel rather than at the end of the month.",
        },
        bullets: [
          { id: "Order masuk menunjukkan sisa kredit sesi dan apakah sudah dijadwalkan.", en: "Incoming orders show remaining session credit and whether it has been scheduled." },
          { id: "Paket, voucher, dan template komisi yang tarifnya dipisah per jenis sesi.", en: "Packages, vouchers, and commission templates with rates split by session type." },
          { id: "Impor transaksi lewat tempel data, untuk pindahan dari catatan lama.", en: "Transaction import by pasting data, for moving off the old records." },
        ],
      },
      {
        heading: { id: "Data penjualan yang bisa ditanya", en: "Sales data you can ask questions of" },
        body: {
          id: "Laporan tidak berhenti di omzet. Halaman penjualan memecah pipeline jadi conversion rate, lead berisiko, drop rate, dan trial ke closing. Analitik menampilkan tren omzet harian, omzet per unit, dan paket terlaris untuk stakeholder. Lalu ada AI Command Center: tanya data dalam bahasa biasa, minta forecast, deteksi anomali, atau laporan mingguan, semuanya baca saja dan hanya jalan saat diminta.",
          en: "Reporting does not stop at revenue. The sales page breaks the pipeline into conversion rate, at-risk leads, drop rate, and trial to closing. Analytics shows daily revenue, revenue per unit, and best-selling packages for stakeholders. Then there is an AI Command Center: ask the data in plain language, ask for a forecast, anomaly detection, or a weekly report, all read only and run only on request.",
        },
      },
      {
        heading: { id: "Yang diukur", en: "What got measured" },
        body: {
          id: "Targetnya jelas sejak awal dan tidak berupa jumlah tayangan: minimal 50% okupansi pada masa pre-launch, dihitung dari Founding Member yang sudah membayar sebelum grand opening. Angka itu yang menentukan iklan mana diteruskan, materi mana diganti, dan bagian funnel mana yang perlu dibongkar.",
          en: "The target was set early and it was not impressions: at least 50% occupancy during pre-launch, counted in Founding Members paid up before grand opening. That number decided which ads kept running, which material got replaced, and which part of the funnel had to be taken apart.",
        },
      },
    ],
    gallery: shots("samase-sports-club", [
      { id: "Gerbang SAMASE Sports Club, perspektif sebelum buka", en: "The SAMASE Sports Club gate, a pre-opening perspective", file: "vn-01-gate" },
      { id: "Pipeline lead lima tahap. Data dummy.", en: "The five stage lead pipeline. Dummy data.", file: "bo-03-pipeline" },
      { id: "Konten launch Instagram untuk Physio dan Fitspace", en: "Instagram launch content for Physio and Fitspace", file: "ct-02-launch" },
      { id: "Pylon dengan semua sub-brand", en: "The pylon carrying every sub-brand", file: "vn-02-pylon" },
      { id: "Halaman Fitspace di ponsel", en: "The Fitspace page on a phone", file: "04" },
      { id: "Price list Fitspace, Physio, dan Private Padel", en: "Price lists for Fitspace, Physio, and Private Padel", file: "ct-01-pricelist" },
      { id: "Beranda back office: yang perlu ditindak hari ini. Angka dummy.", en: "Back office home: what needs acting on today. Dummy figures.", file: "bo-01-beranda" },
      { id: "Booth 3x3 pre-launch, dibangun dari desain instalasinya", en: "The 3x3 pre-launch booth, built from its installation design", file: "03-booth-design" },
      { id: "Agenda mingguan semua unit. Data dummy.", en: "The weekly agenda across units. Dummy data.", file: "bo-04-agenda" },
      { id: "Kasir di meja resepsionis", en: "The cashier at the reception desk", file: "02" },
      { id: "Analitik untuk stakeholder. Angka dummy.", en: "Analytics for stakeholders. Dummy figures.", file: "bo-09-insight" },
      { id: "Sales dan deal intelligence. Angka dummy.", en: "Sales and deal intelligence. Dummy figures.", file: "bo-08-sales-intel" },
      { id: "Pendaftaran pengunjung booth. Data dummy.", en: "Booth visitor registration. Dummy data.", file: "bo-02-pendaftaran" },
      { id: "Undangan booth Halal Fair 2026", en: "Invitations to the Halal Fair 2026 booth", file: "ct-04-halal-fair" },
      { id: "Desain instalasi booth 3x3", en: "The 3x3 booth installation design", file: "bd-02" },
      { id: "Denah dan tampak booth", en: "Booth plan and elevations", file: "bd-03" },
      { id: "Grafis booth: dinding, totem, dan roll banner", en: "Booth graphics: walls, totem, and roll banners", file: "bd-07" },
      { id: "Undangan soft opening dan trial court", en: "Soft opening and trial court invitations", file: "ct-03-invitation" },
      { id: "Harga early bird di landing page", en: "Early bird pricing on the landing page", file: "lp-05-pricing" },
      { id: "Lapangan SAMASE Private Padel", en: "The SAMASE Private Padel courts", file: "vn-07-padel-court" },
      { id: "Dinding logo Private Padel", en: "The Private Padel logo wall", file: "vn-05-padel-wall" },
      { id: "Lounge di sisi lapangan Padel", en: "The lounge along the Padel courts", file: "vn-08-padel-lounge" },
      { id: "Pintu masuk Fitspace", en: "The Fitspace entrance", file: "vn-03-fitspace" },
      { id: "Pintu SAMASE Physio by Bebas Cedera", en: "The SAMASE Physio by Bebas Cedera door", file: "vn-04-physio" },
      { id: "Kafe SAMA by SAMASE", en: "The SAMA by SAMASE cafe", file: "vn-06-sama" },
      { id: "Landing page, halaman payung", en: "The landing page, umbrella page", file: "lp-01-home" },
      { id: "Halaman Fitspace", en: "The Fitspace page", file: "lp-02-fitspace" },
      { id: "Halaman Physio", en: "The Physio page", file: "lp-03-physio" },
      { id: "Halaman Padel", en: "The Padel page", file: "lp-04-padel" },
      { id: "Kasir booth", en: "The booth cashier", file: "bo-11-pos" },
      { id: "Order masuk dan kredit sesi. Data dummy.", en: "Incoming orders and session credit. Dummy data.", file: "bo-05-order" },
      { id: "Transaksi dan kirim receipt. Data dummy.", en: "Transactions and receipt sending. Dummy data.", file: "bo-06-transaksi" },
      { id: "Rekonsiliasi dengan settlement bank. Angka dummy.", en: "Reconciliation against the bank settlement. Dummy figures.", file: "bo-07-rekonsiliasi" },
      { id: "AI Command Center", en: "The AI Command Center", file: "bo-10-ai" },
    ]),
  },
  {
    slug: "tokoclippers",
    title: "TokoClippers",
    category: "product",
    roleGroup: "product",
    discipline: { id: "Desain produk", en: "Product design" },
    industry: { id: "Creator economy, platform clipping", en: "Creator economy, clipping platform" },
    year: "2026",
    duration: { id: "Belum tercatat", en: "Not recorded yet" },
    role: { id: "Product Designer", en: "Product Designer" },
    client: { id: "TokoClippers", en: "TokoClippers" },
    teaser: { id: "Platform yang mempertemukan creator dengan clipper, dua sisi dengan kebutuhan yang berlawanan, plus design system-nya sendiri.", en: "A platform pairing creators with clippers, two sides with opposing needs, and the design system underneath it." },
    summary: { id: "TokoClippers mempertemukan creator yang punya konten panjang dengan clipper yang memotongnya jadi klip pendek. Dua sisi itu memakai aplikasi yang sama tapi menginginkan hal yang berlawanan, dan uang berpindah di antara keduanya. Saya merancang keduanya, web dan mobile, di atas design system yang dibangun bersamaan.", en: "TokoClippers pairs creators who have long-form content with clippers who cut it into short clips. The two sides use the same product and want opposite things, and money moves between them. I designed both, web and mobile, on a design system built alongside." },
    cover: shotCover("tokoclippers"),
    tags: ["Product Design", "Design System", "Two-sided"],
    gridSize: "large",
    problem: { id: "Marketplace dua sisi selalu punya masalah yang sama: satu produk, dua orang yang menginginkan hal berlawanan. Creator ingin klipnya banyak, cepat, dan sesuai brief. Clipper ingin project yang jelas bayarannya dan tidak membuang waktu. Kalau salah satu sisi dibuat nyaman dengan mengorbankan yang lain, sisi itu yang pergi.", en: "A two-sided marketplace always has the same problem: one product, two people who want opposite things. A creator wants many clips, quickly, on brief. A clipper wants a job with a clear payout and no wasted effort. Make one side comfortable at the other's expense and that side leaves." },
    constraints: [
      { id: "Uang berpindah di dalam produk, jadi dompet, penarikan saldo, dan riwayat transaksi harus benar sejak versi pertama.", en: "Money moves inside the product, so wallet, withdrawal, and transaction history had to be right from the first version." },
      { id: "Dua platform sekaligus, web dan mobile, dengan komponen yang sama.", en: "Two platforms at once, web and mobile, on the same components." },
    ],
    sections: [
      {
        heading: { id: "Satu produk, dua beranda", en: "One product, two home pages" },
        body: { id: "Clipper dan creator masuk ke aplikasi yang sama lewat pintu yang berbeda. Beranda clipper menaruh project yang bisa diambil di paling atas. Beranda creator menaruh performa project yang sedang berjalan. Navigasi dan komponennya sama, isinya yang berganti sesuai siapa yang masuk.", en: "Clippers and creators enter the same app through different doors. The clipper home leads with jobs that can be taken. The creator home leads with how the running projects are performing. Same navigation, same components; what changes is what the page leads with." },
      },
      {
        heading: { id: "Alur yang menyentuh uang", en: "The flows that touch money" },
        body: { id: "Bagian yang paling tidak boleh membingungkan: membuat project bertahap dengan anggaran dan target per klip, mengajukan lamaran dan menyetujuinya, lalu topup, penarikan saldo, dan riwayat transaksi. Tiap alur punya keadaan gagal, tertunda, dan berhasil yang digambar terpisah, karena di situ orang paling butuh kepastian.", en: "The part that cannot be confusing: creating a project step by step with its budget and per-clip target, applying and approving, then top up, withdrawal, and transaction history. Each flow has its failed, pending, and successful states drawn separately, because that is where people most need to know where they stand." },
        bullets: [
          { id: "Buat Project Baru tiga langkah, termasuk varian eksklusif dengan banner NDA.", en: "A three step project builder, including an exclusive variant with an NDA banner." },
          { id: "Penarikan saldo dengan keadaan gagal, tertunda, dan berhasil.", en: "Balance withdrawal with failed, pending, and successful states." },
          { id: "Autentikasi dua faktor, ganti password, dan verifikasi rekening.", en: "Two factor authentication, password change, and bank account verification." },
        ],
      },
      {
        heading: { id: "Dukungan yang tidak dilempar ke email", en: "Support that is not thrown to email" },
        body: { id: "Tiket CS punya portalnya sendiri untuk kedua sisi, lengkap dengan daftar, detail, dan gelembung chat, ditambah chatbot yang dipanggil dari tombol mengambang. Ini biasanya bagian yang ditunda sampai versi kedua, dan biasanya itu keputusan yang disesali.", en: "Support tickets have their own portal for both sides, with a list, a detail view, and a chat bubble, plus a chatbot reached from a floating button. This is usually postponed to a second version, and that is usually regretted." },
      },
      {
        heading: { id: "Design system di bawahnya", en: "The design system underneath" },
        body: { id: "Fundamentals, Button, Inputfield, Alert, Breadcrumb, Avatar Label, dan Progress bar label masing-masing punya halaman sendiri di file yang sama. Dibangun bersamaan dengan produknya, bukan dirapikan setelahnya, supaya web dan mobile tidak berjalan sendiri-sendiri.", en: "Fundamentals, Button, Inputfield, Alert, Breadcrumb, Avatar Label, and Progress bar label each have their own page in the same file. Built alongside the product rather than tidied up afterwards, so web and mobile do not drift apart." },
      },
    ],
    gallery: shots("tokoclippers", [
      { id: "Dashboard clipper: saldo, views, dan project berjalan", en: "The clipper dashboard: balance, views, and running projects" },
      { id: "Detail project di meja content creator", en: "A project brief on a creator's desk" },
      { id: "Penarikan saldo berhasil", en: "A completed withdrawal" },
      { id: "Buat project dan tiket CS", en: "Creating a project, and a support ticket" },
      { id: "Dashboard creator dan clipper, dari atas", en: "Creator and clipper dashboards, from above" },
      { id: "Clipper mengecek project di malam hari", en: "A clipper checking projects at night" },
      { id: "Logo, warna, huruf, dan komponen", en: "Logo, colour, type, and components" },
    ]),
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);
