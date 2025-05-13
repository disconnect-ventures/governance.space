import { getDReps, DRep, DRepFilterOption } from "./dreps";

export type VotingPowerDataPoint = {
  drepId: string;
  givenName: string | null;
  votingPower: number;
};

export type TreemapDataPoint = {
  name: string;
  drepId: string;
  size: number;
  fullName?: string;
};

async function getAllDReps(): Promise<DRep[]> {
  const pageSize = 100;
  const statusFilters: DRepFilterOption[] = ["Active", "Inactive", "Retired"];
  const countRequest = await getDReps(0, 1, "", "VotingPower", statusFilters);
  const totalDReps = countRequest.total;
  const totalPages = Math.ceil(totalDReps / pageSize);
  const allDReps: DRep[] = [];
  const existingIds = new Set<string>();

  for (let page = 0; page < totalPages; page++) {
    const response = await getDReps(
      page,
      pageSize,
      "",
      "VotingPower",
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

export async function getDRepVotingPowerData(): Promise<
  VotingPowerDataPoint[]
> {
  const allDReps = await getAllDReps();
  return allDReps.map((drep) => ({
    drepId: drep.drepId,
    givenName: drep.givenName,
    votingPower: drep.votingPower || 0,
  }));
}

export function getTop20DRepsByVotingPower(
  drepList: VotingPowerDataPoint[]
): VotingPowerDataPoint[] {
  if (!drepList || drepList.length === 0) {
    return [];
  }
  const sortedDreps = [...drepList].sort(
    (a, b) => (b.votingPower || 0) - (a.votingPower || 0)
  );
  return sortedDreps.slice(0, 20);
}

export function calculateTop20Percentage(
  drepList: VotingPowerDataPoint[],
  top20Dreps: VotingPowerDataPoint[]
): number {
  if (
    !drepList ||
    drepList.length === 0 ||
    !top20Dreps ||
    top20Dreps.length === 0
  ) {
    return 0;
  }
  const totalPower = drepList.reduce(
    (sum, drep) => sum + (drep.votingPower || 0),
    0
  );
  const top20Power = top20Dreps.reduce(
    (sum, drep) => sum + (drep.votingPower || 0),
    0
  );
  return totalPower > 0
    ? Number(((top20Power / totalPower) * 100).toFixed(1))
    : 0;
}

export function prepareTreemapData(
  top20Dreps: VotingPowerDataPoint[]
): TreemapDataPoint[] {
  if (!top20Dreps || top20Dreps.length === 0) {
    return [];
  }
  return top20Dreps.map((drep) => {
    let displayName = "";
    if (drep.givenName && drep.givenName.trim() !== "") {
      displayName = drep.givenName;
    } else {
      displayName = `DRep ${drep.drepId.substring(0, 8)}...`;
    }
    return {
      name: displayName,
      drepId: drep.drepId,
      size: drep.votingPower || 0,
      fullName: drep.givenName || `DRep ID: ${drep.drepId}`,
    };
  });
}

export function calculatePercentageOfTotal(
  size: number,
  drepList: VotingPowerDataPoint[]
): number {
  if (!drepList || drepList.length === 0) return 0;

  const totalPower = drepList.reduce(
    (sum, drep) => sum + (drep.votingPower || 0),
    0
  );

  return totalPower > 0 ? Number(((size / totalPower) * 100).toFixed(1)) : 0;
}

export function getTruncatedDisplayName(
  name: string,
  availableWidth: number,
  fontSize: number
): string {
  if (!name) return "";
  const averageCharWidth = fontSize * 0.65;

  const safeWidth = availableWidth * 0.9;

  const maxChars = Math.floor(safeWidth / averageCharWidth);

  if (name.length <= maxChars) return name;

  if (/[\u3000-\u9fff]/.test(name)) {
    const nonLatinMaxChars = Math.floor(maxChars * 0.6);
    return name.substring(0, Math.max(1, nonLatinMaxChars)) + "...";
  }

  const words = name.split(" ");
  if (words.length > 1) {
    const firstWord = words[0];
    const initials = words
      .slice(1)
      .map((w) => w.charAt(0))
      .join("");
    const abbreviated = `${firstWord} ${initials}`;

    if (abbreviated.length <= maxChars) {
      return abbreviated;
    }

    if (firstWord.length <= maxChars - 3) {
      return firstWord + "...";
    }
  }

  return name.substring(0, Math.max(3, maxChars - 3)) + "...";
}

export function calculateDynamicFontSize(area: number): number {
  const baseFontSize = Math.sqrt(area) / 20;
  return Math.min(Math.max(baseFontSize, 10), 14);
}
