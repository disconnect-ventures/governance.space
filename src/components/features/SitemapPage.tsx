"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "~/config/i18n";
import { useParams } from "next/navigation";
import { localizePath } from "~/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { headerNavLinks } from "~/components/layout/Header";
import { Dictionary } from "~/config/dictionaries";
import clsx from "clsx";

interface SitemapItem {
  label: string;
  path: string;
  children?: SitemapItem[];
  translationKey?: string;
}

interface SitemapSectionProps {
  item: SitemapItem;
  isExpanded: boolean;
  toggle: () => void;
  translations: Dictionary["header"];
  locale: Locale;
  pathname: string;
}

const SitemapSection = ({
  item,
  isExpanded,
  toggle,
  translations,
  locale,
  pathname,
}: SitemapSectionProps) => {
  const localizedPath = localizePath(locale, item.path);
  const isActive = pathname === localizedPath;
  const hasChildren = item.children && item.children.length > 0;

  const translatedLabel = item.translationKey
    ? translations[item.translationKey as keyof Dictionary["header"]]
    : item.label;

  return (
    <div className="mb-4">
      <div className="flex items-start">
        {hasChildren ? (
          <button
            onClick={toggle}
            className="mr-2 p-1 mt-1 hover:bg-blue-50 rounded-full"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        ) : (
          <div className="w-8" />
        )}

        <Link
          href={localizedPath}
          className={clsx(
            "px-3 py-2 rounded-full border border-border hover:text-blue-500 inline-block",
            isActive && "bg-blue-50 text-blue-950"
          )}
        >
          {translatedLabel}
        </Link>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-8 mt-2 border-l border-border pl-4">
          {item.children!.map((child, idx) => (
            <div key={idx} className="mb-2">
              <Link
                href={localizePath(locale, child.path)}
                className={clsx(
                  "px-3 py-2 rounded-full border border-border hover:text-blue-500 inline-block",
                  pathname === localizePath(locale, child.path) &&
                    "bg-blue-50 text-blue-950"
                )}
              >
                {child.translationKey
                  ? translations[
                      child.translationKey as keyof Dictionary["header"]
                    ]
                  : child.label}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const buildSiteStructure = (
  translations: Dictionary["header"]
): SitemapItem[] => {
  const navLinks = Array.isArray(headerNavLinks) ? headerNavLinks : [];

  const structure: SitemapItem[] = navLinks.map((link) => ({
    label: translations[link.label],
    translationKey: link.label,
    path: link.href,
    children: [] as SitemapItem[],
  }));

  const drepsSection = structure.find((item) => item.path === "/dreps");
  if (drepsSection) {
    const drepsChildren: SitemapItem[] = [
      { label: "DRep Registration", path: "/dreps/registration" },
      { label: "DRep Profiles", path: "/dreps/profile" },
    ];
    drepsSection.children = drepsChildren;
  }

  const govSection = structure.find((item) => item.path === "/governance");
  if (govSection) {
    const govChildren: SitemapItem[] = [
      { label: "Actions", path: "/governance/actions" },
      { label: "Votes", path: "/governance/votes" },
    ];
    govSection.children = govChildren;
  }

  const proposalsSection = structure.find((item) => item.path === "/proposals");
  if (proposalsSection) {
    const proposalsChildren: SitemapItem[] = [
      { label: "Create Proposal", path: "/proposals/create" },
      { label: "Proposal Details", path: "/proposals/details" },
    ];
    proposalsSection.children = proposalsChildren;
  }

  return structure;
};

export default function SitemapPage({
  translations,
}: {
  translations: Dictionary;
}) {
  const params = useParams();
  const locale = (params.lang?.toString() ?? "en-us") as Locale;
  const pathname = usePathname();

  let siteStructure: SitemapItem[] = [];
  try {
    siteStructure = buildSiteStructure(translations.header);
  } catch (error) {
    console.error("Error building site structure:", error);
    siteStructure = [
      { label: "Home", path: "/" },
      { label: "Help", path: "/help" },
    ];
  }

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(Object.fromEntries(siteStructure.map((item) => [item.path, true])));

  const toggleSection = (path: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {translations.general.sitemap || "Site Map"}
      </h1>

      <div className="mx-auto max-w-4xl p-6 bg-background rounded-lg shadow-sm border border-border">
        {siteStructure.map((item, index) => (
          <SitemapSection
            key={index}
            item={item}
            isExpanded={expandedSections[item.path] || false}
            toggle={() => toggleSection(item.path)}
            translations={translations.header}
            locale={locale}
            pathname={pathname}
          />
        ))}
      </div>
    </div>
  );
}
