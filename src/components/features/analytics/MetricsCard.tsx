import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "./utils/formatters";
import { useMemo } from "react";
import { Users, Database, Vote, Award, Clock } from "lucide-react";
import React from "react";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";

type MetricsCardProps = Pick<AnalyticsDashboardProps, "data" | "translations">;

const MetricsCard = ({ data, translations }: MetricsCardProps) => {
  const metrics = useMemo(
    () => [
      {
        icon: <Users />,
        label: translations.pageAnalytics.delegators,
        value: data.uniqueDelegators,
      },
      {
        icon: <Database />,
        label: translations.pageAnalytics.totalDreps,
        value: data.totalRegisteredDReps,
      },
      {
        icon: <Vote />,
        label: translations.pageAnalytics.drepVotes,
        value: data.totalDRepVotes,
      },
      {
        icon: <Award />,
        label: translations.pageAnalytics.activeDreps,
        value: data.totalActiveDReps,
      },
      {
        icon: <Clock />,
        label: translations.pageAnalytics.governanceActions,
        value: data.totalGovernanceActions,
      },
    ],
    [data, translations]
  );

  return metrics.map((metric, index) => (
    <Card key={index} className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-primary/10 rounded-lg text-primary h-fit">
            {React.cloneElement(metric.icon, { className: "h-5 w-5" })}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {formatNumber(metric.value)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
};
export default MetricsCard;
