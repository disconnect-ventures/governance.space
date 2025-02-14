"use client";
import { useParams } from "next/navigation";
import { Locale } from "~/config/i18n";

export function useLocale() {
  const params = useParams();
  const locale = params?.lang as Locale;
  return { locale };
}
