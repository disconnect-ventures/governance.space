import { ApiResponse, baseApiUrl, CACHE_CONFIG, fetchApi } from ".";

export type GovernanceAction = {
  id: string;
  txHash: string;
  index: number;
  type:
    | "NoConfidence"
    | "NewCommittee"
    | "NewConstitution"
    | "HardForkInitiation"
    | "ParameterChange"
    | "TreasuryWithdrawals"
    | "InfoAction";
  details: {
    major: number;
    minor: number;
  };
  expiryDate: string;
  expiryEpochNo: number;
  createdDate: string;
  createdEpochNo: number;
  url: string;
  metadataHash: string;
  protocolParams: unknown | null; // TODO
  title: string | null;
  abstract: string | null;
  motivation: string | null;
  rationale: string | null;
  dRepYesVotes: number;
  dRepNoVotes: number;
  dRepAbstainVotes: number;
  poolYesVotes: number;
  poolNoVotes: number;
  poolAbstainVotes: number;
  ccYesVotes: number;
  ccNoVotes: number;
  ccAbstainVotes: number;
  prevGovActionIndex: number | null;
  prevGovActionTxHash: string | null;
};

export type GovernanceActionType = {
  id: number;
  attributes: {
    gov_action_type_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type GovernanceActionFilterOption = GovernanceAction["type"];

export type GovernanceActionSortOption =
  | "SoonestToExpire"
  | "NewestCreated"
  | "MostYesVotes";

export async function getGovernanceActions(
  page: number,
  pageSize: number,
  search: string,
  sort: GovernanceActionSortOption,
  filters: GovernanceActionFilterOption[]
): Promise<ApiResponse<GovernanceAction>> {
  const url = new URL("/proposal/list", baseApiUrl);
  Object.entries({ page, pageSize, search, sort }).forEach(
    ([key, value]) =>
      value !== "" && url.searchParams.append(key, value.toString())
  );

  if (filters.length) {
    filters.forEach((value) => url.searchParams.append("type[]", value));
  }

  return await fetchApi<ApiResponse<GovernanceAction>>(url, {
    next: {
      tags: [CACHE_CONFIG.tags.governanceAction],
    },
  });
}

export async function getNoConfidenceActions(
  page: number,
  pageSize: number,
  search: string,
  sort: GovernanceActionSortOption
) {
  return getGovernanceActions(page, pageSize, search, sort, ["NoConfidence"]);
}

export async function getNewCommitteeActions(
  page: number,
  pageSize: number,
  search: string,
  sort: GovernanceActionSortOption
) {
  return getGovernanceActions(page, pageSize, search, sort, ["NewCommittee"]);
}

export async function getNewConstitutionActions(
  page: number,
  pageSize: number,
  search: string,
  sort: GovernanceActionSortOption
) {
  return getGovernanceActions(page, pageSize, search, sort, [
    "NewConstitution",
  ]);
}

export async function getHardForkInitiationActions(
  page: number,
  pageSize: number,
  search: string,
  sort: GovernanceActionSortOption
) {
  return getGovernanceActions(page, pageSize, search, sort, [
    "HardForkInitiation",
  ]);
}

export async function getParameterChangeActions(
  page: number,
  pageSize: number,
  search: string,
  sort: GovernanceActionSortOption
) {
  return getGovernanceActions(page, pageSize, search, sort, [
    "ParameterChange",
  ]);
}

export async function getTreasuryWithdrawalsActions(
  page: number,
  pageSize: number,
  search: string,
  sort: GovernanceActionSortOption
) {
  return getGovernanceActions(page, pageSize, search, sort, [
    "TreasuryWithdrawals",
  ]);
}

export async function getInfoActionActions(
  page: number,
  pageSize: number,
  search: string,
  sort: GovernanceActionSortOption
) {
  return getGovernanceActions(page, pageSize, search, sort, ["InfoAction"]);
}
