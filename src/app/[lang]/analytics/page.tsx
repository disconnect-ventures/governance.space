import MetricsDisplay from "~/components/features/analytics/MetricsDisplay";
import { getNetworkInfo, getNetworkMetrics, getNetworkStake } from "~/lib/analytics";
import { getDReps } from "~/lib/dreps";
import { PageProps } from "../layout";
import { getDictionary } from "~/config/dictionaries";

export default async function AnalyticsPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const metrics = await getNetworkMetrics();
  const info = await getNetworkInfo();
  const stake = await getNetworkStake();
  const dreps = await getDReps(0, 10, "", "VotingPower", []);

  return (
    <div className="flex min-h-screen flex-col gap-8">
      <h1 className="text-4xl font-bold text-foreground">Epoch {info.epochNo}</h1>
      <MetricsDisplay
        data={{ ...metrics, ...info, ...stake }}
        drepList={dreps.elements}
        translations={dictionary.general}
      />
    </div>
  );
}
