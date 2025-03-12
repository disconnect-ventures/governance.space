import { DRep, getDReps, DRepSortOption, DRepFilterOption } from "./dreps";

export interface DRepStats {
  active: number;
  inactive: number;
  retired: number;
  total: number;
  error?: string;
  lastUpdated?: string;
}

export async function getDRepStatusStats(): Promise<DRepStats> {
  type ApiResponseData = {
    elements: DRep[];
    total?: number;
    totalCount?: number;
    [key: string]: unknown;
  };

  try {
    const statuses: Record<string, number> = {
      Active: 0,
      Inactive: 0,
      Retired: 0,
    };

    for (const status of ["Active", "Inactive", "Retired"] as DRepFilterOption[]) {
      let currentPage = 0;
      const pageSize = 1000;
      let hasMorePages = true;
      const processedDrepIds = new Set<string>();

      while (hasMorePages) {
        const response = (await getDReps(
          currentPage,
          pageSize,
          "",
          "RegistrationDate" as DRepSortOption,
          [status],
        )) as unknown as ApiResponseData;

        if (!response || !response.elements || !Array.isArray(response.elements)) {
          continue;
        }

        response.elements.forEach((drep: DRep) => {
          if (drep?.drepId && !processedDrepIds.has(drep.drepId)) {
            processedDrepIds.add(drep.drepId);

            if (drep.status && statuses.hasOwnProperty(drep.status)) {
              statuses[drep.status]++;
            }
          }
        });

        if (!response.elements.length || response.elements.length < pageSize) {
          hasMorePages = false;
        } else {
          currentPage++;
        }
      }
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

let cachedStats: DRepStats | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export async function getCachedDRepStats(): Promise<DRepStats> {
  const now = Date.now();

  if (cachedStats && now - lastFetchTime <= CACHE_DURATION) {
    return cachedStats;
  }

  try {
    const stats = await getDRepStatusStats();
    cachedStats = stats;
    lastFetchTime = now;
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
}

export function refreshDRepStats(): Promise<DRepStats> {
  cachedStats = null;
  lastFetchTime = 0;
  return getCachedDRepStats();
}
