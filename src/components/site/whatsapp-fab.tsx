"use client";

import { useLocale } from "@/components/site/locale-provider";
import { BrandIcon } from "@/components/ui/brand-icon";
import { whatsappCta } from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

/**
 * A WhatsApp pill that stays in the corner of every page, so a visitor never
 * has to scroll back to the contact section to reach out. Icon only on small
 * screens. Sits under the opening overlay (z-index 100), above the page.
 */
export function WhatsappFab() {
  const locale = useLocale();
  return (
    <a
      href={t(whatsappCta.href, locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(whatsappCta.label, locale)}
      className="press fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-primary pl-4 pr-4 text-sm font-medium text-primary-foreground shadow-[0_6px_24px_-8px_rgb(0_0_0/0.35)] outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring sm:pr-5"
    >
      <BrandIcon name="siWhatsapp" className="size-5" />
      <span className="hidden sm:inline">{t(ui.reach.fab, locale)}</span>
    </a>
  );
}
