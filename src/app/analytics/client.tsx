// src/app/analytics/client.tsx
"use client";
import { MetricsData } from "~/lib/analytics";
import { DRep } from "~/lib/dreps";
import MetricsDisplay from "~/components/features/analytics/MetricsDisplay";

export default function AnalyticsClient({
  initialData,
  drepList,
}: {
  initialData: MetricsData;
  drepList: DRep[];
}) {
  return <MetricsDisplay data={initialData} drepList={drepList} />;
}
