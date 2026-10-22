/* eslint-disable @next/next/no-img-element -- artboards are screenshotted by headless Chrome; plain eager images */
import { notFound } from "next/navigation";
import {
  Barbell,
  CalendarCheck,
  FilmSlate,
  Lightning,
  PersonSimpleRun,
  Play,
  Scissors,
  Ticket,
  TrendUp,
  VideoCamera,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { getCaseStudy } from "@/content/case-studies";
import { t } from "@/lib/i18n";

/**
 * Presentation artboards (2048x1449, the size of the Luna POS deck pages) for
 * projects whose plates were raw screenshots. Same anatomy as the existing
 * product decks: numbered pill, year and title top right, a paragraph, real
 * screens set in device frames, "Crafted with" Figma mark. Only real
 * screenshots go inside the frames. Rendered to webp by scripts/build-decks.sh.
 *
 *   /print/deck/<slug>        the cover
 *   /print/deck/<slug>--<n>   gallery plate n (1-based)
 */
type Deck = {
  number: number;
  kind: string;
  brand: string;
  tint: string;
  wordmark: string;
  icons: Icon[];
  laptop: string;
  phone?: string;
  second?: string;
  /** Raw screenshots, one per gallery plate, in gallery order. The case study
      gallery points at the rendered plates, so the sources live here. */
  screens: string[];
};

const DECKS: Record<string, Deck> = {
  "samase-sports-club": {
    number: 5,
    kind: "Marketing Strategy & Web App",
    brand: "#8b2e24",
    tint: "#f7f1ec",
    wordmark: "SAMASE",
    icons: [Barbell, PersonSimpleRun, CalendarCheck, Ticket, Lightning],
    laptop: "/work/gallery/samase-landing.webp",
    second: "/work/gallery/samase-kasir.webp",
    screens: [
      "/work/gallery/samase-landing.webp",
      "/work/gallery/samase-agenda.webp",
      "/work/gallery/samase-kasir.webp",
      "/work/gallery/samase-rekonsiliasi.webp",
      "/work/gallery/samase-paket.webp",
      "/work/gallery/samase-voucher.webp",
      "/work/gallery/samase-impor.webp",
    ],
  },
  tokoclippers: {
    number: 6,
    kind: "Creator Marketplace",
    brand: "#e8930c",
    tint: "#fdf6e9",
    wordmark: "TOKOCLIPPERS",
    icons: [Scissors, VideoCamera, FilmSlate, Play, Wallet, TrendUp],
    laptop: "/work/gallery/tokoclippers-home-creator.webp",
    second: "/work/gallery/tokoclippers-home-clippers.webp",
    screens: [
      "/work/gallery/tokoclippers-home-clippers.webp",
      "/work/gallery/tokoclippers-home-creator.webp",
      "/work/gallery/tokoclippers-detail-project.webp",
      "/work/gallery/tokoclippers-buat-project.webp",
      "/work/gallery/tokoclippers-withdraw.webp",
      "/work/gallery/tokoclippers-tiket-cs.webp",
    ],
  },
};

export const dynamicParams = false;
export function generateStaticParams() {
  const ids: { id: string }[] = [];
  for (const slug of Object.keys(DECKS)) {
    ids.push({ id: slug });
    DECKS[slug].screens.forEach((_, i) => ids.push({ id: `${slug}--${i + 1}` }));
  }
  return ids;
}

function Pattern({ icons, color }: { icons: Icon[]; color: string }) {
  const cells = Array.from({ length: 9 * 6 }, (_, i) => i);
  return (
    <div className="absolute inset-0 grid grid-cols-9 grid-rows-6 place-items-center opacity-[0.07]" style={{ color }}>
      {cells.map((i) => {
        const Glyph = icons[i % icons.length];
        return <Glyph key={i} size={92} weight="thin" style={{ transform: `rotate(${((i * 37) % 50) - 25}deg)` }} />;
      })}
    </div>
  );
}

function FigmaMark() {
  return (
    <svg viewBox="0 0 38 57" width="26" height="39" aria-hidden="true">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}

function Crafted({ top = false }: { top?: boolean }) {
  return (
    <div className={`absolute right-12 flex flex-col items-end gap-2 ${top ? "top-8" : "bottom-10"}`}>
      <span className="text-[22px] font-semibold text-[#2d2d2c]">Crafted with</span>
      <span className="flex size-[58px] items-center justify-center rounded-[14px] bg-[#1e1e1e]">
        <FigmaMark />
      </span>
    </div>
  );
}

function Pill({ deck, label }: { deck: Deck; label: string }) {
  return (
    <span className="absolute left-10 top-8 rounded-[8px] px-4 py-2 text-[22px] font-semibold text-white" style={{ background: deck.brand }}>
      #{deck.number} {label}
    </span>
  );
}

/** A laptop: dark bezel, screen, thin base. */
function Laptop({ src, width, className = "" }: { src: string; width: number; className?: string }) {
  return (
    <div className={`absolute ${className}`} style={{ width }}>
      <div className="rounded-t-[26px] bg-[#1d1d1f] p-[18px] pb-[22px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45)]">
        <div className="overflow-hidden rounded-[6px] bg-white" style={{ aspectRatio: "16 / 10" }}>
          <img src={src} alt="" className="size-full object-cover object-top" />
        </div>
      </div>
      <div className="mx-[-6%] h-[26px] rounded-b-[18px] bg-gradient-to-b from-[#d9d9db] to-[#a9a9ad]" />
    </div>
  );
}

/** A browser window, for plates that show one screen large. */
function Browser({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_40px_90px_-35px_rgb(0_0_0/0.45)] ${className}`}>
      <div className="flex h-12 items-center gap-2.5 border-b border-black/10 bg-[#f6f6f5] px-5">
        <span className="size-3.5 rounded-full bg-[#ff5f57]" />
        <span className="size-3.5 rounded-full bg-[#febc2e]" />
        <span className="size-3.5 rounded-full bg-[#28c840]" />
      </div>
      <img src={src} alt="" className="block h-[calc(100%-3rem)] w-full object-cover object-top" />
    </div>
  );
}

export default async function DeckBoard({ params }: PageProps<"/print/deck/[id]">) {
  const { id } = await params;
  const [slug, plate] = id.split("--");
  const deck = DECKS[slug];
  const study = getCaseStudy(slug);
  if (!deck || !study) notFound();

  const domain = study.linkLabel ?? study.links?.[0]?.label ?? "";

  if (plate) {
    const index = Number(plate) - 1;
    const item = study.gallery[index];
    const screen = deck.screens[index];
    if (!item || !screen) notFound();
    return (
      <main className="deck-board relative overflow-hidden" style={{ background: deck.tint }}>
        <Pattern icons={deck.icons} color={deck.brand} />
        <Pill deck={deck} label={study.title} />
        <h1 className="absolute left-10 top-[104px] max-w-[1180px] text-[54px] font-bold leading-[1.08] tracking-[-0.02em] text-[#2d2d2c]" style={{ fontFamily: "var(--font-host-grotesk)" }}>
          {t(item.caption, "en")}
        </h1>
        <Browser src={screen} className="bottom-[-40px] left-1/2 h-[1110px] w-[1640px] -translate-x-1/2" />
        <Crafted top />
      </main>
    );
  }

  return (
    <main className="deck-board relative overflow-hidden" style={{ background: deck.tint }}>
      <Pattern icons={deck.icons} color={deck.brand} />
      <Pill deck={deck} label={`${deck.kind} | ${study.title}`} />

      <p className="absolute left-14 top-[150px] text-[108px] font-extrabold leading-none tracking-[-0.04em]" style={{ color: deck.brand, fontFamily: "var(--font-host-grotesk)" }}>
        {deck.wordmark}
      </p>

      <div className="absolute right-12 top-10 max-w-[760px] text-right">
        <p className="text-[34px] font-semibold text-[#2d2d2c]">{study.year}</p>
        <p className="text-[78px] font-extrabold leading-[1.02] tracking-[-0.03em]" style={{ color: deck.brand, fontFamily: "var(--font-host-grotesk)" }}>
          {study.title}
        </p>
        {domain ? <p className="mt-1 text-[24px] text-[#6d6f71]">{domain}</p> : null}
        <p className="ml-auto mt-8 max-w-[640px] text-[25px] leading-[1.45] text-[#2d2d2c]">{t(study.teaser, "en")}</p>
      </div>

      {deck.second ? <Laptop src={deck.second} width={980} className="bottom-[110px] right-[230px] rotate-[3deg]" /> : null}
      <Laptop src={deck.laptop} width={1180} className="bottom-[60px] left-[120px] -rotate-[2deg]" />
      <Crafted />
    </main>
  );
}
