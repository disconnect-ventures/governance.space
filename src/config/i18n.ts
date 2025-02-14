export const i18n = {
  defaultLocale: "en",
  locales: [
    { label: "English", key: "en" },
    { label: "Portuguese", key: "pt" },
  ],
} as const;

export type Locale = (typeof i18n)["locales"][number]["key"];
