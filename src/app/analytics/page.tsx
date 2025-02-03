// src/app/analytics/page.tsx
import { getMockMetrics } from "~/lib/mock";
import AnalyticsClient from "./client";

export default function AnalyticsPage() {
  const metrics = getMockMetrics();

  return (
    <main className="flex min-h-screen flex-col">
      <AnalyticsClient initialData={metrics} />
    </main>
  );
}
