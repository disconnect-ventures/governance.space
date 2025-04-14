import { Card, CardContent } from "@/components/ui/card";
import { formatStake } from "./utils/formatters";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";

type StakeDistributionCardProps = Pick<
  AnalyticsDashboardProps,
  "data" | "translations"
>;

const StakeDistributionCard = ({
  data,
  translations,
}: StakeDistributionCardProps) => {
  const stakeData = useMemo(
    () => [
      {
        name: translations.pageAnalytics.dreps,
        value: data.totalStakeControlledByDReps,
      },
      {
        name: translations.pageAnalytics.spos,
        value: data.totalStakeControlledBySPOs,
      },
    ],
    [data, translations]
  );

  const chartColors = useMemo(
    () => ({
      dreps: "hsl(var(--chart-1))",
      spos: "hsl(var(--chart-2))",
    }),
    []
  );

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {translations.pageAnalytics.stakeDistribution}
        </h3>
        <div className="h-32">
          <ResponsiveContainer>
            <BarChart
              data={stakeData}
              layout="vertical"
              margin={{ right: 80, left: 60 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                }}
                width={50}
              />
              <Bar
                dataKey="value"
                radius={4}
                barSize={20}
                label={{
                  position: "right",
                  formatter: formatStake,
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                  dx: 8,
                }}
              >
                {stakeData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? chartColors.dreps : chartColors.spos}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
export default StakeDistributionCard;
