import { Card, CardContent } from "@/components/ui/card";
import { NetworkStake } from "~/lib/analytics";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

interface GovernanceDelegationCardProps {
  data: NetworkStake;
}

const GovernanceDelegationCard = ({ data }: GovernanceDelegationCardProps) => {
  const chartColors = {
    dreps: "hsl(var(--chart-1))",
    spos: "hsl(var(--chart-2))",
    governanceAbstain: "hsl(var(--chart-2))",
    governanceNoConfidence: "hsl(var(--chart-3))",
    notTakingPart: "hsl(var(--muted))",
    activeDReps: "hsl(var(--chart-1))",
    inactiveDReps: "hsl(var(--chart-2))",
    retiredDReps: "hsl(var(--chart-3))",
  };

  const getGovernanceColor = (index: number) => {
    switch (index) {
      case 0:
        return chartColors.notTakingPart;
      case 1:
        return chartColors.activeDReps;
      case 2:
        return chartColors.governanceAbstain;
      case 3:
        return chartColors.governanceNoConfidence;
      default:
        return chartColors.notTakingPart;
    }
  };

  const circulation = 35949488472 * 1e6;

  const notTakingPart = useMemo(
    () =>
      circulation -
      (data.totalStakeControlledByDReps +
        data.alwaysAbstainVotingPower +
        data.alwaysNoConfidenceVotingPower),
    [circulation, data]
  );

  const governanceData = useMemo(
    () => [
      {
        name: "Not taking part in Governance",
        value: notTakingPart,
        percentage: ((notTakingPart / circulation) * 100).toFixed(2),
      },
      {
        name: "Active dReps",
        value: data.totalStakeControlledByDReps,
        percentage: (
          (data.totalStakeControlledByDReps / circulation) *
          100
        ).toFixed(2),
      },
      {
        name: "Always Abstain",
        value: data.alwaysAbstainVotingPower,
        percentage: (
          (data.alwaysAbstainVotingPower / circulation) *
          100
        ).toFixed(2),
      },
      {
        name: "No-Confidence",
        value: data.alwaysNoConfidenceVotingPower,
        percentage: (
          (data.alwaysNoConfidenceVotingPower / circulation) *
          100
        ).toFixed(2),
      },
    ],
    [data, circulation, notTakingPart]
  );

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Governance Delegation{" "}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          ADA taking part in Governance as of today by category in relation to
          the circulating supply of ADA on Cardano
        </p>
        <div className="flex">
          <div className="h-48 flex-1">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={governanceData}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {governanceData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getGovernanceColor(index)}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-3">
            {governanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getGovernanceColor(index) }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GovernanceDelegationCard;
