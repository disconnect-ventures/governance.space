"use client";
import React, { useMemo } from "react";
import Link from "~/components/features/Link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { i18n } from "~/config/i18n";
import { Dictionary } from "~/config/dictionaries";

type BreadcrumbsProps = {
  translations: Dictionary["breadcrumbs"] & Record<string, string | undefined>;
};

export const Breadcrumbs = ({ translations }: BreadcrumbsProps) => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const homeBreadcrumb = {
      label: translations.home,
      href: "/",
    };

    if (pathname === "/") return [homeBreadcrumb];

    const segments = pathname
      .split("/")
      .filter(
        (segment) =>
          segment && !i18n.locales.some((locale) => locale.key === segment)
      );

    const pathBreadcrumbs = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      const camelCaseKey = segment.replace(/-([a-z])/g, (_, char) =>
        char.toUpperCase()
      );

      const label = translations[camelCaseKey]
        ? translations[camelCaseKey]
        : segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

      return { label, href };
    });

    return [homeBreadcrumb, ...pathBreadcrumbs];
  }, [pathname, translations]);

  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          <Link
            href={breadcrumb.href}
            className={`text-ellipsis overflow-hidden hover:text-foreground ${index === breadcrumbs.length - 1 ? "font-medium text-foreground" : ""}`}
          >
            {breadcrumb.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
