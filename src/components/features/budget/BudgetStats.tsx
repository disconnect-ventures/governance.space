"use client";
import { use, useMemo, useState } from "react";
import { formatNumber } from "../analytics/utils/formatters";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { PieChart, DollarSign, Circle } from "lucide-react";
import { BudgetDiscussionStatsSnapshot } from "../../../../generated/prisma";
import { Dictionary } from "~/config/dictionaries";
import { cn } from "~/lib/utils";
import React from "react";

type BudgetStatsProps = {
  dataPromise: Promise<BudgetDiscussionStatsSnapshot | null>;
  translations: Dictionary;
};

const iconMap = {
  pie: PieChart,
  dollar: DollarSign,
  circle: Circle,
};

const BudgetStats = ({ dataPromise, translations }: BudgetStatsProps) => {
  const data = use(dataPromise);
  const t = translations.pageBudgetDiscussions;
  const [open, setOpen] = useState(false);

  const metrics = useMemo(() => {
    if (!data) return [];
    return [
      { icon: "pie", label: t.totalBudget, value: data.budgetTotal },
      { icon: "dollar", label: t.coreBudget, value: data.coreBudgetTotal },
      {
        icon: "dollar",
        label: t.researchBudget,
        value: data.researchBudgetTotal,
      },
      {
        icon: "dollar",
        label: t.governanceSupportBudget,
        value: data.governanceSupportBudgetTotal,
      },
      {
        icon: "dollar",
        label: t.marketingInnovationBudget,
        value: data.marketingInnovationBudgetTotal,
      },
      { icon: "dollar", label: t.noneBudget, value: data.noneBudgetTotal },
      { icon: "circle", label: t.coreTotal, value: data.coreTotal },
      { icon: "circle", label: t.researchTotal, value: data.researchTotal },
      {
        icon: "circle",
        label: t.governanceSupportTotal,
        value: data.governanceSupportTotal,
      },
      {
        icon: "circle",
        label: t.marketingInnovationTotal,
        value: data.marketingInnovationTotal,
      },
      { icon: "circle", label: t.noneTotal, value: data.noneTotal },
    ];
  }, [data, t]);

  if (!data) return null;

  const StatsContent = (
    <div className="flex flex-wrap gap-1 w-full">
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon as keyof typeof iconMap];
        return (
          <Card
            key={index}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-muted/20 text-muted-foreground"
          >
            <Icon className="w-3 h-3 shrink-0 text-primary" />
            <span>{metric.label}:</span>
            <span className="text-foreground font-medium">
              {formatNumber(metric.value)}
            </span>
          </Card>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="block sm:hidden">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <div className="group cursor-pointer flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-muted-foreground group-hover:underline">
                  {translations.general.viewStats}
                </span>
                <button className="text-xs text-muted-foreground flex items-center gap-1 hover:underline group-hover:underline">
                  {open ? "Hide" : "Show"}{" "}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      open && "rotate-180"
                    )}
                  />
                </button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>{StatsContent}</CollapsibleContent>
        </Collapsible>
      </div>

      <div className="hidden sm:block">{StatsContent}</div>
    </>
  );
};

export default BudgetStats;
