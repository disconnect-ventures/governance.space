import { getDReps, DRep, DRepFilterOption } from "./dreps";

export type RegistrationDataPoint = {
  date: string;
  count: number;
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
  const monthlyRegistrations = new Map<string, number>();

  allDreps.forEach((drep: DRep) => {
    if (drep.latestRegistrationDate) {
      const date = new Date(drep.latestRegistrationDate);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (monthlyRegistrations.has(monthYear)) {
        monthlyRegistrations.set(
          monthYear,
          monthlyRegistrations.get(monthYear)! + 1
        );
      } else {
        monthlyRegistrations.set(monthYear, 1);
      }
    }
  });

  return Array.from(monthlyRegistrations.entries())
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
