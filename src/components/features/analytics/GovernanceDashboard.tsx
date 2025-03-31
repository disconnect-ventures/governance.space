"use client";
import React, { use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { NetworkInfo, NetworkMetrics, NetworkStake } from "~/lib/analytics";
import { formatNumber } from "./utils/formatters";
import { DRep } from "~/lib/dreps";
import { DRepStats } from "~/lib/drepStats";
import { getMockMetrics } from "~/lib/mock";
import ComingSoon from "~/components/layout/ComingSoon";
import { ProfileStatus } from "../profile/ProfileStatus";
import { Dictionary } from "~/config/dictionaries";
import StakeDistributionCard from "./StakeDistributionCard";
import VotingPowerCard from "./VotingPowerCard";
import MetricsCard from "./MetricsCard";
import GovernanceDelegationCard from "./GovernanceDelegationCard";
import DRepStatusDistributionCard from "./DRepStatusDistributionCard";

interface GovernanceDashboardProps {
  data: NetworkMetrics & NetworkInfo & NetworkStake;
  drepListPromise: Promise<{ elements: DRep[] }>;
  drepStatsPromise: Promise<DRepStats>;
  translations: Dictionary["general"];
}

const GovernanceDashboard = ({
  data,
  drepListPromise,
  drepStatsPromise,
  translations,
}: GovernanceDashboardProps) => {
  const drepList = use(drepListPromise)?.elements;
  const mockData = getMockMetrics();
  const circulation = 35949488472 * 1e6;
  const epoch = data.epochNo;

  const tokenomicsData = [
    { position: "Circulation", amount: circulation },
    { position: "Treasury", amount: mockData.treasury },
    { position: "Reserves", amount: mockData.reserves },
    { position: "Rewards", amount: mockData.rewards },
    { position: "Deposits", amount: mockData.deposits },
  ];

  const epochMetricsData = [
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
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <MetricsCard data={data} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StakeDistributionCard data={data} />
        <VotingPowerCard data={data} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <GovernanceDelegationCard data={data} />
        <DRepStatusDistributionCard drepStatsPromise={drepStatsPromise} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="bg-card text-card-foreground shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Top 10 DReps
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      DRep Name
                    </th>
                    <th className="text-center py-3 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                      Voting Power
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {drepList?.slice(0, 10).map((drep, index) => (
                    <tr key={drep.drepId}>
                      <td className="py-4 text-sm text-foreground">{`${
                        index + 1
                      }º ${drep.givenName || "Anonymous DRep"}`}</td>
                      <td className="py-4 text-sm text-center">
                        <ProfileStatus
                          drep={drep}
                          translations={translations}
                        />
                      </td>
                      <td className="py-4 text-sm text-right font-medium text-foreground">
                        ₳ {formatNumber(drep.votingPower)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card text-card-foreground shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Cardano Tokenomics{" "}
            </h3>
            <ComingSoon>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      Position
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                      Amount in ADA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tokenomicsData.map((row) => (
                    <tr
                      key={row.position}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-4 text-sm text-foreground">
                        {row.position}
                      </td>
                      <td className="py-4 text-sm text-right font-medium text-foreground">
                        {formatNumber(row.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ComingSoon>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernanceDashboard;
