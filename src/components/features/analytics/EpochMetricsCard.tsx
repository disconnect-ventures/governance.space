import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";
import ComingSoon from "~/components/layout/ComingSoon";
import { getMockMetrics } from "~/lib/mock";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";

type EpochMetricsCardProps = Pick<AnalyticsDashboardProps, "data">;

const EpochMetricsCard = ({ data }: EpochMetricsCardProps) => {
  const epoch = useMemo(() => [data.epochNo], [data]);
  const mockData = getMockMetrics();

  const epochMetricsData = useMemo(
    () => [
      {
        item: "Total DReps",
        value: mockData.dashboard.metrics.totalDReps.value,
        change: mockData.dashboard.metrics.totalDReps.change,
      },
      {
        item: "Total Delegators",
        value: mockData.dashboard.metrics.totalDelegators.value,
        change: mockData.dashboard.metrics.totalDelegators.change,
      },
      {
        item: "New DReps",
        value: mockData.dashboard.metrics.newDReps.value,
        change: mockData.dashboard.metrics.newDReps.change,
      },
      {
        item: "New Delegators",
        value: mockData.dashboard.metrics.newDelegators.value,
        change: mockData.dashboard.metrics.newDelegators.change,
      },
      {
        item: "Delegation Rate",
        value: mockData.dashboard.metrics.delegationRate.value,
        change: mockData.dashboard.metrics.delegationRate.change,
      },
      {
        item: "Active Delegated",
        value: mockData.dashboard.metrics.activeDelegated.value,
        change: mockData.dashboard.metrics.activeDelegated.change,
      },
      {
        item: "Abstain/No Confidence",
        value: mockData.dashboard.metrics.abstainNoConfidence.value,
        change: mockData.dashboard.metrics.abstainNoConfidence.change,
      },
    ],
    [mockData]
  );

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Epoch {epoch} Metrics
        </h3>
        <ComingSoon>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                    #Item
                  </th>
                  <th className="text-center py-3 text-sm font-medium text-muted-foreground">
                    Epoch {epoch}
                  </th>
                  <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                    Changed
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {epochMetricsData.map((row) => {
                  const isError =
                    row.item === "Active Delegated" ||
                    row.item === "Abstain/No Confidence";

                  return (
                    <tr key={row.item}>
                      <td className="py-4 text-sm text-foreground">
                        {row.item}
                      </td>
                      <td className="py-4 text-sm text-center font-medium text-foreground">
                        {row.value}
                      </td>
                      <td
                        className={`py-4 text-sm text-right font-medium ${
                          isError
                            ? "text-red-500 dark:text-red-400"
                            : "text-green-500 dark:text-green-400"
                        }`}
                      >
                        {isError ? `-${row.change}` : `+${row.change}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ComingSoon>
      </CardContent>
    </Card>
  );
};
export default EpochMetricsCard;
