import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";
import ComingSoon from "~/components/layout/ComingSoon";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { formatNumber } from "./utils/formatters";
import React, { use } from "react";
import { DRepStats } from "~/lib/drepStats";

interface DRepStatusDistributionCardProps {
  drepStatsPromise: Promise<DRepStats>;
}

const DRepStatusDistributionCard = ({
  drepStatsPromise,
}: DRepStatusDistributionCardProps) => {
  const chartColors = useMemo(
    () => ({
      activeDReps: "hsl(var(--chart-1))",
      inactiveDReps: "hsl(var(--chart-2))",
      retiredDReps: "hsl(var(--chart-3))",
    }),
    []
  );

  const getDRepStatusColor = (index: number) => {
    switch (index) {
      case 0:
        return chartColors.activeDReps;
      case 1:
        return chartColors.inactiveDReps;
      case 2:
        return chartColors.retiredDReps;
    }
  };

  const drepStats = use(drepStatsPromise);
  const totalDReps = drepStats?.total || 0;

  const isLoadingStats = !drepStats;

  const drepStatusData = useMemo(() => {
    if (!drepStats) {
      return [
        { name: "Active DReps", value: 0 },
        { name: "Inactive DReps", value: 0 },
        { name: "Retired DReps", value: 0 },
      ];
    }

    return [
      { name: "Active DReps", value: drepStats.active },
      { name: "Inactive DReps", value: drepStats.inactive },
      { name: "Retired DReps", value: drepStats.retired },
    ];
  }, [drepStats]);

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          DRep Status Distribution
        </h3>
        <ComingSoon>
          <p className="text-sm text-muted-foreground mb-6">
            Distribution of all registered DReps by their current status
          </p>
          {isLoadingStats ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-muted-foreground">
                Loading DRep statistics...
              </p>
            </div>
          ) : (
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
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
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
          )}
        </ComingSoon>
      </CardContent>
    </Card>
  );
};
export default DRepStatusDistributionCard;
