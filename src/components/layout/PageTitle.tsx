"use client";

import React from "react";
import { Badge } from "../ui/badge";
import { InfoIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export type PageTitleProps = {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  rowCount?: number;
  translationPage: string;
};

export function PageTitle({
  title,
  icon,
  children,
  rowCount,
  translationPage,
}: PageTitleProps) {
  const t = useTranslations(translationPage);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-wrap items-center gap-4 w-full">
        <div className="p-2 rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center">
          {icon}
        </div>
        <h1 className="text-4xl font-bold">{title}</h1>

        {rowCount && "nao tem count" && (
          <Badge
            variant="secondary"
            className="bg-gray-100 border-foreground p-2 rounded-full"
          >
            {t("badge_text", { count: rowCount })}
          </Badge>
        )}
        {t("long-description") && (
          <div className="p-3 bg-gray-200 rounded text-gray-600 w-full">
            <p>
              <span className="inline-flex items-center mr-2">
                <InfoIcon className="w-4 h-4 relative" />
              </span>
              {t("long-description")}
            </p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
