import "server-only";
import type { Locale } from "./config";
import en from "./dictionaries/en.json";
import ru from "./dictionaries/ru.json";
import uk from "./dictionaries/uk.json";

export type Dictionary = typeof uk;

const dictionaries: Record<Locale, Dictionary> = { uk, ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
