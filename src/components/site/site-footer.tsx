import { BrandIcon } from "@/components/ui/brand-icon";
import { person, socialLinks } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {person.name}
        </p>

        <ul className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <BrandIcon name={social.icon} />
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[11px] text-muted-foreground">
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
