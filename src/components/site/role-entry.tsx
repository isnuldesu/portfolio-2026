"use client";

import { useLocale } from "@/components/site/locale-provider";
import { ui } from "@/content/ui";
import type { Role } from "@/content/experience";
import { t } from "@/lib/i18n";

/**
 * One role. `detail` switches between the short card used on the home page
 * and the full record used on the experience page.
 */
export function RoleEntry({
  role,
  accent,
  detail = false,
}: {
  role: Role;
  accent: string;
  detail?: boolean;
}) {
  const locale = useLocale();

  return (
    <div
      className="rule-left grid gap-4 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10"
      style={{ "--rule": accent } as React.CSSProperties}
    >
      <div>
        <p className="label-mono text-foreground">
          {role.period === "—" ? t(ui.experience.notRecorded, locale) : role.period}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(role.arrangement, locale)}
        </p>
        <p className="text-sm text-muted-foreground">{t(role.location, locale)}</p>
      </div>

      <div>
        <h3 className="font-display text-xl font-medium tracking-tight">{role.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{role.company}</p>

        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-foreground/85">
          {t(role.summary, locale)}
        </p>

        {role.brands?.length ? (
          <p className="label-mono mt-4 text-muted-foreground">
            {role.brands.join(" / ")}
          </p>
        ) : null}

        {!detail ? (
          <ul className="mt-4 space-y-2">
            {role.points.map((point) => (
              <li
                key={t(point, "en")}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span aria-hidden="true" className="shrink-0">
                  &bull;
                </span>
                {t(point, locale)}
              </li>
            ))}
          </ul>
        ) : null}

        {detail && role.scope?.length ? (
          <div className="mt-8">
            <p className="label-mono text-muted-foreground">
              {t(ui.experience.scope, locale)}
            </p>
            <div className="mt-4 space-y-6">
              {role.scope.map((group) => (
                <div key={t(group.heading, "en")}>
                  <h4 className="font-display text-base font-medium tracking-tight">
                    {t(group.heading, locale)}
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={t(item, "en")}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden="true" className="shrink-0">
                          &bull;
                        </span>
                        {t(item, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {detail && role.dayToDay?.length ? (
          <div className="mt-8">
            <p className="label-mono text-muted-foreground">
              {t(ui.experience.dayToDay, locale)}
            </p>
            <ul className="mt-3 space-y-2">
              {role.dayToDay.map((item) => (
                <li
                  key={t(item, "en")}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden="true" className="shrink-0">
                    &bull;
                  </span>
                  {t(item, locale)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
