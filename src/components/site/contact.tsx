"use client";

import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { useLocale } from "@/components/site/locale-provider";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Button } from "@/components/ui/button";
import { contact, person, primaryCta, whatsappCta } from "@/content/site";
import { errorMessage, ui } from "@/content/ui";
import { t, type L } from "@/lib/i18n";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-none border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/50";

const labelClass = "block text-sm font-medium text-foreground/90";

export function Contact() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<L | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        // The route answers with a code, so the wording stays on this side and
        // follows whichever language the visitor is reading in.
        setError(errorMessage(payload.code));
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError(errorMessage("network"));
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-28 md:py-36">
      <m.div
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, y: 28 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.25 },
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
            })}
        className="mx-auto max-w-2xl"
      >
        <h2 className="font-display text-3xl font-medium tracking-tight text-balance md:text-5xl">
          {t(contact.heading, locale)}
        </h2>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
          {t(contact.body, locale)}
        </p>

        {status === "sent" ? (
          <div className="surface mt-10 rounded-none p-8 text-center">
            <p className="text-lg font-medium text-foreground">
              {t(ui.form.successTitle, locale)}
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              {t(ui.form.successBody, locale)}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                variant="outline"
                className="h-11 gap-2 rounded-none border-border bg-card px-6 text-sm font-medium"
              >
                <a
                  href={t(whatsappCta.href, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BrandIcon name="siWhatsapp" />
                  {t(whatsappCta.label, locale)}
                </a>
              </Button>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-sm underline-offset-4 hover:underline"
              >
                {t(ui.form.sendAnother, locale)}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 grid gap-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="contact-name" className={labelClass}>
                  {t(ui.form.name, locale)}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder={t(ui.form.namePlaceholder, locale)}
                  className={fieldClass}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="contact-email" className={labelClass}>
                  {t(ui.form.email, locale)}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  autoComplete="email"
                  placeholder={t(ui.form.emailPlaceholder, locale)}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="contact-message" className={labelClass}>
                {t(ui.form.message, locale)}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                maxLength={4000}
                placeholder={t(ui.form.messagePlaceholder, locale)}
                className={`${fieldClass} resize-y`}
              />
              <p className="text-xs text-muted-foreground">{t(ui.form.helper, locale)}</p>
            </div>

            {/* Honeypot. Hidden from people, catnip for bots. */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="contact-company">{t(ui.form.honeypotLabel, locale)}</label>
              <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {t(error, locale)}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                disabled={status === "sending"}
                className="h-12 w-full gap-2 rounded-none px-8 text-sm font-medium sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {t(ui.form.sending, locale)}
                  </>
                ) : (
                  <>
                    {t(primaryCta.label, locale)}
                    <ArrowUpRight className="size-4" strokeWidth={1.75} />
                  </>
                )}
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 w-full gap-2 rounded-none border-border bg-card px-8 text-sm font-medium sm:w-auto"
              >
                <a
                  href={t(whatsappCta.href, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BrandIcon name="siWhatsapp" />
                  {t(whatsappCta.label, locale)}
                </a>
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground sm:text-left">
              {t(ui.form.orEmail, locale)}{" "}
              <a
                href={`mailto:${person.email}`}
                className="font-mono text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
              >
                {person.email}
              </a>
            </p>
          </form>
        )}
      </m.div>
    </section>
  );
}
