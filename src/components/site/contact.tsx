"use client";

import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/ui/brand-icon";
import { contact, person, primaryCta, whatsappCta } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/50";

const labelClass = "block text-sm font-medium text-foreground/90";

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

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
        setError(payload.error ?? "Something went wrong. Try email instead.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError("Network dropped. Try again, or email me directly.");
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
        <h2 className="font-display text-center text-3xl font-medium tracking-tight text-balance md:text-5xl">
          {contact.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-center text-base leading-relaxed text-foreground/70">
          {contact.body}
        </p>

        {status === "sent" ? (
          <div className="surface mt-10 rounded-3xl p-8 text-center">
            <p className="text-lg font-medium text-foreground">Message received.</p>
            <p className="mt-2 text-sm text-foreground/70">
              I reply within two working days. If it is urgent, email is faster.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                variant="outline"
                className="h-11 gap-2 rounded-full border-border bg-card px-6 text-sm font-medium"
              >
                <a href={whatsappCta.href} target="_blank" rel="noopener noreferrer">
                  <BrandIcon name="siWhatsapp" />
                  {whatsappCta.label}
                </a>
              </Button>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-sm underline-offset-4 hover:underline"
              >
                Send another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 grid gap-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="contact-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder="Nadia Prameswari"
                  className={fieldClass}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  autoComplete="email"
                  placeholder="nadia@warungnusa.id"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="contact-message" className={labelClass}>
                The business, and the bottleneck
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                maxLength={4000}
                placeholder="We run four coffee outlets. Stock counts are done on paper every night and never match the register."
                className={`${fieldClass} resize-y`}
              />
              <p className="text-xs text-muted-foreground">
                One paragraph is enough. Budget range helps, but is optional.
              </p>
            </div>

            {/* Honeypot. Hidden from people, catnip for bots. */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                disabled={status === "sending"}
                className="h-12 w-full gap-2 rounded-full px-8 text-sm font-medium sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    {primaryCta.label}
                    <ArrowUpRight className="size-4" strokeWidth={1.75} />
                  </>
                )}
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 w-full gap-2 rounded-full border-border bg-card px-8 text-sm font-medium sm:w-auto"
              >
                <a href={whatsappCta.href} target="_blank" rel="noopener noreferrer">
                  <BrandIcon name="siWhatsapp" />
                  {whatsappCta.label}
                </a>
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground sm:text-left">
              Or email{" "}
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
