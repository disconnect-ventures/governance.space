"use client";
import { NetworkInfo, NetworkMetrics, NetworkStake } from "~/lib/analytics";
import { DRep } from "~/lib/dreps";
import { DRepStats } from "~/lib/drepStats";
import { Dictionary } from "~/config/dictionaries";
import StakeDistributionCard from "./StakeDistributionCard";
import VotingPowerCard from "./VotingPowerCard";
import MetricsCard from "./MetricsCard";
import GovernanceDelegationCard from "./GovernanceDelegationCard";
import DRepStatusDistributionCard from "./DRepStatusDistributionCard";
import Top10DRepsCard from "./Top10DRepsCard";
import EpochMetricsCard from "./EpochMetricsCard";
import CardanoTokenomicsCard from "./CardanoTokenomicsCard";

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
        <CardanoTokenomicsCard />
      </div>
    </div>
  );
};

export default GovernanceDashboard;
