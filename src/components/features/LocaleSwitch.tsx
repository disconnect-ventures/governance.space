"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { i18n, type Locale } from "~/config/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useMemo } from "react";
import { CircleFlagLanguage } from "react-circle-flags";

export default function LocaleSwitch() {
  const pathname = usePathname();
  const params = useParams();
  const locale = useMemo(
    () => i18n.locales.find((l) => params.lang === l.key),
    [params]
  );
  const router = useRouter();
  const redirectedPathname = useCallback(
    (locale: Locale) => {
      if (!pathname) return "/";
      const segments = pathname.split("/");
      segments[1] = locale;
      return segments.join("/");
    },
    [pathname]
  );

  return (
    <Select
      onValueChange={(value: Locale) => router.push(redirectedPathname(value))}
      defaultValue={locale?.key}
    >
      <SelectTrigger className="min-w-fit border-none bg-none shadow-none w-fit">
        <SelectValue>
          <span className="space-x-2">
            {" "}
            {locale && (
              <CircleFlagLanguage
                languageCode={locale?.key}
                className="w-8 h-8 inline"
              />
            )}
            <span className="md:hidden">{locale?.label}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-w-fit">
        {i18n.locales.map(({ key, label }) => (
          <SelectItem value={key} key={key}>
            <span className="space-x-2">
              <CircleFlagLanguage
                languageCode={key}
                className="w-8 h-8 inline"
              />
              <span className="md:hidden">{label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
