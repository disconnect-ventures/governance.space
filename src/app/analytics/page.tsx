import { getMockMetrics, getMockDReps } from "~/lib/mock";
import AnalyticsClient from "./client";

export default function AnalyticsPage() {
  const metrics = getMockMetrics();
  const dreps = getMockDReps();
  return (
    <main className="flex min-h-screen flex-col">
      <AnalyticsClient initialData={metrics} drepList={dreps} />
    </main>
  );
}
