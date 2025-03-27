import { getDReps, DRepFilterOption } from "./dreps";

export interface DRepStats {
  active: number;
  inactive: number;
  retired: number;
  total: number;
  error?: string;
  lastUpdated?: string;
}

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
    throw error;
  }
}
