import { Card, CardContent } from "@/components/ui/card";
import { formatStake } from "./utils/formatters";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";

type VotingPowerCardProps = Pick<AnalyticsDashboardProps, "data">;

const VotingPowerCard = ({ data }: VotingPowerCardProps) => {
  const votingPowerData = useMemo(
    () => [
      {
        name: "Always Abstain",
        value: data.alwaysAbstainVotingPower,
        formatted: formatStake(data.alwaysAbstainVotingPower),
      },
      {
        name: "No Confidence",
        value: data.alwaysNoConfidenceVotingPower,
        formatted: formatStake(data.alwaysNoConfidenceVotingPower),
      },
    ],
    [data]
  );

  const chartColors = useMemo(
    () => ({
      votingPowerAbstain: "hsl(var(--chart-1))",
      votingPowerNoConfidence: "hsl(var(--chart-2))",
    }),
    []
  );

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Voting Power
        </h3>
        <div className="flex">
          <div className="h-32 flex-1">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={votingPowerData}
                  innerRadius="65%"
                  outerRadius="100%"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {votingPowerData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? chartColors.votingPowerAbstain
                          : chartColors.votingPowerNoConfidence
                      }
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-4">
            {votingPowerData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        index === 0
                          ? chartColors.votingPowerAbstain
                          : chartColors.votingPowerNoConfidence,
                    }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {item.formatted}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default VotingPowerCard;
