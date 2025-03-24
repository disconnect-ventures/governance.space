import MetricsDisplay from "~/components/features/analytics/MetricsDisplay";
import { getNetworkInfo, getNetworkMetrics, getNetworkStake } from "~/lib/analytics";
import { getDReps } from "~/lib/dreps";
import { PageProps } from "../layout";
import { getDictionary } from "~/config/dictionaries";
import { Suspense } from "react";
import { getDRepStatusStats } from "~/lib/drepStats";

export default async function AnalyticsPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const info = await getNetworkInfo();
  const stake = await getNetworkStake();
  const metrics = await getNetworkMetrics();
  const drepsPromise = getDReps(0, 10, "", "VotingPower", []);
  const statsPromise = getDRepStatusStats();

  return (
    <div className="flex min-h-screen flex-col gap-8">
      <h1 className="text-4xl font-bold text-foreground">Epoch {info.epochNo}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MetricsDisplay
          data={{ ...metrics, ...info, ...stake }}
          drepListPromise={drepsPromise}
          drepStatsPromise={statsPromise}
          translations={dictionary.general}
        />
      </Suspense>
    </div>
  );
}
