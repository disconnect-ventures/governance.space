import { useMemo } from "react";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export const BudgetTypeBadge = ({ type }: { type: string }) => {
  const badgeColor = useMemo(() => {
    switch (type.trim().toLowerCase()) {
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

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center border border-gray-300 py-1 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white text-lg px-6 rounded-full",
        badgeColor
      )}
    >
      {type}
    </Badge>
  );
};
