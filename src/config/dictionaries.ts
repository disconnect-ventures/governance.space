import "server-only";
import { Locale } from "./i18n";

const dictionaries = {
  en: () =>
    import("../../dictionaries/en.json").then((module) => module.default),
  pt: () =>
    import("../../dictionaries/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const language = (await dictionaries[locale]?.()) ?? dictionaries.en();
  return language;
};
