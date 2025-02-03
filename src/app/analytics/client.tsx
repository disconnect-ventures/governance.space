"use client";

// src/app/analytics/client.tsx
import { MetricsData } from "~/lib/analytics";
import MetricsDisplay from "~/components/features/analytics/MetricsDisplay";

export default function AnalyticsClient({ initialData }: { initialData: MetricsData }) {
  return <MetricsDisplay data={initialData} />;
}
