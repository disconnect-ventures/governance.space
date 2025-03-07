import MetricsDisplay from "~/components/features/analytics/MetricsDisplay";
import { getMetrics } from "~/lib/analytics";
import { getDReps } from "~/lib/dreps";

export default async function AnalyticsPage() {
  const metrics = await getMetrics();
  const dreps = await getDReps(0, 10, "", "VotingPower", []);

  return (
    <div className="flex min-h-screen flex-col gap-8">
      <h1 className="text-4xl font-bold text-foreground">
        Epoch {metrics.currentEpoch}
      </h1>
      <MetricsDisplay data={metrics} drepList={dreps.elements} />
    </div>
  );
}
