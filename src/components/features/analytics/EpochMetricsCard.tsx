import { Card, CardContent } from "@/components/ui/card";
import { use, useMemo } from "react";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";
import { formatAda, formatVotingPower } from "~/lib/utils";

type EpochMetricsCardProps = Pick<
  AnalyticsDashboardProps,
  "data" | "translations" | "drepStatsPromise"
>;

const EpochMetricsCard = ({
  data,
  translations,
  drepStatsPromise,
}: EpochMetricsCardProps) => {
  const epoch = useMemo(() => [data.epochNo], [data]);
  const stats = use(drepStatsPromise);

  const epochMetricsData = useMemo(
    () => [
      {
        item: translations.pageAnalytics.totalDreps,
        value: stats.total,
        // change: mockData.dashboard.metrics.totalDReps.change,
      },
      {
        item: translations.pageAnalytics.totalDelegators,
        value: data.totalDelegations,
        // change: mockData.dashboard.metrics.totalDelegators.change,
      },
      // {
      //   item: translations.pageAnalytics.newDreps,
      //   value: mockData.dashboard.metrics.newDReps.value,
      //   // change: mockData.dashboard.metrics.newDReps.change,
      // },
      // {
      //   item: translations.pageAnalytics.newDelegators,
      //   value: mockData.dashboard.metrics.newDelegators.value,
      //   // change: mockData.dashboard.metrics.newDelegators.change,
      // },
      // {
      //   item: translations.pageAnalytics.delegationRate,
      //   value: mockData.dashboard.metrics.delegationRate.value,
      //   // change: mockData.dashboard.metrics.delegationRate.change,
      // },
      // {
      //   item: translations.pageAnalytics.activeDelegated,
      //   value: mockData.dashboard.metrics.activeDelegated.value,
      //   // change: mockData.dashboard.metrics.activeDelegated.change,
      // },
      {
        item: translations.pageAnalytics.abstainNoConfidence,
        value: formatAda(
          formatVotingPower(
            data.alwaysAbstainVotingPower + data.alwaysNoConfidenceVotingPower
          )
        ),
        // change: mockData.dashboard.metrics.abstainNoConfidence.change,
      },
    ],
    [translations, data, stats]
  );

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {translations.pageAnalytics.epoch} {epoch}{" "}
          {translations.pageAnalytics.metrics}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                  {translations.general.item}
                </th>
                <th className="text-center py-3 text-sm font-medium text-muted-foreground">
                  {translations.pageAnalytics.epoch} {epoch}
                </th>
                {/* <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                  {translations.pageAnalytics.changed}
                </th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {epochMetricsData.map((row) => {
                // const isError =
                //   row.item === "Active Delegated" ||
                //   row.item === "Abstain/No Confidence";

                return (
                  <tr key={row.item}>
                    <td className="py-4 text-sm text-foreground">{row.item}</td>
                    <td className="py-4 text-sm text-center font-medium text-foreground">
                      {row.value}
                    </td>
                    {/* <td
                        className={`py-4 text-sm text-right font-medium ${
                          isError
                            ? "text-red-500 dark:text-red-400"
                            : "text-green-500 dark:text-green-400"
                        }`}
                      >
                        {isError ? `-${row.change}` : `+${row.change}`}
                      </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
export default EpochMetricsCard;
