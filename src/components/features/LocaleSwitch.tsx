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
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder={locale?.label ?? "Select language"} />
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map(({ label, key }) => (
          <SelectItem value={key} key={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
