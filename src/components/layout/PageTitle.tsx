"use client";

import React from "react";
import { Badge } from "../ui/badge";
import { InfoIcon } from "lucide-react";
import { useTranslation } from "~/hooks/use-translation/use-translation";

type TranslationPage =
  | "pageDreps"
  | "pageGovernanceActions"
  | "pageProposals"
  | "pageGovernanceActionsDetails"
  | "pageCommittees"
  | "pageLiveEvents"
  | "pageProposalsDetails";

export type PageTitleProps = {
  title: string;
  badge?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  translationPage?: TranslationPage;
};

export function PageTitle({ icon, title, children, badge, translationPage }: PageTitleProps) {
  const { dictionary } = useTranslation();
  const longDescription = translationPage ? dictionary[translationPage].longDescription : "";

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-wrap items-center gap-4 w-full">
        <div className="p-2 rounded-full bg-secondary/50 h-12 w-12 flex items-center justify-center text-foreground">
          {icon}
        </div>
        <h1 className="text-4xl font-bold text-foreground">{title}</h1>
        {badge && (
          <Badge
            variant="secondary"
            className="bg-secondary/50 text-muted-foreground p-2 rounded-full hover:bg-secondary/70"
          >
            {badge}
          </Badge>
        )}
        {longDescription && (
          <div className="p-3 bg-muted/50 rounded-lg text-muted-foreground w-full">
            <p>
              <span className="inline-flex items-center mr-2">
                <InfoIcon className="w-4 h-4 relative text-muted-foreground" />
              </span>
              {longDescription}
            </p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
