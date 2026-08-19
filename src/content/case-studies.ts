/**
 * Long-form project records, in both languages. Everything here is transcribed
 * from the 2025 Product Design and Graphic Design portfolio decks, including
 * the type and colour specifications each project shipped with. The home page
 * cards in site.ts are derived from this file, so the two cannot drift apart.
 */

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

export type CaseStudy = {
  slug: string;
  title: string;
  category: "product" | "brand";
  discipline: L;
  year: string;
  role: L;
  client: L;
  link?: string;
  linkLabel?: string;
  /** One line for the home page card. */
  teaser: L;
  /** Opening paragraph on the detail page. */
  summary: L;
  cover: string;
  tags: string[];
  /** Controls the tile footprint in the brand grid. */
  gridSize: "large" | "small";
  sections: CaseSection[];
  typefaces?: L[];
  palette?: Swatch[];
  gallery: GalleryItem[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "luna-pos",
    title: "Luna POS",
    category: "product",
    discipline: { id: "Product design", en: "Product design" },
    year: "2021 - Present",
    role: { id: "Product Designer", en: "Product Designer" },
    client: { id: "Luna POS", en: "Luna POS" },
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
    cover: "/work/covers/luna-pos.webp",
    tags: ["SaaS", "Product Design", "Design System"],
    gridSize: "large",
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
    gallery: [
      {
        src: "/work/gallery/lunapos-overview.webp",
        caption: {
          id: "Gambaran produk dan kelima permukaannya",
          en: "Product overview and the five surfaces",
        },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/lunapos.webp",
        caption: {
          id: "Back office, dashboard web merchant",
          en: "Back office, the web merchant dashboard",
        },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/gallery/lunapos-app.webp",
        caption: { id: "Kasir di tablet dan ponsel", en: "Tablet and phone point of sale" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/gallery/lunapos-tokoluna.webp",
        caption: { id: "TokoLUNA, toko online merchant", en: "TokoLUNA, the merchant online store" },
        width: 2048,
        height: 1449,
      },
    ],
  },
  {
    slug: "laba-id",
    title: "Laba.id",
    category: "product",
    discipline: { id: "Product design", en: "Product design" },
    year: "2021 - Present",
    role: { id: "Product Designer pertama", en: "First Product Designer" },
    client: { id: "Laba.id", en: "Laba.id" },
    link: "https://laba.id",
    linkLabel: "laba.id",
    teaser: {
      id: "Aplikasi akuntansi untuk UMKM Indonesia, dirancang dari nol sebagai desainer pertama di timnya.",
      en: "Accounting app for Indonesian MSMEs, designed from zero as the first designer on the team.",
    },
    summary: {
      id: "Laba.id itu teman keuangan untuk usaha mikro, kecil, dan menengah: catat transaksi dengan benar tanpa harus paham akuntansi lebih dulu. Idenya muncul September 2020 waktu pandemi, pengembangannya mulai awal 2021, dan saya desainer pertama yang mengerjakannya.",
      en: "Laba.id is a financial companion for micro, small, and medium businesses: record transactions accurately without needing to understand accounting first. The idea started in September 2020 during the pandemic, development began in early 2021, and I was the first designer on it.",
    },
    cover: "/work/covers/laba-id.webp",
    tags: ["Fintech", "Product Design", "Mobile"],
    gridSize: "small",
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
          { id: "Laba Saku, Android, di Google Play", en: "Laba Saku, Android, on Google Play" },
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
    gallery: [
      {
        src: "/work/gallery/laba-overview.webp",
        caption: { id: "Produknya untuk apa", en: "What the product is for" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/gallery/laba-brand.webp",
        caption: { id: "Logo, huruf, dan warna", en: "Logo, type, and colour" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/gallery/laba-bisnis.webp",
        caption: { id: "Laba Bisnis, aplikasi web", en: "Laba Bisnis, the web app" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/gallery/laba-saku.webp",
        caption: { id: "Laba Saku, aplikasi mobile", en: "Laba Saku, the mobile app" },
        width: 2048,
        height: 1449,
      },
    ],
  },
  {
    slug: "singapore-scout-association",
    title: "The Singapore Scout Association",
    category: "product",
    discipline: { id: "Desain web", en: "Web design" },
    year: "2023",
    role: { id: "Desainer, tim landing page", en: "Designer, landing page team" },
    client: { id: "The Singapore Scout Association", en: "The Singapore Scout Association" },
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
    cover: "/work/covers/singapore-scout-association.webp",
    tags: ["Non-profit", "Web Design"],
    gridSize: "small",
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
    gallery: [
      {
        src: "/work/gallery/scout-overview.webp",
        caption: { id: "Asosiasinya siapa", en: "Who the association is" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/gallery/scout-brand.webp",
        caption: {
          id: "Skala huruf dan sistem warna lengkapnya",
          en: "Type scale and the full colour system",
        },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/scout.webp",
        caption: { id: "Landing page-nya", en: "The landing page" },
        width: 2048,
        height: 1449,
      },
    ],
  },
  {
    slug: "andalusclass",
    title: "AndalusClass",
    category: "product",
    discipline: { id: "Desain UI/UX", en: "UI/UX design" },
    year: "2020",
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
    cover: "/work/covers/andalusclass.webp",
    tags: ["EdTech", "UI/UX Design"],
    gridSize: "small",
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
    gallery: [
      {
        src: "/work/gallery/andalusclass-overview.webp",
        caption: { id: "Kenapa sekolahnya butuh ini", en: "Why the school needed it" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/gallery/andalusclass-brand.webp",
        caption: { id: "Huruf dan sistem warnanya", en: "Type and the colour system" },
        width: 2048,
        height: 1449,
      },
      {
        src: "/work/andalusclass.webp",
        caption: { id: "Layar absensi dan penjadwalan", en: "Attendance and scheduling screens" },
        width: 2048,
        height: 1449,
      },
    ],
  },
  {
    slug: "birru-co",
    title: "Birru.co",
    category: "brand",
    discipline: { id: "Identitas brand", en: "Brand identity" },
    year: "2024",
    role: { id: "Creative Designer", en: "Creative Designer" },
    client: { id: "Birru.co", en: "Birru.co" },
    teaser: {
      id: "Sistem logo, varian brandmark, kunci tagline, dan satu typeface yang digambar khusus untuk brandnya.",
      en: "Logo system, brandmark variants, tagline lockups, and a custom typeface drawn for the brand.",
    },
    summary: {
      id: "Identitas lengkap untuk Birru.co, dari logogram sampai materi marketplace. Brandnya jalan dengan typeface sendiri, bukan font berlisensi, dan itu sebabnya wordmark dan huruf di antarmukanya terdengar seperti satu suara.",
      en: "A full identity for Birru.co, taken from the logogram through to the marketplace collateral. The brand ships with its own typeface rather than a licensed one, which is why the wordmark and the interface type feel like the same voice.",
    },
    cover: "/work/covers/birru-co.webp",
    tags: ["Branding", "Logo", "Type Design"],
    gridSize: "large",
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
    gallery: [
      {
        src: "/work/birru.webp",
        caption: { id: "Logo dan varian brandmark", en: "Logo and brandmark variants" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/birru-tagline.webp",
        caption: { id: "Kunci tagline", en: "Tagline lockups" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/birru-typeface.webp",
        caption: { id: "Birru Sans berdampingan dengan Nunito", en: "Birru Sans against Nunito" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/birru-social.webp",
        caption: {
          id: "Desain media sosial dan marketplace",
          en: "Social media and marketplace design",
        },
        width: 2048,
        height: 1536,
      },
    ],
  },
  {
    slug: "backslash-creative",
    title: "Backslash Creative",
    category: "brand",
    discipline: { id: "Identitas brand", en: "Brand identity" },
    year: "2022",
    role: { id: "Graphic Designer", en: "Graphic Designer" },
    client: { id: "Backslash Creative", en: "Backslash Creative" },
    teaser: {
      id: "Varian logo, palet, sistem pola, dan materi marketplace.",
      en: "Logo variations, palette, pattern system, and marketplace collateral.",
    },
    summary: {
      id: "Identitas untuk sebuah studio kreatif, disusun dalam lima bagian: varian logo, warna, tipografi, pola, dan brandnya saat dipakai. Polanya yang paling banyak bekerja, karena brand studio lebih sering muncul sebagai latar ketimbang sebagai logo.",
      en: "Identity for a creative studio, built in five parts: logo variations, colour, typography, pattern, and the brand in action. The pattern does most of the heavy lifting, because a studio brand shows up more often as a background than as a logo.",
    },
    cover: "/work/covers/backslash-creative.webp",
    tags: ["Branding", "Logo", "Pattern"],
    gridSize: "small",
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
    gallery: [
      {
        src: "/work/gallery/backslash-logo.webp",
        caption: { id: "Varian logo", en: "Logo variations" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/backslash-colors.webp",
        caption: { id: "Warna brand", en: "Brand colours" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/backslash-pattern.webp",
        caption: { id: "Desain pola", en: "Pattern design" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/backslash.webp",
        caption: { id: "Brandnya saat dipakai", en: "Brand in action" },
        width: 2048,
        height: 5073,
      },
    ],
  },
  {
    slug: "vjatre-skincare",
    title: "VJatre Skincare",
    category: "brand",
    discipline: { id: "Brand dan sosial", en: "Brand and social" },
    year: "2022",
    role: { id: "Graphic Designer", en: "Graphic Designer" },
    client: { id: "VJatre", en: "VJatre" },
    teaser: {
      id: "Identitas, bahasa pola, dan sistem media sosial untuk sebuah label skincare.",
      en: "Identity, pattern language, and a social media system for a skincare label.",
    },
    summary: {
      id: "Brand skincare harus terlihat konsisten di rak, di layar ponsel, dan di feed. VJatre dapat logo primer dan sekunder plus dua alternatif, set ikon yang menyertainya, satu pola, dan sistem template sosial yang berdiri di atas empat warna yang sama.",
      en: "A skincare brand needs to look consistent on a shelf, on a phone, and in a feed. VJatre got a primary and secondary logo plus two alternates, a matching icon set, a pattern, and a social template system built on the same four colours.",
    },
    cover: "/work/covers/vjatre-skincare.webp",
    tags: ["Branding", "Social", "Packaging"],
    gridSize: "small",
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
    gallery: [
      {
        src: "/work/gallery/vjatre-logo.webp",
        caption: { id: "Varian logo dan ikon", en: "Logo and icon variants" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/vjatre-colors.webp",
        caption: { id: "Warna brand", en: "Brand colour" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/vjatre-pattern.webp",
        caption: { id: "Desain pola", en: "Pattern design" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/vjatre-social.webp",
        caption: { id: "Post media sosial", en: "Social media posts" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/vjatre.webp",
        caption: { id: "Brandnya saat dipakai", en: "Brand in action" },
        width: 2048,
        height: 2954,
      },
    ],
  },
  {
    slug: "probe",
    title: "ProBe",
    category: "brand",
    discipline: { id: "Art direction produk", en: "Product art direction" },
    year: "2022",
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
    cover: "/work/covers/probe.webp",
    tags: ["App Store", "Illustration", "Promo"],
    gridSize: "large",
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
    gallery: [
      {
        src: "/work/gallery/probe-cover.webp",
        caption: { id: "Aplikasinya untuk apa", en: "What the app is for" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/probe.webp",
        caption: { id: "Desain promo dan thumbnail store", en: "Promo design and store thumbnails" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/probe-illustration.webp",
        caption: { id: "Dari sketsa ke ilustrasi akhir", en: "Sketch to final illustration" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/probe-preview.webp",
        caption: { id: "Pratinjau di dalam aplikasi", en: "In app preview" },
        width: 2048,
        height: 1536,
      },
    ],
  },
  {
    slug: "rt-pintar",
    title: "RT Pintar",
    category: "brand",
    discipline: { id: "Ikon dan ilustrasi", en: "Icons and illustration" },
    year: "2022",
    role: { id: "Inisiatif sendiri", en: "Self-directed" },
    client: { id: "Project pribadi", en: "Personal project" },
    teaser: {
      id: "Redesain atas inisiatif sendiri: dua belas ikon kategori, empty state, dan template media sosial.",
      en: "Self-directed redesign: a twelve icon category set, empty states, and social templates.",
    },
    summary: {
      id: "Redesain pribadi untuk RT Pintar, aplikasi administrasi lingkungan. Tidak ada brief, tidak ada klien, dan justru itu yang membuatnya jadi tempat yang pas untuk menggarap satu set ikon dan empty state dengan benar.",
      en: "A personal redesign of RT Pintar, a neighbourhood administration app. No brief and no client, which made it the right place to work out an icon set and a full set of empty states properly.",
    },
    cover: "/work/covers/rt-pintar.webp",
    tags: ["Icons", "Illustration", "Redesign"],
    gridSize: "small",
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
      {
        src: "/work/gallery/rtpintar-social.webp",
        caption: { id: "Template media sosial", en: "Social media templates" },
        width: 2048,
        height: 1536,
      },
      {
        src: "/work/gallery/rtpintar-highlight.webp",
        caption: { id: "Ikon highlight Instagram", en: "Instagram highlight icons" },
        width: 2048,
        height: 1536,
      },
    ],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);
