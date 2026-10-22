"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "@phosphor-icons/react/dist/ssr";

import { useLocale } from "@/components/site/locale-provider";
import { BrandIcon, type BrandIconName } from "@/components/ui/brand-icon";
import { instagram, person, whatsappCta } from "@/content/site";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";

/**
 * The three ways in, as one row of Square cards: WhatsApp first (a message
 * is already typed for them), then Instagram, then email with a copy button
 * for people who would rather paste the address into their own client.
 */
export function ContactChannels() {
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  const channels: { key: string; icon: BrandIconName; label: string; handle: string; note: string; href: string; external: boolean }[] = [
    {
      key: "whatsapp",
      icon: "siWhatsapp",
      label: "WhatsApp",
      handle: `+${person.whatsapp.replace(/^62(\d{3})(\d{4})(\d+)$/, "62 $1 $2 $3")}`,
      note: t(ui.reach.whatsappNote, locale),
      href: t(whatsappCta.href, locale),
      external: true,
    },
    {
      key: "instagram",
      icon: "siInstagram",
      label: "Instagram",
      handle: instagram.handle,
      note: t(ui.reach.instagramNote, locale),
      href: instagram.href,
      external: true,
    },
    {
      key: "email",
      icon: "mail",
      label: "Email",
      handle: person.email,
      note: t(ui.reach.emailNote, locale),
      href: `mailto:${person.email}`,
      external: false,
    },
  ];

  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {channels.map((channel) => (
        <li key={channel.key} className="group relative flex flex-col rounded-2xl bg-muted p-5 transition-colors hover:bg-[color-mix(in_oklab,var(--muted),var(--foreground)_6%)]">
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-10 items-center justify-center rounded-[10px] bg-background" aria-hidden="true">
              <BrandIcon name={channel.icon} className="size-5" />
            </span>
            <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{channel.label}</p>
          <a
            href={channel.href}
            target={channel.external ? "_blank" : undefined}
            rel={channel.external ? "noopener noreferrer" : undefined}
            className="font-display mt-1 break-all text-xl font-bold leading-tight outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:ring-3 focus-visible:after:ring-ring"
          >
            {channel.handle}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">{channel.note}</p>
          {channel.key === "email" ? (
            <button
              type="button"
              onClick={copyEmail}
              className="press relative z-10 mt-4 inline-flex h-9 w-fit items-center gap-2 rounded-full bg-background px-3.5 text-sm font-medium outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? t(ui.reach.copied, locale) : t(ui.reach.copy, locale)}
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
