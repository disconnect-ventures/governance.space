import React from "react";
import { Badge } from "../ui/badge";
import { InfoIcon } from "lucide-react";
import { Dictionary } from "~/config/dictionaries";

type PageKey =
  | "pageDreps"
  | "pageDrepsDetails"
  | "pageGovernanceActions"
  | "pageGovernanceActionsDetails"
  | "pageProposals"
  | "pageProposalsDetails"
  | "pageCommittees"
  | "pageLiveEvents"
  | "pageAnalytics"
  | "pageHelp"
  | "pageAbout"
  | "pageBudgetDiscussions"
  | "pageBudgetDiscussionDetails"
  | "pagePrivacyPolicy"
  | "pageTermsOfUse"
  | "pageCookiePolicy";

type PageTitleProps = {
  title?: string;
  badge?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  translations?: Dictionary[PageKey];
};

export function PageTitle({
  title,
  icon,
  children,
  badge,
  translations,
}: PageTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-wrap items-center gap-4 w-full">
        <div className="p-2 rounded-full bg-secondary/50 h-12 w-12 flex items-center justify-center text-foreground">
          {icon}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">
          {title ? title : translations?.title}
        </h1>
        {badge && (
          <Badge
            variant="secondary"
            className="bg-secondary/50 text-muted-foreground p-2 rounded-full hover:bg-secondary/70"
          >
            {badge} {translations?.badgeText}
          </Badge>
        )}
        {translations?.longDescription && (
          <div className="p-3 bg-muted/50 rounded-lg text-muted-foreground w-full">
            <p>
              <span className="inline-flex items-center mr-2">
                <InfoIcon className="w-4 h-4 relative text-muted-foreground" />
              </span>
              {translations.longDescription}
            </p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
