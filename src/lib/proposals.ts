import { getMockProposals } from "./mock";

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
        gov_action_type: {
          id: number;
          attributes: {
            gov_action_type_name: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
    };
  };
};

export async function getProposals() {
  return getMockProposals();
}

export async function getProposalsByUserId(id: string) {
  return (await getProposals()).filter((p) => p.attributes.user_id === id);
}

export async function getProposalsById(id: number) {
  const proposals = await getProposals();

  return proposals.find((p) => p.id === Number(id));
}
