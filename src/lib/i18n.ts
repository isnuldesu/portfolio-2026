export const locales = ["id", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

/** A string that exists in both languages. Plain strings pass through as-is. */
export type L = Record<Locale, string>;

export function t(value: L | string, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeMeta: Record<Locale, { label: string; flag: string; htmlLang: string }> = {
  id: { label: "ID", flag: "🇮🇩", htmlLang: "id-ID" },
  en: { label: "EN", flag: "🇬🇧", htmlLang: "en" },
};
