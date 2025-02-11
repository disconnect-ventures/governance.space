import { fetchApi } from ".";

export type Proposal = {
  id: number;
  attributes: {
    prop_likes: number;
    prop_dislikes: number;
    prop_comments_number: number;
    user_id: string;
    createdAt: string;
    updatedAt: string;
    user_govtool_username: string;
    content: {
      id: number;
      attributes: {
        proposal_id: string;
        prop_rev_active: boolean;
        prop_abstract: string;
        prop_motivation: string;
        prop_rationale: string;
        gov_action_type_id: string;
        prop_name: string;
        is_draft: boolean;
        user_id: string;
        prop_submitted: boolean;
        prop_submission_tx_hash: string | null;
        prop_submission_date: string | null;
        createdAt: string;
        updatedAt: string;
        proposal_links: Array<{
          id: number;
          prop_link: string;
          prop_link_text: string;
        }>;
        proposal_withdrawals: Array<unknown>; // TODO
        gov_action_type: ProposalType;
      };
    };
  };
};

export type ProposalType = {
  id: number;
  attributes: {
    gov_action_type_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type ProposalResponse<Element> = {
  data: Element[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type ProposalSortOption = "createdAt";
export type ProposalSortOrderOption = "desc" | "asc";

export async function getGovernanceActionProposalTypes(): Promise<
  ProposalResponse<ProposalType>
> {
  const response = await fetch(
    "https://be.pdf.gov.tools/api/governance-action-types",
    {}
  );
  const data = (await response.json()) as ProposalResponse<ProposalType>;
  return data;
}

export async function getProposals(
  page: number,
  pageSize: number,
  search: string,
  sortOrder: ProposalSortOrderOption,
  actionType: number[]
) {
  const url = new URL("/api/proposals", "https://be.pdf.gov.tools");

  if (actionType.length) {
    let filterIndex = 0;
    actionType.forEach((type) =>
      url.searchParams.append(
        `filters[$or][${filterIndex++}][gov_action_type_id]`,
        type.toString()
      )
    );
  }

  url.searchParams.append(`filters[$and][0][prop_name][$containsi]`, search);
  url.searchParams.append(`filters[$and][1][prop_submitted]`, "false");

  url.searchParams.append("pagination[page]", (page + 1).toString()); // For some reason only this endpoint starts pagination at 1...
  url.searchParams.append("pagination[pageSize]", pageSize.toString());
  url.searchParams.append("sort[createdAt]", sortOrder);

  url.searchParams.append("populate[0]", "proposal_links");
  url.searchParams.append("populate[1]", "proposal_withdrawals");

  const response = await fetchApi<ProposalResponse<Proposal>>(url);
  return response;
}

// eslint-disable-next-line
export async function getProposalsByUserId(id: string) {
  return null;
}

export async function getProposalsById(id: number) {
  const url = new URL(`/api/proposals/${id}`, "https://be.pdf.gov.tools");
  const response = await fetchApi<{ data: Proposal; meta: {} }>(url);
  return response;
}
