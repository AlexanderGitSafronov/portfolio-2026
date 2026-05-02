export const locales = ["uk", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uk";

export const localeNames: Record<Locale, string> = {
  uk: "Українська",
  ru: "Русский",
  en: "English",
};

export const localeShort: Record<Locale, string> = {
  uk: "UA",
  ru: "RU",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
