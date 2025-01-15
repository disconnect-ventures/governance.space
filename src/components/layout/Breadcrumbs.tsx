"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

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
    const paths = pathname.split("/").filter(Boolean);

    return paths.map((path, index) => {
      const href = "/" + paths.slice(0, index + 1).join("/");
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      return { label, href };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
      <Link href="/" className="flex items-center hover:text-gray-900">
        <span>Home</span>
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={breadcrumb.href}
            className={`text-ellipsis overflow-hidden hover:text-gray-900 ${
              index === breadcrumbs.length - 1
                ? "font-medium text-gray-900"
                : ""
            }`}
          >
            {breadcrumb.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
