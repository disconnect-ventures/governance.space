export const i18n = {
  defaultLocale: "en-us",
  locales: [
    { label: "English", key: "en-us" },
    { label: "Portuguese", key: "pt-br" },
  ],
} as const;

export type Locale = (typeof i18n)["locales"][number]["key"];
