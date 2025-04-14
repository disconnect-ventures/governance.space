import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useMemo } from "react";
import ComingSoon from "~/components/layout/ComingSoon";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { formatNumber } from "./utils/formatters";
import { use } from "react";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";

type DRepStatusDistributionCardProps = Pick<
  AnalyticsDashboardProps,
  "drepStatsPromise" | "translations"
>;

const DRepStatusDistributionCard = ({
  drepStatsPromise,
  translations,
}: DRepStatusDistributionCardProps) => {
  const drepStats = use(drepStatsPromise);
  const totalDReps = useMemo(() => drepStats?.total || 0, [drepStats]);
  const drepStatusData = useMemo(() => {
    if (!drepStats) {
      return [
        { name: translations.pageAnalytics.activeDreps, value: 0 },
        { name: translations.pageAnalytics.inactiveDreps, value: 0 },
        { name: translations.pageAnalytics.retiredDreps, value: 0 },
      ];
    }

    return [
      { name: translations.pageAnalytics.activeDreps, value: drepStats.active },
      {
        name: translations.pageAnalytics.inactiveDreps,
        value: drepStats.inactive,
      },
      {
        name: translations.pageAnalytics.retiredDreps,
        value: drepStats.retired,
      },
    ];
  }, [drepStats, translations]);

  const chartColors = useMemo(
    () => ({
      active: "hsl(var(--chart-1))",
      inactive: "hsl(var(--chart-2))",
      retired: "hsl(var(--chart-3))",
    }),
    []
  );

  const getDRepStatusColor = useCallback(
    (index: number) => {
      switch (index) {
        case 0:
          return chartColors.active;
        case 1:
          return chartColors.inactive;
        case 2:
          return chartColors.retired;
      }
    },
    [chartColors]
  );

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {translations.pageAnalytics.drepsStatusDistribution}
        </h3>
        <ComingSoon>
          <p className="text-sm text-muted-foreground mb-6">
            {translations.pageAnalytics.drepsStatusDistributionDesc}
          </p>
          <div className="flex">
            <div className="h-48 flex-1">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={drepStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {drepStatusData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getDRepStatusColor(index)}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-3">
              {drepStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: getDRepStatusColor(index),
                      }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {formatNumber(item.value)}{" "}
                    {totalDReps > 0
                      ? `(${((item.value / totalDReps) * 100).toFixed(1)}%)`
                      : "(0%)"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ComingSoon>
      </CardContent>
    </Card>
  );
};
export default DRepStatusDistributionCard;
