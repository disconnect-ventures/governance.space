import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./config/i18n";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales.map((l) => l.key);

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale.key}/`) && pathname !== `/${locale.key}`
  );

  if (
    [
      "/manifest.json",
      "/icon-96.png",
      "/icon-192.png",
      "/icon-512.png",
      "/apple-icon.png",
      "/favicon.ico",
    ].includes(pathname)
    || pathname.startsWith("/assets") // Workaround for i18n breaking the public folder
  )
    return;

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
