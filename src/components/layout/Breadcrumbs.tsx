"use client";
import React from "react";
import Link from "~/components/features/Link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { i18n } from "~/config/i18n";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export const Breadcrumbs = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname
      .split("/")
      .filter((p) => Boolean(p) && !i18n.locales.some((l) => l.key === p));

    return paths.map((path, index) => {
      const href = "/" + paths.slice(0, index + 1).join("/");
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { label, href };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      <Link href="/" className="flex items-center hover:text-foreground">
        <span>Home</span>
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <Link
            href={breadcrumb.href}
            className={`text-ellipsis overflow-hidden hover:text-foreground ${
              index === breadcrumbs.length - 1 ? "font-medium text-foreground" : ""
            }`}
          >
            {breadcrumb.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
