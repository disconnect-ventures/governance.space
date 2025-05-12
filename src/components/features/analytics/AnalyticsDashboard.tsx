"use client";
import { NetworkInfo, NetworkMetrics, NetworkStake } from "~/lib/analytics";
import { DRep } from "~/lib/dreps";
import { DRepStats } from "~/lib/drepStats";
import { VotingPowerDataPoint } from "~/lib/drepTreemap";
import { RegistrationDataPoint } from "~/lib/drepRegistrationDate";
import { Dictionary } from "~/config/dictionaries";
import { Suspense } from "react";
import StakeDistributionCard from "./StakeDistributionCard";
import VotingPowerCard from "./VotingPowerCard";
import MetricsCard from "./MetricsCard";
import GovernanceDelegationCard from "./GovernanceDelegationCard";
import DRepStatusDistributionCard from "./DRepStatusDistributionCard";
import Top10DRepsCard from "./Top10DRepsCard";
import EpochMetricsCard from "./EpochMetricsCard";
import CardanoTokenomicsCard from "./CardanoTokenomicsCard";
// import DRepTreemapCard from "./DRepTreemapCard";
// import DRepRegistrationDateCard from "./DRepRegistrationDateCard";
import { KoiosTokenomics } from "~/lib/koios";

export interface AnalyticsDashboardProps {
  data: NetworkMetrics & NetworkInfo & NetworkStake;
  drepListPromise: Promise<{ elements: DRep[] }>;
  drepStatsPromise: Promise<DRepStats>;
  drepVotingPowerDataPromise: Promise<VotingPowerDataPoint[]>;
  tokenomicsPromise: Promise<KoiosTokenomics[]>;
  translations: Pick<Dictionary, "general" | "pageAnalytics">;
  drepRegistrationDataPromise: Promise<RegistrationDataPoint[]>;
}

const AnalyticsDashboard = ({
  data,
  drepListPromise,
  drepStatsPromise,
  // drepVotingPowerDataPromise,
  // drepRegistrationDataPromise,
  tokenomicsPromise,
  translations,
}: AnalyticsDashboardProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <MetricsCard data={data} translations={translations} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StakeDistributionCard data={data} translations={translations} />
        <VotingPowerCard data={data} translations={translations} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <GovernanceDelegationCard data={data} translations={translations} />
        <Suspense fallback={<div>{translations.general.loading}</div>}>
          <DRepStatusDistributionCard
            drepStatsPromise={drepStatsPromise}
            translations={translations}
          />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Suspense fallback={<div>{translations.general.loading}</div>}>
          <Top10DRepsCard
            drepListPromise={drepListPromise}
            translations={translations}
          />
        </Suspense>
        <CardanoTokenomicsCard
          tokenomicsPromise={tokenomicsPromise}
          translations={translations}
        />
        <EpochMetricsCard data={data} translations={translations} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<div>{translations.general.loading}</div>}>
          <CardanoTokenomicsCard
            tokenomicsPromise={tokenomicsPromise}
            translations={translations}
          />
        </Suspense>
      </div>
      {/* <div className="grid grid-cols-1 gap-4 mb-4">
        <Suspense fallback={<div>{translations.general.loading}</div>}>
          <DRepRegistrationDateCard
            drepRegistrationDataPromise={drepRegistrationDataPromise}
            translations={translations}
          />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <Suspense fallback={<div>{translations.general.loading}</div>}>
          <DRepTreemapCard
            drepVotingPowerDataPromise={drepVotingPowerDataPromise}
            translations={translations}
          />
        </Suspense>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <EpochMetricsCard data={data} translations={translations} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
