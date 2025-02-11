import { ApiResponse, baseApiUrl, CACHE_CONFIG, fetchApi } from ".";

export type DRep = {
  isScriptBased: boolean;
  drepId: string;
  view: string;
  status: "Active" | "Inactive" | "Retired";
  url: string;
  metadataHash: string;
  deposit: number;
  votingPower: number;
  type: string; // TODO: Add explicit values
  latestTxHash: string;
  latestRegistrationDate: string;
  metadataError: null | string;
  paymentAddress: string | null;
  givenName: string | null;
  objectives: string | null;
  motivations: string | null;
  qualifications: string | null;
  imageUrl: string | null;
  imageHash: string | null;
};

export type DRepListResponse = ApiResponse<DRep>;

export type DRepSortOption =
  | "Random"
  | "RegistrationDate"
  | "VotingPower"
  | "Status";

export type DRepFilterOption = DRep["status"];

export async function getDReps(
  page: number,
  pageSize: number,
  search: string,
  sort: DRepSortOption,
  filters: DRepFilterOption[]
): Promise<DRepListResponse> {
  const url = new URL("/drep/list", baseApiUrl);
  Object.entries({ page, pageSize, search, sort }).forEach(
    ([key, value]) =>
      value !== "" && url.searchParams.append(key, value.toString())
  );
  if (filters.length) {
    filters.forEach((value) => url.searchParams.append("status[]", value));
  }

  const response = await fetchApi<DRepListResponse>(url, {
    next: {
      tags: [CACHE_CONFIG.tags.dreps],
    },
  });
  return response;
}

export async function getDRepById(id: string): Promise<DRep | null> {
  const res = await getDReps(0, 1, id, "RegistrationDate", []).catch(
    () => null
  );
  return res?.elements.length ? res?.elements[0] : null;
}
