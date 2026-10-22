import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Mascot, MascotWalk, MASCOT_POSES, type MascotExpression } from "@/components/site/mascot";
import { ReplayIntro } from "@/components/site/replay-intro";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Mascot preview",
  robots: { index: false, follow: false },
};

/** Review page for the mascot and the opening animation. Not linked anywhere. */
export default async function MascotPreview({ params }: PageProps<"/[locale]/mascot">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8">
      <p className="label-mono text-muted-foreground">Preview</p>
      <h1 className="font-display mt-2 text-4xl font-bold">Mascot</h1>
      <p className="mt-3 max-w-[60ch] text-muted-foreground">
        The character on the left, the reference portrait on the right.
        Replay the opening to see it walk in, push the panel, and reveal the name.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <ReplayIntro href={`/${locale}`} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl bg-white p-8">
          <MascotWalk className="mx-auto h-[300px]" />
          <p className="label-mono mt-4 text-center text-muted-foreground">MascotWalk</p>
        </div>
        <div className="rounded-2xl bg-muted p-8">
          {/* eslint-disable-next-line @next/next/no-img-element -- reference photo, shown plain */}
          <img src="/portrait.webp" alt="Reference portrait" className="mx-auto w-full rounded-xl" />
          <p className="label-mono mt-4 text-center text-muted-foreground">public/portrait.webp</p>
        </div>
      </div>

      <h2 className="font-display mt-14 text-2xl font-bold">Expressions</h2>
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {(Object.keys(MASCOT_POSES) as MascotExpression[]).map((expression) => (
          <li key={expression} className="rounded-2xl bg-muted p-5">
            <Mascot className="mx-auto h-auto w-full max-w-[9rem]" expression={expression} />
            <p className="label-mono mt-3 text-center text-muted-foreground">{expression}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
