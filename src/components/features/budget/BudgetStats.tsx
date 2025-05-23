"use client";
import { Card, CardContent } from "@/components/ui/card";
import { use, useMemo } from "react";
import { PieChart, DollarSign, Circle } from "lucide-react";
import React from "react";
import { formatNumber } from "../analytics/utils/formatters";
import { BudgetDiscussionStatsSnapshot } from "../../../../generated/prisma";
import { Dictionary } from "~/config/dictionaries";
import { cn } from "~/lib/utils";

type BudgetStatsProps = {
  dataPromise: Promise<BudgetDiscussionStatsSnapshot | null>;
  translations: Dictionary;
};

const BudgetStats = ({ dataPromise, translations }: BudgetStatsProps) => {
  const data = use(dataPromise);
  const t = translations.pageBudgetDiscussions;

  const metrics = useMemo(
    () =>
      data
        ? [
            {
              icon: <PieChart />,
              label: t.totalBudget,
              value: data.budgetTotal,
            },
            {
              icon: <DollarSign />,
              label: t.coreBudget,
              value: data.coreBudgetTotal,
            },
            {
              icon: <DollarSign />,
              label: t.researchBudget,
              value: data.researchBudgetTotal,
            },
            {
              icon: <DollarSign />,
              label: t.governanceSupportBudget,
              value: data.governanceSupportBudgetTotal,
            },
            {
              icon: <DollarSign />,
              label: t.marketingInnovationBudget,
              value: data.marketingInnovationBudgetTotal,
            },
            {
              icon: <DollarSign />,
              label: t.noneBudget,
              value: data.noneBudgetTotal,
            },
            {
              icon: <Circle />,
              label: t.coreTotal,
              value: data.coreTotal,
            },
            {
              icon: <Circle />,
              label: t.researchTotal,
              value: data.researchTotal,
            },
            {
              icon: <Circle />,
              label: t.governanceSupportTotal,
              value: data.governanceSupportTotal,
            },
            {
              icon: <Circle />,
              label: t.marketingInnovationTotal,
              value: data.marketingInnovationTotal,
            },
            {
              icon: <Circle />,
              label: t.noneTotal,
              value: data.noneTotal,
            },
          ]
        : [],
    [data, t]
  );

  if (!data) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {metrics.map((metric, index) => (
        <Card key={index} className={
          cn(
            "flex-grow bg-card text-card-foreground shadow-none",
            index === 0 ? "w-full": "",
          )
        }>
          <CardContent className="p-3">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-primary/10 rounded-lg text-primary h-fit">
                {React.cloneElement(metric.icon, { className: "h-4 w-4" })}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-bold text-foreground mt-1">
                  {formatNumber(metric.value)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BudgetStats;
