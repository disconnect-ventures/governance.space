import { ChartLineIcon } from "lucide-react";
import AnalyticsDashboard from "~/components/features/analytics/AnalyticsDashboard";
import {
  getNetworkInfo,
  getNetworkMetrics,
  getNetworkStake,
} from "~/lib/analytics";
import { getDReps } from "~/lib/dreps";
import { PageProps } from "../layout";
import { getDictionary } from "~/config/dictionaries";
import { getDRepStatusStats } from "~/lib/drepStats";
import { PageTitle } from "~/components/layout/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance Space - Analytics",
  description: "All-in-One Governance Platform",
};

export default async function AnalyticsPage({
  params: paramsPromise,
}: PageProps) {
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
      <PageTitle
        title={`${dictionary.pageAnalytics.title} - Epoch ${info.epochNo}`}
        icon={
          <div className="p-2 rounded-full bg-muted dark:bg-muted/50 w-12 h-12 flex flex-col justify-center items-center">
            <ChartLineIcon className="text-foreground" />
          </div>
        }
        translations={dictionary.pageAnalytics}
      />
      <AnalyticsDashboard
        data={{ ...metrics, ...info, ...stake }}
        drepListPromise={drepsPromise}
        drepStatsPromise={statsPromise}
        translations={dictionary.general}
      />
    </div>
  );
}
