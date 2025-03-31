"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { NetworkInfo, NetworkMetrics, NetworkStake } from "~/lib/analytics";
import { formatNumber } from "./utils/formatters";
import { DRep } from "~/lib/dreps";
import { DRepStats } from "~/lib/drepStats";
import { getMockMetrics } from "~/lib/mock";
import ComingSoon from "~/components/layout/ComingSoon";
import { Dictionary } from "~/config/dictionaries";
import StakeDistributionCard from "./StakeDistributionCard";
import VotingPowerCard from "./VotingPowerCard";
import MetricsCard from "./MetricsCard";
import GovernanceDelegationCard from "./GovernanceDelegationCard";
import DRepStatusDistributionCard from "./DRepStatusDistributionCard";
import Top10DRepsCard from "./Top10DRepsCard";
import EpochMetricsCard from "./EpochMetricsCard";

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
  const mockData = getMockMetrics();
  const circulation = 35949488472 * 1e6;

  const tokenomicsData = [
    { position: "Circulation", amount: circulation },
    { position: "Treasury", amount: mockData.treasury },
    { position: "Reserves", amount: mockData.reserves },
    { position: "Rewards", amount: mockData.rewards },
    { position: "Deposits", amount: mockData.deposits },
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
        <Top10DRepsCard
          drepListPromise={drepListPromise}
          translations={translations}
        />
        <EpochMetricsCard data={data} />
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
