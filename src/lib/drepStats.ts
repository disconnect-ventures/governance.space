import { getDReps, DRepFilterOption } from "./dreps";
import { cache } from "react";

export interface DRepStats {
  active: number;
  inactive: number;
  retired: number;
  total: number;
  error?: string;
  lastUpdated?: string;
}

let cachedStats: DRepStats | null = null;

export async function getDRepStatusStats(): Promise<DRepStats> {
  try {
    const statuses: Record<string, number> = {
      Active: 0,
      Inactive: 0,
      Retired: 0,
    };

    for (const status of ["Active", "Inactive", "Retired"] as DRepFilterOption[]) {
      const dreps = await getDReps(0, 1, "", "Random", [status]);
      statuses[status] = dreps.total;
    }

    const totalDReps = statuses.Active + statuses.Inactive + statuses.Retired;

    return {
      active: statuses.Active,
      inactive: statuses.Inactive,
      retired: statuses.Retired,
      total: totalDReps,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    if (cachedStats) {
      return {
        ...cachedStats,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
    throw error;
  }
}

const getCachedStatsInternal = cache(async (): Promise<DRepStats> => {
  try {
    const stats = await getDRepStatusStats();
    cachedStats = stats;
    return stats;
  } catch (error) {
    if (cachedStats) {
      return {
        ...cachedStats,
        error: error instanceof Error ? error.message : "Error fetching fresh data",
      };
    }

    return {
      active: 0,
      inactive: 0,
      retired: 0,
      total: 0,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      lastUpdated: new Date().toISOString(),
    };
  }
});

export async function getCachedDRepStats(): Promise<DRepStats> {
  return getCachedStatsInternal();
}

export function refreshDRepStats(): Promise<DRepStats> {
  return getCachedDRepStats();
}
