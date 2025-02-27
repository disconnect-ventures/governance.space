import "server-only";
import { Locale } from "./i18n";

const dictionaries = {
  "en-us": () =>
    import("../../dictionaries/en.json").then((module) => module.default),
  "pt-br": () =>
    import("../../dictionaries/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const language = (await dictionaries[locale]?.()) ?? dictionaries["en-us"]();
  return language;
};
