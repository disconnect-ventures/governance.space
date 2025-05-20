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
import { KoiosTokenomics } from "~/lib/koios";
import DRepRegistrationDateCard from "./DRepRegistrationDateCard";
import DRepTreemapCard from "./DRepTreemapCard";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export interface AnalyticsDashboardProps {
  data: NetworkMetrics & NetworkInfo & NetworkStake;
  drepListPromise: Promise<{ elements: DRep[] }>;
  drepStatsPromise: Promise<DRepStats>;
  drepVotingPowerDataPromise: Promise<VotingPowerDataPoint[]>;
  tokenomicsPromise: Promise<KoiosTokenomics[]>;
  translations: Pick<Dictionary, "general" | "pageAnalytics">;
  drepRegistrationDataPromise: Promise<RegistrationDataPoint[]>;
}

const LoadingCardSkeleton = ({
  translations,
}: Pick<AnalyticsDashboardProps, "translations">) => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="sr-only">
        <div>{translations.general.loading}</div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </CardContent>
    </Card>
  );
};

const AnalyticsDashboard = ({
  data,
  drepListPromise,
  drepStatsPromise,
  drepVotingPowerDataPromise,
  drepRegistrationDataPromise,
  tokenomicsPromise,
  translations,
}: AnalyticsDashboardProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <MetricsCard
          data={data}
          drepStatsPromise={drepStatsPromise}
          translations={translations}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StakeDistributionCard data={data} translations={translations} />
        <VotingPowerCard data={data} translations={translations} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <GovernanceDelegationCard data={data} translations={translations} />
        <Suspense
          fallback={<LoadingCardSkeleton translations={translations} />}
        >
          <DRepStatusDistributionCard
            drepStatsPromise={drepStatsPromise}
            translations={translations}
          />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Suspense
          fallback={<LoadingCardSkeleton translations={translations} />}
        >
          <Top10DRepsCard
            drepListPromise={drepListPromise}
            translations={translations}
          />
        </Suspense>
        <div className="flex flex-col gap-4">
          <Suspense
            fallback={<LoadingCardSkeleton translations={translations} />}
          >
            <CardanoTokenomicsCard
              tokenomicsPromise={tokenomicsPromise}
              translations={translations}
            />
          </Suspense>
          <Suspense
            fallback={<LoadingCardSkeleton translations={translations} />}
          >
            <EpochMetricsCard
              data={data}
              translations={translations}
              drepStatsPromise={drepStatsPromise}
            />
          </Suspense>
        </div>
        <div className="col-span-full">
          <Suspense
            fallback={<LoadingCardSkeleton translations={translations} />}
          >
            <DRepRegistrationDateCard
              drepRegistrationDataPromise={drepRegistrationDataPromise}
              translations={translations}
            />
          </Suspense>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <Suspense
          fallback={<LoadingCardSkeleton translations={translations} />}
        >
          <DRepTreemapCard
            drepVotingPowerDataPromise={drepVotingPowerDataPromise}
            translations={translations}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
