import React, { useMemo } from "react";
import { Badge } from "~/components/ui/badge";
import { Dictionary } from "~/config/dictionaries";
import { cn, toCamelCase } from "~/lib/utils";

export const ProposalBadge = ({
  type,
  translations,
  className,
}: {
  type: string;
  translations: Dictionary;
  className?: string;
}) => {
  const badgeColor = useMemo(() => {
    switch (type.trim().toLowerCase()) {
      case "info action":
        return "bg-purple-100 text-purple-800";
      case "no confidence":
        return "bg-red-100 text-red-800";
      case "treasury requests":
        return "bg-blue-100 text-blue-800";
      case "core":
        return "bg-purple-100 text-purple-800";
      case "research":
        return "bg-amber-100 text-amber-800";
      case "governance support":
        return "bg-blue-100 text-blue-800";
      case "marketing & innovation":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, [type]);

  const proposalTypeLabel = useMemo(() => {
    const typeKey = toCamelCase(type);
    const isProposalType = typeKey in translations.pageProposals;
    const isbudgetType = typeKey in translations.pageBudgetDiscussions;

    let label = type;
    if (isProposalType) {
      label =
        translations.pageProposals[
          typeKey as keyof typeof translations.pageProposals
        ];
    } else if (isbudgetType) {
      label =
        translations.pageBudgetDiscussions[
          typeKey as keyof typeof translations.pageBudgetDiscussions
        ];
    }
    return label;
  }, [translations, type]);

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center border border-gray-300 py-1 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white text-sm md:text-md px-6 rounded-full",
        badgeColor,
        className
      )}
    >
      {proposalTypeLabel}
    </Badge>
  );
};
