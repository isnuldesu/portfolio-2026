# isnul.site

Portfolio of Muhammad Isnul, product designer. Two languages (`/id`, `/en`), fifteen case studies, a work index, an experience page, and a contact form.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

Resume (one page) and CV (EN and ID) are rendered from the `/print/[doc]` pages: a hero card and an ink panel, in the site's palette, kept ATS-safe (real text in reading order, decoration drawn with CSS shapes, static fonts from `public/fonts/print/` so the PDF embeds TrueType rather than Type 3). After changing experience or case study content, run `npm run docs` with the dev server up to regenerate `public/downloads/*.pdf`.

Add `?intro` to the home URL (`/en?intro`) to replay the opening animation. Normally it plays once per browser tab.

## Environment

Put these in `.env.local`. Without the Supabase keys the site still runs: the contact form answers "not connected" and page views are not stored.

| Variable | Used by |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | contact form, page views |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | contact form, page views |
| `SUPABASE_SECRET_KEY` | `/dashboard` (reads views and messages) |
| `DASHBOARD_PASSWORD` | `/dashboard` login. Also the key that signs the session cookie, so changing it signs everyone out |

## Stack

- Next.js 16.4 (App Router), React 19, Tailwind 4
- shadcn components in `src/components/ui/`, restyled after the Square dashboard (pill buttons, flat fills, hairlines). The palette is the 2026 CV: ink `#2d2d2c`, coral accent
- Fonts: Inter (text), Host Grotesk (headings), Geist Mono (labels), loaded in `src/app/site-fonts.ts`
- Motion stack after huyml.co (Framer, GSAP, Three.js): `lenis` smooth scroll, `gsap` as the clock and easing for the home showcase, `three` for its WebGL cover stack, `motion` for reveals in case studies. Phosphor icons
- Interface sound (`src/lib/sound.ts`), off until the visitor turns it on. Samples in `public/sfx/` are from Kenney Interface Sounds, CC0
- Supabase for messages and page views, Vercel Analytics

## Where things are

| What | Where |
|---|---|
| Colour tokens, type helpers, opening animation CSS | `src/app/globals.css` |
| Home: intro, pinned project showcase | `src/app/[locale]/page.tsx`, `src/components/site/home-showcase.tsx`, `src/components/site/showcase-stack.tsx` (WebGL) |
| Smooth scroll, interface sound | `src/components/site/smooth-scroll.tsx`, `src/lib/sound.ts`, `src/components/site/sound-toggle.tsx` |
| Work index and case studies | `src/app/[locale]/work/` |
| Case study content (both languages) | `src/content/case-studies.ts` |
| Interface text (both languages) | `src/content/ui.ts`, `src/content/site.ts` |
| Project preview frame | `src/components/site/project-visual.tsx` |
| Case study images (8 per project) | `public/work/shots/<slug>/01-08.webp`, listed through `shots()` in `src/content/case-studies.ts` |
| Logo (MI monogram) and app icons | `scripts/build-logo.mjs` (`npm run logo`), output in `public/brand/`, `src/app/icon.*`, `src/components/site/mi-mark-path.ts` |
| Opening animation | `src/components/site/intro-loader.tsx`, `src/lib/intro.ts` |
| Mascot | `src/components/site/mascot.tsx`, `public/mascot/v3/` |
| 404 | `src/app/global-not-found.tsx`, `src/app/[locale]/not-found.tsx` |
| Locale redirect for unprefixed paths | `src/proxy.ts` |
| Resume and CV sheets | `src/app/print/`, `src/components/print/`, `scripts/build-docs.sh` |
| Contact channels, floating WhatsApp | `src/components/site/contact-channels.tsx`, `src/components/site/whatsapp-fab.tsx` |
| Dashboard session and rate limits | `src/lib/dashboard-session.ts`, `src/lib/rate-limit.ts` |

## Notes

- **The mascot** has four still poses (`MASCOT_POSES` in `mascot.tsx`) and a 32-frame walk sprite (`public/mascot/v3/walk-32.webp`, frames 239×360) played with CSS `steps(32)`. Preview at `/en/mascot`.
- **Motion**: every Tailwind transition and `ease-out` uses huyml's curve, `cubic-bezier(0.22, 1, 0.36, 1)`, set in the `@theme` block of `globals.css`. `.blur-swap` replays a blur-in when an element is re-keyed; `.press` is the button press. Nested scroll areas need `data-lenis-prevent`.
- **Showcase**: scroll sets a target, GSAP eases one number towards it, and the 3D stack, index and counter are all drawn from that number each frame. When scrolling stops it lands on a project, one project per push. Without WebGL (or under reduced motion) the plain cover image stays.
- **Adding a case study**: add an entry to `src/content/case-studies.ts` with its `roleGroup` (the work index groups by role). Images go in `public/work/shots/<slug>/` as `01.webp` (cover) to `08.webp`, 2048 by 1449; point the entry at them with `shotCover(slug)` and `shots(slug, captions)`.
- **Replacing one case study image**: give the new file a new name (for example `06-flat.webp`) and set `file` on that caption. Reusing a file name keeps serving the old picture from the Next image cache.
- **Logo**: the monogram is drawn by `scripts/build-logo.mjs` (a broad-nib pen stamped along centrelines, traced with potrace, which must be installed). Edit the strokes there and run `npm run logo`; never hand-edit the generated files.
- **404s**: the root layout lives under `[locale]`, so unmatched URLs use `global-not-found.tsx` (enabled by `experimental.globalNotFound` in `next.config.ts`). Paths without a locale prefix are redirected to `/en` by the proxy first.
- **Rate limits** are kept in memory per server instance. They slow one client hammering a route; they are not a global quota.
- Project notes, decisions, and references are kept outside the repo, in the owner's Obsidian vault.
