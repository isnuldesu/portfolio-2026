"use client";

import { Dialog } from "radix-ui";
import { ArrowDown, List, X } from "@phosphor-icons/react/dist/ssr";

import { useLocale } from "@/components/site/locale-provider";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { SoundToggle } from "@/components/site/sound-toggle";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";
import { nav, primaryCta } from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

/**
 * Below xl the inline nav is hidden, so this sheet carries everything the
 * header drops on a small screen: the page links, audio, language, theme,
 * the resume and the primary call to action. It drops down under the header
 * so the logo stays in place, and any link closes it.
 */
export function MobileMenu() {
  const locale = useLocale();
  const label = t(ui.nav.menu, locale);

  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label={label}
        className="press group flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 xl:hidden"
      >
        <List className="size-5 group-data-[state=open]:hidden" />
        <X className="hidden size-5 group-data-[state=open]:block" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-x-0 top-16 bottom-0 z-40 bg-black/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 xl:hidden" />
        <Dialog.Content
          // Keep focus off the first link so no ring flashes on open.
          onOpenAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            // The trigger sits outside the sheet; let it toggle instead of
            // closing here and reopening on the same click.
            if ((event.target as HTMLElement).closest("header")) event.preventDefault();
          }}
          className="fixed inset-x-0 top-16 z-40 border-b border-border bg-[var(--sheet)] px-5 pt-6 pb-8 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 sm:px-8 xl:hidden"
        >
          <Dialog.Title className="sr-only">{label}</Dialog.Title>
          <Dialog.Description className="sr-only">{label}</Dialog.Description>

          <nav className="flex flex-col">
            {nav.map((item) => (
              <Dialog.Close asChild key={item.href}>
                <a
                  href={`/${locale}${item.href}`}
                  className="press border-b border-border py-4 font-display text-3xl font-bold tracking-tight text-foreground outline-none focus-visible:text-[var(--coral)]"
                >
                  {t(item.label, locale)}
                </a>
              </Dialog.Close>
            ))}
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <SoundToggle
              label={t(ui.nav.audio, locale)}
              on={t(ui.nav.audioOn, locale)}
              off={t(ui.nav.audioOff, locale)}
            />
            <LocaleSwitcher />
            <ThemeToggle label={t(ui.nav.themeToggle, locale)} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={`/downloads/muhammad-isnul-resume-2026-${locale}.pdf`}
              download
              className="press inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-muted px-4 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring"
            >
              {t(ui.reach.resume, locale)}
              <ArrowDown className="size-4" />
            </a>
            <Dialog.Close asChild>
              <Button asChild variant="sq-primary" size="sq-lg" className="w-full">
                <a href={`/${locale}${primaryCta.href}`}>{t(primaryCta.label, locale)}</a>
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
