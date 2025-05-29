import { getDReps, DRep, DRepFilterOption } from "./dreps";

export type RegistrationDataPoint = {
  date: string;
  count: number;
  activeCount: number;
  inactiveCount: number;
  retiredCount: number;
};

async function getAllDReps(): Promise<DRep[]> {
  const pageSize = 100;
  const statusFilters: DRepFilterOption[] = ["Active", "Inactive", "Retired"];
  const countRequest = await getDReps(
    0,
    1,
    "",
    "RegistrationDate",
    statusFilters
  );
  const totalDReps = countRequest.total;
  const totalPages = Math.ceil(totalDReps / pageSize);
  const allDReps: DRep[] = [];
  const existingIds = new Set<string>();

  for (let page = 0; page < totalPages; page++) {
    const response = await getDReps(
      page,
      pageSize,
      "",
      "RegistrationDate",
      statusFilters
    );
    for (const drep of response.elements) {
      if (!existingIds.has(drep.drepId)) {
        allDReps.push(drep);
        existingIds.add(drep.drepId);
      }
    }
  }
  return allDReps;
}

export async function getDrepRegistrationData(): Promise<
  RegistrationDataPoint[]
> {
  const allDreps = await getAllDReps();

  const monthlyRegistrations = new Map<
    string,
    {
      total: number;
      active: number;
      inactive: number;
      retired: number;
    }
  >();

  allDreps.forEach((drep: DRep) => {
    if (drep.latestRegistrationDate) {
      const date = new Date(drep.latestRegistrationDate);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!monthlyRegistrations.has(monthYear)) {
        monthlyRegistrations.set(monthYear, {
          total: 0,
          active: 0,
          inactive: 0,
          retired: 0,
        });
      }

      const monthData = monthlyRegistrations.get(monthYear)!;
      monthData.total += 1;

      switch (drep.status?.toLowerCase()) {
        case "active":
          monthData.active += 1;
          break;
        case "inactive":
          monthData.inactive += 1;
          break;
        case "retired":
          monthData.retired += 1;
          break;
      }
    }
  });

  return Array.from(monthlyRegistrations.entries())
    .map(([date, data]) => ({
      date,
      count: data.total,
      activeCount: data.active,
      inactiveCount: data.inactive,
      retiredCount: data.retired,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
