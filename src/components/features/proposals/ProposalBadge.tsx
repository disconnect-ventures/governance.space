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
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, [type]);

  const proposalTypeLabel = useMemo(
    () =>
      translations.pageProposals[
        toCamelCase(type) as keyof typeof translations.pageProposals
      ],
    [translations, type]
  );

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
