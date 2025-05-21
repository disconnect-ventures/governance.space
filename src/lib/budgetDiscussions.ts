import { fetchApi, PdfApiResponse } from ".";
import { PDF_API_URL } from "./constants";

type BaseEntity = {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
};

type Currency = BaseEntity & {
  attributes: {
    currency_name: string;
    currency_letter_code: string;
    currency_number_code: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type BDCosting = BaseEntity & {
  attributes: {
    cost_breakdown: string;
    ada_amount: string;
    amount_in_preferred_currency: string;
    usd_to_ada_conversion_rate: string;
    createdAt: string;
    updatedAt: string;
    preferred_currency: { data?: Currency };
  };
};

type ContractType = BaseEntity & {
  attributes: {
    contract_type_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

interface BDProposalDetail extends BaseEntity {
  attributes: {
    experience: string;
    proposal_name: string;
    key_dependencies: string;
    maintain_and_support: string;
    proposal_description: string;
    key_proposal_deliverables: string;
    resourcing_duration_estimates: string;
    other_contract_type: string | null;
    createdAt: string;
    updatedAt: string;
    contract_type_name: { data: ContractType };
  };
}

type ProposalLink = {
  id: number;
  prop_link: string;
  prop_link_text: string;
};

type BDFurtherInformation = BaseEntity & {
  attributes: {
    createdAt: string;
    updatedAt: string;
    proposal_links: ProposalLink[];
  };
};

type Committee = BaseEntity & {
  attributes: {
    committee_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type Roadmap = BaseEntity & {
  attributes: {
    roadmap_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type TypeName = BaseEntity & {
  attributes: {
    type_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type BDPSAPB = BaseEntity & {
  attributes: {
    problem_statement: string;
    proposal_benefit: string;
    supplementary_endorsement: string;
    explain_proposal_roadmap: string;
    createdAt: string;
    updatedAt: string;
    committee_name: { data: Committee };
    roadmap_name: { data: Roadmap };
    type_name: { data: TypeName };
  };
};

type BDProposalOwnership = BaseEntity & {
  attributes: {
    agreed: boolean;
    group_name: string;
    company_name: string;
    type_of_group: string;
    social_handles: string;
    submited_on_behalf: string;
    company_domain_name: string;
    proposal_public_champion: string;
    key_info_to_identify_group: string;
    createdAt: string;
    updatedAt: string;
    be_country: { data: unknown };
  };
};

export type BudgetDiscussion = BaseEntity & {
  attributes: {
    privacy_policy: boolean;
    intersect_named_administrator: boolean;
    prop_comments_number: number;
    is_active: boolean;
    master_id?: string;
    intersect_admin_further_text: null;
    createdAt: string;
    updatedAt: string;
    creator?: { data: Creator };
    bd_costing?: { data: BDCosting };
    bd_proposal_detail?: { data: BDProposalDetail };
    bd_further_information?: { data: BDFurtherInformation };
    bd_psapb?: { data: BDPSAPB };
    bd_proposal_ownership?: { data: BDProposalOwnership };
  };
};

type Creator = BaseEntity & {
  attributes: {
    govtool_username: string;
  };
};

export async function getBudgetDiscussion(
  id: number,
  populate: string[] = [
    "creator",
    "bd_costing.preferred_currency",
    "bd_proposal_detail.contract_type_name",
    "bd_further_information.proposal_links",
    "bd_psapb.type_name",
    "bd_psapb.roadmap_name",
    "bd_psapb.committee_name",
    "bd_proposal_ownership.be_country",
  ]
): Promise<BudgetDiscussion | null> {
  const url = new URL(`/api/bds/${id}`, PDF_API_URL);
  populate.forEach((p, index) => {
    url.searchParams.append(`populate[${index}]`, p);
  });

  try {
    const res = await fetchApi<PdfApiResponse<BudgetDiscussion>>(url);
    return res.data ? res.data : null;
  } catch {
    return null;
  }
}

export type BudgetDiscussionPoll = {
  id: number;
  attributes: {
    bd_proposal_id: string;
    poll_yes: number;
    poll_no: number;
    is_poll_active: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export type BudgetDiscussionPollsResponse = PdfApiResponse<
  BudgetDiscussionPoll[]
>;

export async function getBudgetDiscussionPolls(
  page: number = 1,
  pageSize: number = 1,
  isActive: boolean = true,
  proposalIds?: string | string[]
): Promise<BudgetDiscussionPollsResponse | null> {
  const url = new URL(`/api/bd-polls`, PDF_API_URL);

  if (proposalIds) {
    if (typeof proposalIds === "string") {
      url.searchParams.append(
        "filters[$and][0][bd_proposal_id][$eq]",
        proposalIds
      );
    } else if (Array.isArray(proposalIds) && proposalIds.length > 0) {
      proposalIds.forEach((id, index) => {
        url.searchParams.append(
          `filters[$or][${index}][bd_proposal_id][$eq]`,
          id
        );
      });
    }
  }

  if (Array.isArray(proposalIds) && proposalIds.length > 0) {
    url.searchParams.append(
      "filters[$and][0][is_poll_active]",
      String(isActive)
    );
  } else {
    url.searchParams.append(
      "filters[$and][1][is_poll_active]",
      String(isActive)
    );
  }

  url.searchParams.append("pagination[page]", String(page));
  url.searchParams.append("pagination[pageSize]", String(pageSize));
  url.searchParams.append("sort[createdAt]", "desc");

  try {
    const res = await fetchApi<BudgetDiscussionPollsResponse>(url);
    return res;
  } catch {
    return null;
  }
}

export async function getBudgetDiscussionPollById(
  id: number,
  isActive: boolean = true
) {
  return getBudgetDiscussionPolls(1, 1, isActive, id.toString());
}

export async function getBudgetDiscussionPollsByIds(
  ids: number[],
  isActive: boolean = true,
  page: number = 1,
  pageSize: number = 10
) {
  return getBudgetDiscussionPolls(
    page,
    pageSize,
    isActive,
    ids.map((id) => id.toString())
  );
}

export interface ListBudgetDiscussionsParams {
  isActive?: boolean;
  typeIds?: number[];
  search?: string;
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  populate?: string[];
}

export async function listBudgetDiscussions({
  isActive = true,
  typeIds = [],
  search = "",
  page = 1,
  pageSize = 25,
  sortField = "createdAt",
  sortDirection = "desc",
  populate = [
    "bd_costing",
    "bd_psapb.type_name",
    "bd_proposal_detail",
    "creator",
  ],
}: ListBudgetDiscussionsParams = {}): Promise<PdfApiResponse<
  BudgetDiscussion[]
> | null> {
  const url = new URL("/api/bds", PDF_API_URL);

  let filterIndex = 0;

  url.searchParams.append(
    `filters[$and][${filterIndex}][is_active]`,
    String(isActive)
  );
  filterIndex++;

  if (typeIds.length) {
    typeIds.forEach((type, index) =>
      url.searchParams.append(
        `filters[$or][${index}][bd_psapb][type_name][id]`,
        String(type)
      )
    );
  }

  if (search) {
    url.searchParams.append(
      `filters[$and][${filterIndex}][bd_proposal_detail][proposal_name][$containsi]`,
      search
    );
    filterIndex++;
  }

  url.searchParams.append("pagination[page]", String(page + 1));
  url.searchParams.append("pagination[pageSize]", String(pageSize));

  url.searchParams.append(`sort[${sortField}]`, sortDirection);

  populate.forEach((p, index) => {
    url.searchParams.append(`populate[${index}]`, p);
  });

  try {
    const res = await fetchApi<PdfApiResponse<BudgetDiscussion[]>>(url);
    return res || null;
  } catch {
    return null;
  }
}

export async function listAllBudgetDiscussions({
  typeIds = [],
}: { typeIds?: number[] } = {}): Promise<BudgetDiscussion[]> {
  const firstPage = await listBudgetDiscussions({
    isActive: true,
    page: 0,
    pageSize: 99,
    typeIds,
  });
  const budgetDiscussions: BudgetDiscussion[] = firstPage?.data ?? [];
  const totalPages = firstPage?.meta.pagination?.pageCount ?? 0;
  const allData = await Promise.all(
    Array.from(
      { length: totalPages - 1 },
      async (_, i) =>
        await listBudgetDiscussions({
          page: i + 1,
          pageSize: 99,
          isActive: true,
          typeIds,
        }).then((pageData) => {
          if (!pageData) throw new Error(`Error fetching page ${i + 2}`);
          return pageData.data;
        })
    )
  );
  budgetDiscussions.push(...allData.flat());

  return budgetDiscussions;
}

export type BudgetDiscussionType = BaseEntity & {
  attributes: {
    type_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type GetBudgetDiscussionTypesParams = {
  page?: number;
  pageSize?: number;
};

export async function getBudgetDiscussionTypes({
  page = 1,
  pageSize = 25,
}: GetBudgetDiscussionTypesParams = {}): Promise<PdfApiResponse<
  BudgetDiscussionType[]
> | null> {
  const url = new URL("/api/bd-types", PDF_API_URL);

  url.searchParams.append("pagination[page]", String(page));
  url.searchParams.append("pagination[pageSize]", String(pageSize));

  try {
    const res = await fetchApi<PdfApiResponse<BudgetDiscussionType[]>>(url);
    return res || null;
  } catch {
    return null;
  }
}
